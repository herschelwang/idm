/**
 * @Description: 构造树形菜单
 */

// 创建一个闭包
(function ($) {
    var Tree = function () {
        this.defaults = {
            leafClick: null, //叶子点击事件处理函数
            nodeClick: null,//节点点击事件处理函数
            singleSelect: false,//是否单选
            onNodeLoad: null //节点展开事件
        }
    };
    Tree.prototype.init = function (_this, options) {
        var opts = $.extend({}, this.defaults, options);
        $this = _this;
        var tree = _this[0];
        $.data(tree, "tree", opts);
        // build element specific options
        var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
        $this.unbind("click").click(function (e) {
            var x = e.target || e.srcElement;
            var me = e.target || e.srcElement;
            $this = $(this);
            var _defaults = $.data(this, "tree");
            if (x.nodeName.toLowerCase() === 'i' && $(x).hasClass("node")) {
                var _that = x;
                x = x.parentNode;
                var _a = $(x);
                var _node = $(x.parentNode);
                var nodetype = _a.data('leaf');
                var load = _node.attr('load');

                if (!nodetype) {
                    var action = _a.data('action');
                    var params = _a.data('param');
                    if (load == "no" && action) {
                        jQuery.ajax({
                            type: 'post',
                            url: action,
                            async: false,
                            data: {param: params},
                            dataType: 'text',
                            success: function (text) {
                                if (text && arguments[1] == "success") {
                                    _node.find("ul").html(text);
                                    _node.attr('load', "yes");
                                    _node.toggleClass("node-expand");
                                    _node.toggleClass("node-collapse");
                                    $(_that).toggleClass("fa-minus-square-o");
                                    $(_that).toggleClass("fa-plus-square-o");
                                }
                            },
                            error: function () {
                                var ret = false;
                            }
                        });
                    } else {
                        _node.toggleClass("node-expand");
                        _node.toggleClass("node-collapse");
                        $(_that).toggleClass("fa-minus-square-o");
                        $(_that).toggleClass("fa-plus-square-o");
                    }
                }
            }
            if (x.nodeName.toLowerCase() === 'span') {
                x = x.parentNode;
                var _a = $(x);
                var nodetype = _a.data('leaf');
                var selectedTree = _this.find(".treeSelected");
                if (selectedTree.length > 0) {
                    selectedTree.removeClass("treeSelected");
                }
                _a.addClass("treeSelected");

                if (nodetype) {
                    if (typeof(_defaults.leafClick) == "function") {
                        _defaults.leafClick(_a.data(), me);
                    }
                } else {
                    if (typeof(_defaults.nodeClick) == "function") {
                        _defaults.nodeClick(_a.data(), me);
                    }
                }
            }
            if (x.nodeName.toLowerCase() === 'input') {
                if (_defaults.singleSelect) {
                    var checked = !!$(x).prop("checked");
                    if (checked) {
                        $this.find("input").prop('checked', false);
                        $(x).prop("checked", true);
                    }
                }
            }
        })
    };

    //获取选中的数据
    Tree.prototype.getSelectedTree = function (_this) {
        $this = $(_this);
        var ary = [];
        $this.find('input:checked').each(function (i, v) {
            ary.push($(v).parent().data());
        });
        return ary;
    }

    //设置选中的数据
    Tree.prototype.setSelectedNodeTree = function (_this, ary) {
        $this = $(_this);
        if ($.isArray(ary)) {
            for (var i = 0; i < ary.length; i++) {
                var $a = $this.find('#treeNode_' + ary[i]);
                if ($a.length > 0) {
                    $a.find(".tree-checkbox").prop("checked", true);
                }
            }
        }
    }

    //清空选中的数据
    Tree.prototype.clearSelectedNodeTree = function (_this, ary) {
        $this = $(_this);
        var ary = [];
        $this.find('input:checked').each(function (i, v) {
            $(v).prop("checked", false);
        });

    }

    //刷新指定节点
    Tree.prototype.loadNodeTree = function (_this, id, url, params) {
        $this = $(_this);
        var _a = $this.find('#treeNode_' + id);
        var _node = _a.parent();
        jQuery.ajax({
            type: 'post',
            url: url,
            async: false,
            data: {param: params},
            dataType: 'text',
            success: function (text) {
                if (text) {
                    var ul = _node.find("ul");
                    if (ul.length > 0) {
                        ul.html(text);
                    }
                    else {
                        $("<ul class='index-node-ul'></ul>").appendTo(_node).html(text);
                    }

                    _a.find(".leaf").removeClass("leaf").addClass("node");
                    _a.find(".leaf_icon").removeClass("leaf_icon").addClass("node_icon");
                    _a.find(".leaf_customIcon").removeClass("leaf_customIcon").addClass("node_customIcon");
                    _a.data("leaf", false)
                    _node.attr('load', "yes");
                    _node.removeClass("node-collapse");

                }
                else {
                    _a.find(".node").removeClass("node").addClass("leaf");
                    _a.find(".node_icon").removeClass("node_icon").addClass("leaf_icon");
                    _a.find(".node_customIcon").removeClass("node_customIcon").addClass("leaf_customIcon");
                    _a.data("leaf", true)
                    _node.attr('load', "no");
                    _node.find("ul").remove();
                }
                //setTimeout("$('.load-image').hide()",500) ;
                //	G_view_main.afterReload();
            },
            error: function () {
                var ret = false;
            }
        });
    }

    Tree.prototype.getNodeDataByIdTree = function (_this, id) {
        $this = $(_this);
        var ary = [];
        var node = $this.find('#treeNode_' + id);
        if (node && node.length > 0) {
            return node.data();
        }
        else {
            return null;
        }
    };

    Tree.prototype.deleteNodeByIdTree = function (_this, id) {
        $this = $(_this);
        var ary = [];
        var node = $this.find('#treeNode_' + id);
        if (node && node.length > 0) {
            node.parent().remove();
        }

    };

    // 插件的defaults
    $.fn.frontFramework_tree = function (options) {
        var otherArgs = Array.prototype.slice.call(arguments);

        if (typeof options === 'string') {
            otherArgs.shift();
            return $.frontFramework_tree[options + 'Tree'].apply($.frontFramework_tree, [this[0]].concat(otherArgs));
        }


        return $.frontFramework_tree.init(this, options);

    };
    $.frontFramework_tree = new Tree();
// 闭包结束
})(jQuery);


