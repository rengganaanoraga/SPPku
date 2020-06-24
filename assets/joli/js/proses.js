function SetHeight(){
    if($(".x-navigation.x-navigation-custom").outerHeight() == 50){
        total_height_view_data = $(".x-navigation.x-navigation-custom").outerHeight()+$(".height-view-data div .x-navigation.x-navigation-horizontal.x-navigation-panel").outerHeight()+$(".height-view-data div .breadcrumb").outerHeight()+$(".height-view-data div .page-title").outerHeight()+$(".height-view-data div .page-content-wrap").outerHeight();
        htmlheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        heightmenu = $(".x-navigation.x-navigation-custom").outerHeight();
        console.log("view : "+total_height_view_data+"    html : "+htmlheight);
        if(total_height_view_data>=htmlheight){
            if(heightmenu>=total_height_view_data){
                if(heightmenu<=htmlheight){
                    $(".page-container .page-content").height(htmlheight);
                } else {
                    $(".page-container .page-content").height(heightmenu+10);
                }
            } else {
                $(".page-container .page-content").height(total_height_view_data+10);
            }
        } else{
            if(heightmenu>=total_height_view_data){
                if(heightmenu<=htmlheight){
                    $(".page-container .page-content").height(htmlheight);
                } else {
                    $(".page-container .page-content").height(heightmenu+10);
                }
            } else {
                $(".page-container .page-content").height(htmlheight);
            }
        }
    } else {
        total_height_view_data = $(".height-view-data div .x-navigation.x-navigation-horizontal.x-navigation-panel").outerHeight()+$(".height-view-data div .breadcrumb").outerHeight()+$(".height-view-data div .page-title").outerHeight()+$(".height-view-data div .page-content-wrap").outerHeight();
        htmlheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        heightmenu = $(".x-navigation.x-navigation-custom").outerHeight();
        console.log("view : "+total_height_view_data+"    html : "+htmlheight);
        if(total_height_view_data>=htmlheight){
            if(heightmenu>=total_height_view_data){
                if(heightmenu<=htmlheight){
                    $(".page-container .page-content").height(htmlheight);
                } else {
                    $(".page-container .page-content").height(heightmenu+10);
                }
            } else {
                $(".page-container .page-content").height(total_height_view_data+10);
            }
        } else{
            if(heightmenu>=total_height_view_data){
                if(heightmenu<=htmlheight){
                    $(".page-container .page-content").height(htmlheight);
                } else {
                    $(".page-container .page-content").height(heightmenu+10);
                }
            } else {
                $(".page-container .page-content").height(htmlheight);
            }
        }
    }
}