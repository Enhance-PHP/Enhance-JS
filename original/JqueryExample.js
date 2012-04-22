var JqueryExample = (function () {
    return {
        changeDescription: function (id, description) {
            $('#' + id).attr('alt', description).attr('title', description);
        },
        doSomethingWithAjax: function (id, url) {
            $.get(url, function (data) {
                if (data) {
                    $('#' + id).html(data);
                }
            });
        }
    };
}());