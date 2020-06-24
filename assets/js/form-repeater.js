var FormRepeater = function () {

    return {
        //main function to initiate the module
        init: function () {
            $('.mt-repeater').each(function(){
                $(this).repeater({
                    show: function () {
                        $(this).slideDown();
                        
                        // ISI

                    },
                    hide: function (deleteElement) {
                        $(this).slideUp(deleteElement);
                        setTimeout(function(){
                            var tot_frm = $(".mt-repeater-item").size();
                            if(tot_frm == 0){
                                $(".btnTambah").click();
                            }
                        }, 1000);
                    },

                    ready: function (setIndexes) {

                    }

                });
            });
        }

    };

}();

jQuery(document).ready(function() {
    FormRepeater.init();
});
