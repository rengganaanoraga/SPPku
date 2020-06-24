/*var base_url = location.origin + "/linksmart";
var base_url_api = location.origin + "/linksmart-api";
var cdn_url = "http://cdn.linksmart.id";*/

var base_url = location.origin;
var base_url_api = "https://apidev.linksmart.id";
var cdn_url = "https://cdndev.linksmart.id";

$('input').attr('autocomplete','off');
$('#FrmUserLogin input').attr('autocomplete','on');

$("html").attr("style", "display:block !important");

var datanext = 0, dataprev = 0;
var request  = {"filter": {"kywd": ""}};
var act = "", getfunc = "", interval_total_chat;
var l = $(".ladda-button-submit").ladda();

$(".edit-profil-karyawan-sidebar").click(function(){
    $(".form-edit-profil-karyawan-sidebar").submit();
});
htmlheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
$("#modal-pilih-foto-siswa .modal-body, #modal-pilih-foto-karyawan .modal-body, #modal-pilih-foto-berita .modal-body").css({"position": "relative", "overflow-y": "scroll", "height": (htmlheight*1-150)});

$(".bs-modal-md, .bs-modal-sm, .bs-modal-lg").on('show.bs.modal', function () {
    $(this).find(".modal-body").css({"position": "relative", "overflow-y": "scroll", "max-height": ($(window).height()-150)});
    if($(this).attr("id").indexOf("modal-status-") != "-1"){
        $(this).find(".modal-body").css("overflow", "inherit");
    }
    if($(this).find("form").attr("id") != undefined){
        $(this).find(".modal-body").css("overflow-y", "scroll");
        if($(this).find("form").attr("id").indexOf("Status") != "-1"){
            $(this).find(".modal-body").css("overflow", "inherit");
        }
    }
    setTimeout(function(){
        $("body").removeClass("modal-open");
    }, 1000);
});

function ParseGambar(url) {
    if(/(http|https)/.test(url)) {
        url = url.replace("https", "http");
        return url;
    } else {
        url = url.replace("2|", "");
        return cdn_url + "/sekolah/images/" + url;
    }
}

function uploadfile(selectorform, successfunc, action) {
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    var formdata = $(selectorform).serialize() +"&act=uploaddata";
    var formaction = $(selectorform).attr("action");
    $.ajax({
        type : "post",
        url: base_url + formaction,
        data :formdata,
        cache : false,
        dataType: 'json',
        beforeSend: function() {
            l.ladda("start");
        },
        success : function(resp){
            l.ladda("stop");
            if(resp.IsError == false) {
                toastrshow("success", "File sukses upload", "Success");
                $(".responfilehidden").val(resp.Output);
                $("#FrmProsesExcel").submit();
            } else {
                toastrshow("warning", resp.Output, "Warning");
            }
        }
    });
}

function toastrshow(type, title, message) {
    message = (typeof message !== 'undefined') ?  message : "";
    toastr.options = {
        closeButton: true,
        progressBar: true,
        showMethod: "slideDown",
        positionClass: "toast-top-right",
        timeOut: 4000,
        onclick: null,
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    }
    switch(type) {
        case "success" : toastr["success"](title, message);  break;
        case "info"    : toastr["info"](title, message);     break;
        case "warning" : toastr["warning"](title, message);  break;
        case "error"   : toastr["error"](title, message);    break;
        default        : toastr["info"](title, message);     break;
    }
}

$("a.btn").click(function(){
    var refresh = $(this).attr("title");
    if(refresh=="Refresh"){
        $(this+".fa-sync-alt").addClass("fa-spin")
    }
});

$('.table-responsive').on('show.bs.dropdown', function () {
    $('.table-responsive').css( "overflow", "inherit" );
});

$('.table-responsive').on('hide.bs.dropdown', function () {
    $('.table-responsive').css( "overflow", "auto" );
});

function validatedata(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}

function backAway() {
    if(history.length === 1){
        history.back();
    } else {
        history.back();
    }
}

function loader(withtable) {
    withtable = (typeof withtable !== 'undefined') ?  withtable : false;
    var html  = '';
    if(withtable == true) html += "<tr><td colspan='10' class='text-center'>";
    html += '<center><img class="loading-gif-image" src="'+base_url+'/assets/img/loading-data.gif" alt="Loading ..."></center>';
    if(withtable == true) html += "</td><td>";
    return html;
}

function resetformvalue(selector) {
    $(selector).trigger("reset"); //Reset value di form. Kecuali Select2
    $(selector + " select").val("").trigger("change"); //Reset seluruh Select2 yang ada di form
}

function AlertShow(msg, type) {
  return '<div class="custom-alerts alert alert-'+ type +' fade in col-md-12"><a role="button" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>'+ msg +'</div>';
}

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
$(".filter").on('shown.bs.collapse', function(){
    SetHeight();
});
$(".filter").on('hidden.bs.collapse', function(){
    SetHeight();
});

// START GET DATA DROPDOWN ------------------------------------------------------------
function GetDropdownPosisi(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama_mesin asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/absensi/ajax_mesin_absensi",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Posisi Mesin Absensi </option>";
                    result += resp.lsdt;
                $(".dropdown-posisi").html(result);
                if(selected != "") {
                    $(".dropdown-posisi").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-posisi-not-disabled").select2({
                disabled: false
            });
            $(".loading-dropdown-posisi-absensi").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-posisi").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-posisi-absensi").addClass("hidden");
        }
    });
}
function GetDropdownKaryawan(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/administrator/ajax_karyawan",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Karyawan</option>";
                    result += resp.lsdt;
                $(".dropdown-karyawan").html(result);
                if(selected != "") {
                    $(".dropdown-karyawan").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-karyawan").select2({
                disabled: false
            });
            $(".loading-dropdown-karyawan").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-karyawan").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-karyawan").addClass("hidden");
        }
    });
}
function GetDropdownKelas(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_kelas",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option kode-kelas='' value=''>Pilih Kelas</option>";
                    result += resp.lsdt;
                $(".dropdown-kelas").html(result);
                if(selected != "") {
                    $(".dropdown-kelas").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kelas").select2({
                disabled: false
            });
            $(".loading-dropdown-kelas").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kelas").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kelas").addClass("hidden");
        }
    });
}
function GetDropdownPeriodePsb(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/psb/ajax_periode_psb",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option kuota='-' value=''>Pilih Periode</option>";
                    result += resp.lsdt;
                $(".dropdown-periode-psb").html(result);
                if(selected != "") {
                    $(".dropdown-periode-psb").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-periode-psb").select2({
                disabled: false
            });
            $(".loading-dropdown-periode-psb").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-periode-psb").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-periode-psb").addClass("hidden");
        }
    });
}
function GetDropdownBank(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "kode_bank asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/keuangan/ajax_bank",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option nama-bank='' value=''>Pilih Bank</option>";
                    result += resp.lsdt;
                $(".dropdown-bank").html(result);
                if(selected != "") {
                    $(".dropdown-bank").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-bank").select2({
                disabled: false
            });
            $(".loading-dropdown-bank").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-bank").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-bank").addClass("hidden");
        }
    });
}
function GetDropdownRekening(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama_bank asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/keuangan/ajax_rekening_sekolah",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Rekening</option>";
                    result += resp.lsdt;
                $(".dropdown-rekening").html(result);
                if(selected != "") {
                    $(".dropdown-rekening").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-rekening").select2({
                disabled: false
            });
            $(".loading-dropdown-rekening").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-rekening").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-rekening").addClass("hidden");
        }
    });
}
function GetDropdownKategoriTagihan(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/keuangan/ajax_tagihan_kategori",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-tagihan").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-tagihan").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-tagihan").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-tagihan").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-tagihan").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-tagihan").addClass("hidden");
        }
    });
}
function GetDropdownKategoriAbsensi(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/absensi/ajax_kategori_absensi",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-absensi").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-absensi").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-absensi").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-absensi").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-absensi").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-absensi").addClass("hidden");
        }
    });
}
function GetDropdownKategoriPengumuman(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/pengumuman/ajax_pengumuman_kategori",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-pengumuman").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-pengumuman").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-pengumuman").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-pengumuman").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-pengumuman").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-pengumuman").addClass("hidden");
        }
    });
}
function GetDropdownKategoriPerijinan(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/perijinan/ajax_perijinan_kategori",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-perijinan").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-perijinan").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-perijinan").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-perijinan").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-perijinan").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-perijinan").addClass("hidden");
        }
    });
}
function GetDropdownKategoriBerita(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/berita/ajax_berita_kategori",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-berita").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-berita").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-berita").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-berita").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-berita").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-berita").addClass("hidden");
        }
    });
}
function GetDropdownKategoriKasus(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/kasus/ajax_kasus_kategori",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Kategori</option>";
                    result += resp.lsdt;
                $(".dropdown-kategori-kasus").html(result);
                if(selected != "") {
                    $(".dropdown-kategori-kasus").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-kategori-kasus").select2({
                disabled: false
            });
            $(".loading-dropdown-kategori-kasus").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-kategori-kasus").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-kategori-kasus").addClass("hidden");
        }
    });
}
function GetDropdownProvinsi(selected, kategori, successfunc, target) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_provinsi",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(target == "" || target == null || target == undefined){
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Provinsi</option>";
                        result += resp.lsdt;
                    $(".dropdown-provinsi").html(result);
                    if(selected != "") {
                        $(".dropdown-provinsi").val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-provinsi").select2({
                    disabled: false
                });
                $(".loading-dropdown-provinsi").addClass("hidden");
            } else {
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Provinsi</option>";
                        result += resp.lsdt;
                    $(".dropdown-provinsi-"+target).html(result);
                    if(selected != "") {
                        $(".dropdown-provinsi-"+target).val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-provinsi-"+target).select2({
                    disabled: false
                });
                $(".loading-dropdown-provinsi-"+target).addClass("hidden");
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(target == "" || target == null || target == undefined){
                $(".select2.dropdown-provinsi").select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-provinsi").addClass("hidden");
            } else {
                $(".select2.dropdown-provinsi-"+target).select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-provinsi-"+target).addClass("hidden");
            }
        }
    });
}
function GetDropdownKota(selected, kategori, successfunc, target, parent) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    parent = (typeof parent !== 'undefined') ?  parent : "";
    request["Sort"] = "nama asc";
    request["id_provinsi"] = kategori;
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_kota",
        data: {act:"datadropdown", req: req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(parent != "") {
                if(target == "" || target == null || target == undefined){
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kota/Kabupaten</option>";
                            result += resp.lsdt;
                        $(".mt-repeater-item:nth-child("+parent+") .dropdown-kota").html(result);
                        if(selected != "") {
                            $(".mt-repeater-item:nth-child("+parent+") .dropdown-kota").val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kota").select2({
                        disabled: false
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kota").addClass("hidden");
                } else {
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kota/Kabupaten</option>";
                            result += resp.lsdt;
                        $(".mt-repeater-item:nth-child("+parent+") .dropdown-kota-"+target).html(result);
                        if(selected != "") {
                            $(".mt-repeater-item:nth-child("+parent+") .dropdown-kota-"+target).val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kota-"+target).select2({
                        disabled: false
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kota-"+target).addClass("hidden");
                }
            } else {
                if(target == "" || target == null || target == undefined){
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kota/Kabupaten</option>";
                            result += resp.lsdt;
                        $(".dropdown-kota").html(result);
                        if(selected != "") {
                            $(".dropdown-kota").val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".select2.dropdown-kota").select2({
                        disabled: false
                    });
                    $(".loading-dropdown-kota").addClass("hidden");
                } else {
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kota/Kabupaten</option>";
                            result += resp.lsdt;
                        $(".dropdown-kota-"+target).html(result);
                        if(selected != "") {
                            $(".dropdown-kota-"+target).val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".select2.dropdown-kota-"+target).select2({
                        disabled: false
                    });
                    $(".loading-dropdown-kota-"+target).addClass("hidden");
                }
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(parent != "") {
                if(target == "" || target == null || target == undefined){
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kota").select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kota").addClass("hidden");
                } else {
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kota-"+target).select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kota-"+target).addClass("hidden");
                }
            } else {
                if(target == "" || target == null || target == undefined){
                    $(".select2.dropdown-kota").select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".loading-dropdown-kota").addClass("hidden");
                } else {
                    $(".select2.dropdown-kota-"+target).select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".loading-dropdown-kota-"+target).addClass("hidden");
                }
            }
        }
    });
}
function GetDropdownKecamatan(selected, kategori, successfunc, target, parent) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    parent = (typeof parent !== 'undefined') ?  parent : "";
    request["Sort"] = "nama asc";
    request["id_kota"] = kategori;
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_kecamatan",
        data: {act:"datadropdown", req: req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(parent != "") {
                if(target == "" || target == null || target == undefined){
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kecamatan</option>";
                            result += resp.lsdt;
                        $(".mt-repeater-item:nth-child("+parent+") .dropdown-kecamatan").html(result);
                        if(selected != "") {
                            $(".mt-repeater-item:nth-child("+parent+") .dropdown-kecamatan").val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kecamatan").select2({
                        disabled: false
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kecamatan").addClass("hidden");
                } else {
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kecamatan</option>";
                            result += resp.lsdt;
                        $(".mt-repeater-item:nth-child("+parent+") .dropdown-kecamatan-"+target).html(result);
                        if(selected != "") {
                            $(".mt-repeater-item:nth-child("+parent+") .dropdown-kecamatan-"+target).val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kecamatan-"+target).select2({
                        disabled: false
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kecamatan-"+target).addClass("hidden");
                }
            } else {
                if(target == "" || target == null || target == undefined){
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kecamatan</option>";
                            result += resp.lsdt;
                        $(".dropdown-kecamatan").html(result);
                        if(selected != "") {
                            $(".dropdown-kecamatan").val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".select2.dropdown-kecamatan").select2({
                        disabled: false
                    });
                    $(".loading-dropdown-kecamatan").addClass("hidden");
                } else {
                    if(resp.lsdt && resp.lsdt != "undefined") {
                        var result  = "<option value=''>Pilih Kecamatan</option>";
                            result += resp.lsdt;
                        $(".dropdown-kecamatan-"+target).html(result);
                        if(selected != "") {
                            $(".dropdown-kecamatan-"+target).val(selected).trigger("change");
                        }
                        if(successfunc != "") {
                            successfunc(resp);
                        }
                    }
                    $(".select2.dropdown-kecamatan-"+target).select2({
                        disabled: false
                    });
                    $(".loading-dropdown-kecamatan-"+target).addClass("hidden");
                }
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(parent != "") {
                if(target == "" || target == null || target == undefined){
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kecamatan").select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kecamatan").addClass("hidden");
                } else {
                    $(".mt-repeater-item:nth-child("+parent+") .select2.dropdown-kecamatan-"+target).select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".mt-repeater-item:nth-child("+parent+") .loading-dropdown-kecamatan-"+target).addClass("hidden");
                }
            } else {
                if(target == "" || target == null || target == undefined){
                    $(".select2.dropdown-kecamatan").select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".loading-dropdown-kecamatan").addClass("hidden");
                } else {
                    $(".select2.dropdown-kecamatan-"+target).select2({
                        disabled: true,
                        placeholder: "Periksa koneksi internet anda kembali",
                    });
                    $(".loading-dropdown-kecamatan-"+target).addClass("hidden");
                }
            }
        }
    });
}
function GetDropdownMataPelajaran(selected, kategori, successfunc, target) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_mapel",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(target == "" || target == null || target == undefined){
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option nama-pelajaran='' value=''>Pilih Mata Pelajaran</option>";
                        result += resp.lsdt;
                    $(".dropdown-mapel").html(result);
                    if(selected != "") {
                        $(".dropdown-mapel").val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-mapel").select2({
                    disabled: false
                });
                $(".loading-dropdown-mapel").addClass("hidden");
            } else {
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Mata Pelajaran</option>";
                        result += resp.lsdt;
                    $(".dropdown-mapel-"+target).html(result);
                    if(selected != "") {
                        $(".dropdown-mapel-"+target).val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-mapel-"+target).select2({
                    disabled: false
                });
                $(".loading-dropdown-mapel-"+target).addClass("hidden");
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(target == "" || target == null || target == undefined){
                $(".select2.dropdown-mapel").select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-mapel").addClass("hidden");
            } else {
                $(".select2.dropdown-mapel-"+target).select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-mapel-"+target).addClass("hidden");
            }
        }
    });
}
function GetDropdownKelasMataPelajaran(selected, kategori, successfunc, target) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    request["id_pelajaran"] = kategori;
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/master_data/ajax_kelas",
        data: {act:"datadropdown_mapel", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(target == "" || target == null || target == undefined){
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option kode-kelas='' value=''>Pilih Kelas</option>";
                        result += resp.lsdt;
                    $(".dropdown-kelas").html(result);
                    if(selected != "") {
                        $(".dropdown-kelas").val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-kelas").select2({
                    disabled: false
                });
                $(".loading-dropdown-kelas").addClass("hidden");
            } else {
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Kelas</option>";
                        result += resp.lsdt;
                    $(".dropdown-kelas-"+target).html(result);
                    if(selected != "") {
                        $(".dropdown-kelas-"+target).val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-kelas-"+target).select2({
                    disabled: false
                });
                $(".loading-dropdown-kelas-"+target).addClass("hidden");
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(target == "" || target == null || target == undefined){
                $(".select2.dropdown-kelas").select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-kelas").addClass("hidden");
            } else {
                $(".select2.dropdown-kelas-"+target).select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-kelas-"+target).addClass("hidden");
            }
        }
    });
}
function GetDropdownTarif(selected, kategori, successfunc, target) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    request["id_kategori"] = kategori;
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/keuangan/ajax_tarif",
        data: {act:"datadropdown", req: req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(target == "" || target == null || target == undefined){
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Tarif</option>";
                        result += resp.lsdt;
                    $(".dropdown-tarif").html(result);
                    if(selected != "") {
                        $(".dropdown-tarif").val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-tarif").select2({
                    disabled: false
                });
                $(".loading-dropdown-tarif").addClass("hidden");
            } else {
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Tarif</option>";
                        result += resp.lsdt;
                    $(".dropdown-tarif-"+target).html(result);
                    if(selected != "") {
                        $(".dropdown-tarif-"+target).val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-tarif-"+target).select2({
                    disabled: false
                });
                $(".loading-dropdown-tarif-"+target).addClass("hidden");
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(target == "" || target == null || target == undefined){
                $(".select2.dropdown-tarif").select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-tarif").addClass("hidden");
            } else {
                $(".select2.dropdown-tarif-"+target).select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-tarif-"+target).addClass("hidden");
            }
        }
    });
}
function GetDropdownKategoriNilai(selected, kategori, successfunc, target) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/nilai_rapor/ajax_nilai_kategori",
        data: {act:"datadropdown", req: req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit : 3,
        success: function(resp){
            if(target == "" || target == null || target == undefined){
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Kategori Nilai</option>";
                        result += resp.lsdt;
                    $(".dropdown-kategori-nilai").html(result);
                    if(selected != "") {
                        $(".dropdown-kategori-nilai").val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-kategori-nilai").select2({
                    disabled: false
                });
                $(".loading-dropdown-kategori-nilai").addClass("hidden");
            } else {
                if(resp.lsdt && resp.lsdt != "undefined") {
                    var result  = "<option value=''>Pilih Kategori Nilai</option>";
                        result += resp.lsdt;
                    $(".dropdown-kategori-nilai-"+target).html(result);
                    if(selected != "") {
                        $(".dropdown-kategori-nilai-"+target).val(selected).trigger("change");
                    }
                    if(successfunc != "") {
                        successfunc(resp);
                    }
                }
                $(".select2.dropdown-kategori-nilai-"+target).select2({
                    disabled: false
                });
                $(".loading-dropdown-kategori-nilai-"+target).addClass("hidden");
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(target == "" || target == null || target == undefined){
                $(".select2.dropdown-kategori-nilai").select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-kategori-nilai").addClass("hidden");
            } else {
                $(".select2.dropdown-kategori-nilai-"+target).select2({
                    disabled: true,
                    placeholder: "Periksa koneksi internet anda kembali",
                });
                $(".loading-dropdown-kategori-nilai-"+target).addClass("hidden");
            }
        }
    });
}
function GetDropdownHakAkses(selected, kategori, successfunc) {
    selected = (typeof selected !== 'undefined') ?  selected : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    request["Sort"] = "nama asc";
    req = request;
    $.ajax({
        type: "POST",
        url: base_url + "/administrator/ajax_hak_akses",
        data: {act:"datadropdown", req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt && resp.lsdt != "undefined") {
                var result  = "<option value=''>Pilih Hak Akses</option>";
                    result += resp.lsdt;
                $(".dropdown-hak-akses").html(result);
                if(selected != "") {
                    $(".dropdown-hak-akses").val(selected).trigger("change");
                }
                if(successfunc != "") {
                    successfunc(resp);
                }
            }
            $(".select2.dropdown-hak-akses").select2({
                disabled: false
            });
            $(".loading-dropdown-hak-akses").addClass("hidden");
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".select2.dropdown-hak-akses").select2({
                disabled: true,
                placeholder: "Periksa koneksi internet anda kembali",
            });
            $(".loading-dropdown-hak-akses").addClass("hidden");
        }
    });
}
// END GET DATA DROPDOWN --------------------------------------------------------------

// START CRUD REPEATER ----------------------------------------------------------------
// END CRUD REPEATER ------------------------------------------------------------------

// START CRUD AJAX --------------------------------------------------------------------
function GetListGroup(req, action, table, successfunc) {
    req = (typeof req !== 'undefined') ?  req : "";
    act = (action != "") ? action : "listdatahtml";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    $(".datatable-"+table).html(loader());
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {act:act, req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.paging.Total != undefined) {
                $(".datatable-"+table).html(resp.lsdt);
                setpagination(resp.paging, table);
                if(successfunc != "") {
                    getfunc = successfunc;
                    successfunc(resp);
                }
            } else {
                $(".datatable-"+table).html(resp.lsdt);
                $(".set-pagination-layout-"+table).addClass("hidden");
                if(successfunc != "") {
                    getfunc = successfunc;
                    successfunc(resp);
                }
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".datatable-"+table).html("<a class='list-group-item readonly text-center' style='cursor:default;' role='button'><span class='label label-warning label-form'>Periksa koneksi internet anda kembali</span></a>");
            $(".set-pagination-layout-"+table).addClass("hidden");
        }
    });
}
function GetData(req, action, table, successfunc) {
    req = (typeof req !== 'undefined') ?  req : "";
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    act = (action != "") ? action : "listdatahtml";
    req["Sort"] = $("#FrmFilter").find(".select.sort").val();
    if(req["Sort"] == "id desc" || req["Sort"] == "id asc" || req["Sort"] == ""){
        req["Sort"] = "tgl_insert desc";
    }
    $(".datatable-"+table+" tbody").html(loader(true));
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {act:act, req:req},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.lsdt == "SESSION"){
                window.location.href = base_url + "/login/session_token_expired.html";
            } else {
                if(resp.paging.Total != undefined) {
                    $(".datatable-"+table+" tbody").html(resp.lsdt);
                    pagination(resp.paging, table);
                    if(successfunc != "") {
                        getfunc = successfunc;
                        successfunc(resp);
                    }
                } else {
                    $(".datatable-"+table+" tbody").html(resp.lsdt);
                    $(".pagination-layout-"+table).addClass("hidden");
                    if(successfunc != "") {
                        getfunc = successfunc;
                        successfunc(resp);
                    }
                }
            }
            
        },
        error: function(xhr, textstatus, errorthrown) {
            $(".datatable-"+table+" tbody").html("<tr><td colspan='10' class='text-center'><span class='label label-warning'>Periksa koneksi internet anda kembali</span></td></tr>");
            $(".pagination-layout-"+table).addClass("hidden");
        }
    });
}
function GetDataById(id, successfunc, action, errorfunc) {
    action = (typeof action !== 'undefined') ?  action : "getdatabyid";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {"act":action, req:id},
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            resp = JSON.parse(resp);
            if(resp.IsError == false) {
                if(resp.Data.length == 0) {
                    $(".modal").modal("hide");
                    toastrshow("error", "Data tidak ditemukan", "Error");
                    successfunc(resp);
                } else {
                    successfunc(resp);
                }
            } else {
                toastrshow("warning", resp.ErrMessage, "Peringatan");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                    errorfunc(resp);
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
function GetDataFullById(id, successfunc, errorfunc) {
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {"act":"getdatafullbyid", req:id},
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            resp = JSON.parse(resp);
            if(resp.IsError == false) {
                if(resp.Data.length == 0) {
                    $(".modal").modal("hide");
                    toastrshow("error", "Data tidak ditemukan", "Error");
                } else {
                    successfunc(resp);
                }
            } else {
                toastrshow("error", resp.ErrMessage, "Error");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                    errorfunc(resp);
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
function InsertData(selectorform, successfunc, errorfunc) {
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    errorfunc = (typeof errorfunc !== 'undefined') ?  errorfunc : "";
    var formdata   = $(selectorform).serialize() +"&act=insertdata";
    var formaction = $(selectorform).attr("action");
    $.ajax({
        type: "POST",
        url: base_url + formaction,
        data: formdata,
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        beforeSend: function() {
            laddasubmit.ladda("start");
        },
        success: function(resp){
            laddasubmit.ladda("stop");
            if(resp.IsError == false) {
                toastrshow("success", "Data berhasil disimpan", "Success");
                $(selectorform).parents(".modal").modal("hide"); //Tutup modal
                if(successfunc != "") {
                    successfunc(resp);
                }
            } else {
                toastrshow("error", resp.ErrMessage, "Error");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
                if(errorfunc != "") {
                    errorfunc();
                }
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
function UpdateData(selectorform, successfunc, errorfunc) {
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    errorfunc = (typeof errorfunc !== 'undefined') ?  errorfunc : "";
    var formdata   = $(selectorform).serialize() +"&act=updatedata";
    var formaction = $(selectorform).attr("action");
    $.ajax({
        type: "POST",
        url: base_url + formaction,
        data: formdata,
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        beforeSend: function() {
            laddasubmit.ladda("start");
        },
        success: function(resp){
            laddasubmit.ladda("stop");
            if(resp.IsError == false) {
                toastrshow("success", "Data berhasil disimpan", "Success");
                $(selectorform).parents(".modal").modal("hide"); //Tutup modal
                if(successfunc != "") {
                    successfunc(resp);
                }
            } else {
                toastrshow("error", resp.ErrMessage, "Error");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
                if(errorfunc != "") {
                    errorfunc();
                }
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
function DeleteData(id_delete, page_name, successfunc) {
    successfunc = (typeof successfunc !== 'undefined') ?  successfunc : "";
    $.ajax({
        type: "POST",
        url: base_url + page_name,
        data: {act:"deletedata", req: {"id": id_delete}},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        beforeSend: function() {
            l.ladda("start");
        },
        success: function(resp){
            l.ladda("stop");
            if(resp.IsError == false) {
                toastrshow("success", "Data berhasil dihapus", "Success");
                if(successfunc != "") {
                    successfunc(resp);
                }
            } else {
                toastrshow("error", resp.ErrMessage, "Error");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            if(textstatus == "timeout") {
                this.tryCount++;
                if(this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }
        }
    });
}
// END CRUD AJAX ----------------------------------------------------------------------

// START CRUD NOT AJAX ----------------------------------------------------------------
// END CRUD NOT AJAX ------------------------------------------------------------------

// START PAGINATION -------------------------------------------------------------------
function pagination(page, table) {
    var paginglayout = $(".pagination-layout-"+table);
    var infopage = page.InfoPage+" Records | "+page.JmlHalTotal+" Pages";
    
    paginglayout.removeClass("hidden");
    paginglayout.find("input[type='text']").val(Number(page.HalKe));
    paginglayout.find("div.info").html(infopage);
    if(page.IsNext == true) {
        paginglayout.find(".btn.next, .next-head").removeClass("disabled");
        paginglayout.find(".btn.last").removeClass("disabled");
        paginglayout.find(".btn.last").attr("lastpage", page.JmlHalTotal);
        datanext = (Number(page.HalKe) + 1);
    } else {
        paginglayout.find(".btn.next, .next-head").addClass("disabled");
        paginglayout.find(".btn.last").addClass("disabled");
        dataprev = 0;
    }
    if(page.IsPrev == true) {
        paginglayout.find(".btn.prev, .prev-head").removeClass("disabled");
        paginglayout.find(".btn.first").removeClass("disabled");
        dataprev = (Number(page.HalKe) - 1);
    } else {
        paginglayout.find(".btn.prev, .prev-head").addClass("disabled");
        paginglayout.find(".btn.first").addClass("disabled");
        dataprev = 0;
    }
}
function setpagination(page, table) {
    var paginglayout = $(".set-pagination-layout-"+table);
    var infopage = page.InfoPage+" Records | "+page.JmlHalTotal+" Pages";
    paginglayout.removeClass("hidden");
    paginglayout.find("input[type='text']").val(Number(page.HalKe));
    paginglayout.find("div.info").html(infopage);
    if(page.IsNext == true) {
        paginglayout.find(".btn.next").removeClass("disabled");
        paginglayout.find(".btn.last").removeClass("disabled");
        paginglayout.find(".btn.last").attr("lastpage", page.JmlHalTotal);
        datanext = (Number(page.HalKe) + 1);
    } else {
        paginglayout.find(".btn.next").addClass("disabled");
        paginglayout.find(".btn.last").addClass("disabled");
        dataprev = 0;
    }
    if(page.IsPrev == true) {
        paginglayout.find(".btn.prev").removeClass("disabled");
        paginglayout.find(".btn.first").removeClass("disabled");
        dataprev = (Number(page.HalKe) - 1);
    } else {
        paginglayout.find(".btn.prev").addClass("disabled");
        paginglayout.find(".btn.first").addClass("disabled");
        dataprev = 0;
    }
}
$(".btn.next").click(function() {
    var table = $(this).parent().parent().parent().attr("class");
    var classdata = table.replace(/modal-footer set-pagination-layout-/g, "", table);
    table = table.replace(classdata, "", table);
    if(table == "modal-footer set-pagination-layout-"){
        pagename = $(this).parent().parent().parent().attr("pagename");
        request["Page"] = datanext;
        GetListGroup(request, act, classdata, getfunc);
    } else {
        pagename = $(this).parent().parent().parent().parent().parent().parent().attr("pagename");
        var table = $(this).parent().parent().parent().parent().parent().parent().attr("class");
        table = table.replace(/pagination-layout-/g, "", table);
        request["Page"] = datanext;
        GetData(request, act, table, getfunc);
    }
});
$(".btn.prev").click(function() {
    var table = $(this).parent().parent().parent().attr("class");
    var classdata = table.replace(/modal-footer set-pagination-layout-/g, "", table);
    table = table.replace(classdata, "", table);
    if(table == "modal-footer set-pagination-layout-"){
        pagename = $(this).parent().parent().parent().attr("pagename");
        request["Page"] = dataprev;
        GetListGroup(request, act, classdata, getfunc);
    } else {
        pagename = $(this).parent().parent().parent().parent().parent().parent().attr("pagename");
        var table = $(this).parent().parent().parent().parent().parent().parent().attr("class");
        table = table.replace(/pagination-layout-/g, "", table);
        request["Page"] = dataprev;
        GetData(request, act, table, getfunc);
    }
});
$(".btn.first").click(function() {
    var table = $(this).parent().parent().parent().parent().parent().parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    request["Page"] = 1;
    pagename = $(this).parent().parent().parent().parent().parent().parent().attr("pagename");
    GetData(request, act, table, getfunc);
});
$(".btn.last").click(function() {
    var table = $(this).parent().parent().parent().parent().parent().parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    request["Page"] = $(this).attr('lastpage');
    pagename = $(this).parent().parent().parent().parent().parent().parent().attr("pagename");
    GetData(request, act, table, getfunc);
});
$(".limit").change(function() {
    var table = $(this).parent().parent().parent().parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    var limit = $(this).val();
    pagename = $(this).parent().parent().parent().parent().attr("pagename");
    request["Limit"] = limit;
    GetData(request, act, table, getfunc);
});
$("#FrmGotoPage").submit(function() {
    var table = $(this).parent().parent().parent().parent().parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    var page = $(this).find("input[type='text']").val();
    request["Page"] = page;
    pagename = $(this).parent().parent().parent().parent().parent().attr("pagename");
    GetData(request, act, table, getfunc);
    return false;
});

$(".btn.next-head").click(function() {
    var table = $(this).parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    request["Page"] = datanext;
    pagename = $(this).parent().attr("pagename");
    GetData(request, act, table, getfunc);
});
$(".btn.prev-head").click(function() {
    var table = $(this).parent().attr("class");
    table = table.replace(/pagination-layout-/g, "", table);
    request["Page"] = dataprev;
    pagename = $(this).parent().attr("pagename");
    GetData(request, act, table, getfunc);
});
// END PAGINATION ---------------------------------------------------------------------

// ------------------------------------------------------------------------------------

// START VARIABLE MODAL ---------------------------------------------------------------
var absensi_detail = $("#modal-detail-absensi-keterangan");

var siswa_detail = $("#modal-detail-siswa");
var siswa_status = $(".form-siswa-status");
var password_siswa = $(".form-password-siswa");
var password_wali = $(".form-password-wali");
var siswa_import = $(".form-siswa-import");

var karyawan_detail = $("#modal-detail-karyawan");
var karyawan_status = $(".form-karyawan-status");
var karyawan_import = $(".form-karyawan-import");
var password_karyawan_edit = $(".form-password-karyawan");

var kelas_detail = $("#modal-detail-kelas");
var kelas_baru = $(".form-kelas-baru");
var kelas_edit = $(".form-kelas-edit");
var kelas_status = $(".form-kelas-status");
var kelas_import = $(".form-kelas-import");
var list_siswa_kelas = $("#modal-list-siswa-per-kelas");

var kategori_nilai_baru = $(".form-kategori-nilai-baru");
var kategori_nilai_detail = $("#modal-detail-kategori-nilai");
var kategori_nilai_edit = $(".form-kategori-nilai-edit");
var kategori_nilai_status = $(".form-kategori-nilai-status");

var mapel_detail = $("#modal-detail-mapel");
var mapel_baru = $(".form-mapel-baru");
var mapel_edit = $(".form-mapel-edit");
var mapel_status = $(".form-mapel-status");
var mapel_repeater_load = true;

var ruangan_detail = $("#modal-detail-ruangan");
var ruangan_baru = $(".form-ruangan-baru");
var ruangan_edit = $(".form-ruangan-edit");
var ruangan_status = $(".form-ruangan-status");
var ruangan_import = $(".form-ruangan-import");

var berita_detail = $("#modal-detail-berita");
var berita_status = $("#modal-edit-status-berita");

var kategori_berita_detail = $("#modal-detail-kategori-berita");
var kategori_berita_status = $(".form-kategori-berita-status");
var kategori_berita_edit = $(".form-kategori-berita-edit");
var kategori_berita_baru = $(".form-kategori-berita-baru");

var kasus_detail = $("#modal-detail-kasus");
var kasus_status = $("#modal-edit-status-kasus");

var kategori_kasus_detail = $("#modal-detail-kategori-kasus");
var kategori_kasus_status = $(".form-kategori-kasus-status");
var kategori_kasus_edit = $(".form-kategori-kasus-edit");
var kategori_kasus_baru = $(".form-kategori-kasus-baru");

var kategori_perijinan_detail = $("#modal-detail-kategori-perijinan");
var kategori_perijinan_status = $(".form-kategori-perijinan-status");
var kategori_perijinan_edit = $(".form-kategori-perijinan-edit");
var kategori_perijinan_baru = $(".form-kategori-perijinan-baru");

var perijinan_detail = $("#modal-detail-perijinan");
var perijinan_baru = $(".form-perijinan-baru");
var perijinan_edit = $(".form-perijinan-edit");
var perijinan_status = $(".form-perijinan-status");

var pengumuman_detail = $("#modal-detail-pengumuman");
var pengumuman_status = $("#modal-edit-status-pengumuman");

var kategori_pengumuman_detail = $("#modal-detail-kategori-pengumuman");
var kategori_pengumuman_status = $(".form-kategori-pengumuman-status");
var kategori_pengumuman_edit = $(".form-kategori-pengumuman-edit");
var kategori_pengumuman_baru = $(".form-kategori-pengumuman-baru");

var kategori_absensi_detail = $("#modal-detail-kategori-absensi");
var kategori_absensi_baru = $(".form-kategori-absensi-baru");
var kategori_absensi_edit = $(".form-kategori-absensi-edit");
var kategori_absensi_status = $(".form-kategori-absensi-status");

var posisi_absensi_detail = $("#modal-detail-mesin-absensi");
var posisi_absensi_baru = $(".form-mesin-absensi-baru");
var posisi_absensi_edit = $(".form-mesin-absensi-edit");
var posisi_absensi_status = $(".form-mesin-absensi-status");

var kategori_tagihan_detail = $("#modal-detail-kategori-tagihan");
var kategori_tagihan_status = $(".form-kategori-tagihan-status");
var kategori_tagihan_edit = $(".form-kategori-tagihan-edit");
var kategori_tagihan_baru = $(".form-kategori-tagihan-baru");

var tarif_detail = $("#modal-detail-tarif");
var tarif_baru = $(".form-tarif-baru");
var tarif_edit = $(".form-tarif-edit");
var tarif_status = $(".form-tarif-status");

var tarif_khusus_baru = $(".form-tarif-khusus-baru");
var tarif_khusus_edit = $(".form-tarif-khusus-edit");
var tarif_khusus_status = $(".form-tarif-khusus-status");
var tarif_khusus_detail = $("#modal-detail-tarif-khusus");

var nilai_detail = $("#modal-detail-nilai");
var nilai_status = $("#modal-status-nilai");

var tagihan_edit = $(".form-tagihan-edit");
var tagihan_nonaktifkan = $("#modal-nonaktifkan-tagihan");
var tagihan_aktifkan = $("#modal-aktifkan-tagihan");
var is_tagihan_edit = false;

var pembayaran_detail = $("#modal-detail-pembayaran");
var pembayaran_edit = $("#modal-edit-pembayaran");

var rekening_sekolah_detail = $("#modal-detail-rekening-sekolah");
var rekening_sekolah_status = $(".form-rekening-sekolah-status");
var rekening_sekolah_edit = $(".form-rekening-sekolah-edit");
var rekening_sekolah_baru = $(".form-rekening-sekolah-baru");

var periode_psb_detail = $("#modal-detail-periode-psb");
var periode_psb_status = $(".form-periode-psb-status");
var periode_psb_edit = $(".form-periode-psb-edit");
var periode_psb_baru = $(".form-periode-psb-baru");
var periode_psb_repeater_syarat_load = true;
var periode_psb_repeater_nilai_load = true;
// END VARIABLE MODAL -----------------------------------------------------------------

// START SHOW MODAL -------------------------------------------------------------------
// START KELAS
$("#modal-detail-kelas").on("click", ".list-siswa-per-kelas", function() {
    $("#modal-list-siswa-per-kelas .modal-title").html("Daftar Siswa Kelas : "+$(this).attr("data-kode")+" - "+$(this).attr("data-nama"));
    list_siswa_kelas.find(".loading-gif-image").removeClass("hidden");
    list_siswa_kelas.find(".after-loading").addClass("hidden");
    $("#modal-list-siswa-per-kelas").modal("show");

    id_update = $(this).attr("data-id");
    request["Sort"] = "nama asc";
    request["Page"] = "";
    request["Limit"] = "";
    request["filter"]["id_kelas"] = id_update;
    request["filter"]["id"] = "";
    request["filter"]["status"] = "1";
    request["filter"]["kywd"] = "";
    pagename = "/master_data/ajax_siswa";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {act:"getdataall_kelas", req:request},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.IsError == false) {
                list_per_kelas = "";
                if(resp.Data.length == 0){
                    list_per_kelas += "<tr><td colspan='3'><center><span class='label label-warning label-form'>Tidak ada siswa</span></center></td></tr>";
                    list_siswa_kelas.find("tbody").html(list_per_kelas);
                    list_siswa_kelas.find(".loading-gif-image").addClass("hidden");
                    list_siswa_kelas.find(".after-loading").removeClass("hidden");
                } else {
                    x = 1;
                    $.each(resp.Data, function(index, item) {
                        if(item.nama_panggilan_siswa == "" || item.nama_panggilan_siswa == null){
                            nama_panggilan_siswa = "";
                        } else {
                            nama_panggilan_siswa = " ("+item.nama_panggilan_siswa+")";
                        }
                        list_per_kelas += "<tr><td class='text-center'>"+x+".</td><td><a class='detail-siswa' data-id='"+item.id+"'>"+item.nama+nama_panggilan_siswa+"</a></td><td>"+item.nis+"</td></tr>";
                        x++;
                    });
                    list_siswa_kelas.find("tbody").html(list_per_kelas);
                    list_siswa_kelas.find(".loading-gif-image").addClass("hidden");
                    list_siswa_kelas.find(".after-loading").removeClass("hidden");
                }
            } else {
                toastrshow("warning", resp.ErrMessage, "Peringatan");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
});
$(".datatable-kelas tbody, #modal-detail-kelas").on("click", ".status-kelas", function() {
    $("#modal-status-kelas .modal-title").html("Edit Status : Nama Kelas");
    kelas_status.find(".loading-gif-image").removeClass("hidden");
    kelas_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kelas").modal("show");

    var id_update = $(this).attr("data-id");
    kelas_status.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_kelas";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kelas_status.find("input[name='form[kode]']").val(resp.kode);
        kelas_status.find(".edit-status").val(resp.is_active).trigger("change");
        kelas_status.find(".loading-gif-image").addClass("hidden");
        kelas_status.find(".after-loading").removeClass("hidden");
        kelas_status.find("div.edit-status").addClass('open');
        $("#modal-status-kelas .modal-title").html("Edit Kelas : " + resp.kode + " - " + resp.nama);
    });
});
$(".datatable-kelas tbody, #modal-detail-kelas").on("click", ".edit-kelas", function() {
    $("#modal-edit-kelas .modal-title").html("Edit Kelas : Nama Kelas");
    kelas_edit.find(".loading-gif-image").removeClass("hidden");
    kelas_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kelas").modal("show");

    var id_update = $(this).attr("data-id");
    kelas_edit.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_kelas";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kelas_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kelas_edit.find("input[name='form[nama]']").val(resp.nama);
        kelas_edit.find("input[name='form[kode]']").val(resp.kode);
        if(resp.id_karyawan == 0 || resp.id_karyawan == null || resp.id_karyawan == "0" || resp.id_karyawan == undefined){

        } else {
            kelas_edit.find(".dropdown-karyawan").val(resp.id_karyawan).trigger("change");
        }
        kelas_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kelas_edit.find(".loading-gif-image").addClass("hidden");
        kelas_edit.find(".after-loading").removeClass("hidden");
        kelas_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kelas .modal-title").html("Edit Kelas : " + resp.kode + " - " + resp.nama);
    });
});
$(".datatable-kelas tbody, .datatable-tarif-khusus tbody, .div-tagihan-detail, #modal-detail-pembayaran, #modal-edit-pembayaran, .datatable-tagihan tbody, .datatable-pembayaran tbody, .datatable-siswa-tarif-khusus tbody, .datatable-siswa tbody, #modal-detail-siswa, .datatable-absensi-hari tbody, .datatable-nilai-hari tbody, .datatable-kategori-nilai tbody, .datatable-sakit, .datatable-ijin, .datatable-alpa, #modal-detail-absensi-keterangan, .pengumuman_kelas_siswa, #modal-detail-mapel, #modal-detail-kategori-nilai, #modal-detail-kategori-tagihan, .datatable-nilai tbody, .datatable-top-10-kasus").on("click", ".detail-kelas", function() {
    if($("#modal-detail-kelas").hasClass('in')){
        id_update = kelas_detail.find(".edit-kelas").attr("data-id");
        $("#modal-list-siswa-per-kelas, #modal-detail-siswa").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_kelas(id_update);

});
$("#modal-tambah-kelas").on('show.bs.modal', function () {
    kelas_baru.find("input[name='form[nama]'], input[name='form[kode]'], textarea[name='form[keterangan]']").val("");
    kelas_baru.find("select[name='form[walikelas]']").val("").trigger("change");
    $("#modal-tambah-kelas").on('shown.bs.modal', function () {
        kelas_baru.find("input[name='form[nama]']").focus();
    });
});
$("#modal-edit-kelas").on('shown.bs.modal', function () {
    kelas_edit.find("input[name='form[nama]']").focus();
});
$("#modal-status-kelas").on('shown.bs.modal', function () {
    kelas_status.find("div.edit-status").addClass('open');
});
function detail_data_kelas(id_update){
    $("#modal-detail-kelas .modal-title").html("Detail Kelas : Nama Kelas");
    kelas_detail.find(".loading-gif-image").removeClass("hidden");
    kelas_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kelas").modal("show");
    pagename = "/master_data/ajax_kelas";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kelas_detail.find(".status-kelas").html(is_active);
        kelas_detail.find(".list-siswa-per-kelas").attr("data-nama", resp.nama);
        kelas_detail.find(".list-siswa-per-kelas").attr("data-kode", resp.kode);
        kelas_detail.find(".nama_kelas").text(resp.nama);
        kelas_detail.find(".kode_kelas").text(resp.kode);
        if(resp.id_guru == null || resp.id_guru == ""){
            kelas_detail.find(".walikelas_kelas").html("-");
        } else {
            kelas_detail.find(".walikelas_kelas").html("<a class='detail-karyawan' data-id='"+resp.id_guru+"'>"+resp.guru_nama+"</a>");
        }
        if(resp.keterangan == null || resp.keterangan == ""){
            kelas_detail.find(".keterangan_kelas").html("-");
        } else {
            kelas_detail.find(".keterangan_kelas").html(resp.keterangan);
        }
        if(hak_akses == false){
            kelas_detail.find(".edit-kelas, .status-kelas").addClass("disabled");
            kelas_detail.find(".list-siswa-per-kelas").attr("data-id", resp.id);
        } else {
            kelas_detail.find(".edit-kelas, .status-kelas").removeClass("disabled");
            kelas_detail.find(".list-siswa-per-kelas, .edit-kelas, .status-kelas").attr("data-id", resp.id);
        }
        kelas_detail.find(".tgl_insert_kelas").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kelas_detail.find(".tgl_last_update_kelas").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kelas_detail.find(".tgl_insert_kelas").prepend(tgl_insert);
        kelas_detail.find(".tgl_last_update_kelas").prepend(tgl_last_update);

        kelas_detail.find(".loading-gif-image").addClass("hidden");
        kelas_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kelas .modal-title").html("Detail Kelas : " + resp.kode + " - " + resp.nama);
    });
}
kelas_baru.find(".kode-kelas").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
kelas_edit.find(".kode-kelas").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
// END KELAS
// START RUANGAN
$(".datatable-ruangan tbody, #modal-detail-ruangan").on("click", ".status-ruangan", function() {
    $("#modal-status-ruangan .modal-title").html("Edit Status : Nama Ruangan");
    ruangan_status.find(".loading-gif-image").removeClass("hidden");
    ruangan_status.find(".after-loading").addClass("hidden");
    $("#modal-status-ruangan").modal("show");

    var id_update = $(this).attr("data-id");
    ruangan_status.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_ruangan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        ruangan_status.find(".edit-status").val(resp.is_active).trigger("change");
        ruangan_status.find(".loading-gif-image").addClass("hidden");
        ruangan_status.find(".after-loading").removeClass("hidden");
        ruangan_status.find("div.edit-status").addClass('open');
        $("#modal-status-ruangan .modal-title").html("Edit Ruangan : " + resp.kode_ruangan + " - " + resp.nama);
    });
});
$(".datatable-ruangan tbody, #modal-detail-ruangan").on("click", ".edit-ruangan", function() {
    $("#modal-edit-ruangan .modal-title").html("Edit Ruangan : Nama Ruangan");
    ruangan_edit.find(".loading-gif-image").removeClass("hidden");
    ruangan_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-ruangan").modal("show");

    var id_update = $(this).attr("data-id");
    ruangan_edit.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_ruangan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        ruangan_edit.find(".edit-status").val(resp.is_active).trigger("change");
        ruangan_edit.find("input[name='form[nama]']").val(resp.nama);
        ruangan_edit.find("input[name='form[kode_ruangan]']").val(resp.kode_ruangan);
        if(resp.id_karyawan == 0 || resp.id_karyawan == null || resp.id_karyawan == "0" || resp.id_karyawan == undefined){

        } else {
            ruangan_edit.find(".dropdown-karyawan").val(resp.id_karyawan).trigger("change");
        }
        ruangan_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        ruangan_edit.find(".loading-gif-image").addClass("hidden");
        ruangan_edit.find(".after-loading").removeClass("hidden");
        ruangan_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-ruangan .modal-title").html("Edit Ruangan : " + resp.kode_ruangan + " - " + resp.nama);
    });
});
$(".datatable-ruangan tbody").on("click", ".detail-ruangan", function() {
    id_update = $(this).attr("data-id");
    detail_data_ruangan(id_update);
});
$("#modal-tambah-ruangan").on('show.bs.modal', function () {
    ruangan_baru.find("input[name='form[nama]'], input[name='form[kode_ruangan]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-ruangan").on('shown.bs.modal', function () {
        ruangan_baru.find("input[name='form[nama]']").focus();
    });
});
$("#modal-edit-ruangan").on('shown.bs.modal', function () {
    ruangan_edit.find("input[name='form[nama]']").focus();
});
$("#modal-status-ruangan").on('shown.bs.modal', function () {
    ruangan_status.find("div.edit-status").addClass('open');
});
function detail_data_ruangan(id_update){
    $("#modal-detail-ruangan .modal-title").html("Detail Ruangan : Nama Ruangan");
    ruangan_detail.find(".loading-gif-image").removeClass("hidden");
    ruangan_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-ruangan").modal("show");
    pagename = "/master_data/ajax_ruangan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        ruangan_detail.find(".status-ruangan").html(is_active);
        ruangan_detail.find(".edit-ruangan, .status-ruangan").attr("data-id", resp.id);
        ruangan_detail.find(".nama_ruangan").text(resp.nama);
        ruangan_detail.find(".kode_ruangan").text(resp.kode_ruangan);
        if(resp.keterangan == null || resp.keterangan == ""){
            ruangan_detail.find(".keterangan_ruangan").html("-");
        } else {
            ruangan_detail.find(".keterangan_ruangan").html(resp.keterangan);
        }
        ruangan_detail.find(".tgl_insert_ruangan").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        ruangan_detail.find(".tgl_last_update_ruangan").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        ruangan_detail.find(".tgl_insert_ruangan").prepend(tgl_insert);
        ruangan_detail.find(".tgl_last_update_ruangan").prepend(tgl_last_update);

        ruangan_detail.find(".loading-gif-image").addClass("hidden");
        ruangan_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-ruangan .modal-title").html("Detail Ruangan : " + resp.kode_ruangan + " - " + resp.nama);
    });
}
ruangan_baru.find(".kode-ruangan").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
ruangan_edit.find(".kode-ruangan").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
// END RUANGAN
// START MATA PELAJARAN
$(".datatable-mapel tbody, .datatable-kategori-nilai tbody, #modal-detail-kategori-nilai, .datatable-nilai-per-siswa-tuntas tbody, .datatable-nilai-per-siswa-tidak-tuntas tbody, .datatable-nilai-per-siswa-tuntas-tidak-tuntas tbody, .datatable-nilai-harian-tuntas tbody, .datatable-nilai-harian-tidak-tuntas tbody, .datatable-nilai-harian-tuntas-tidak-tuntas tbody, .datatable-nilai tbody").on("click", ".detail-mapel", function() {
    id_update = $(this).attr("data-id");
    detail_data_mapel(id_update);
});
mapel_baru.find(".kode_mata_pelajaran").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
mapel_edit.find(".kode_mata_pelajaran").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
$(".datatable-mapel tbody, #modal-detail-mapel").on("click", ".status-mapel", function() {
    $("#modal-status-mapel .modal-title").html("Edit Status : Nama Mata Pelajaran");
    mapel_status.find(".loading-gif-image").removeClass("hidden");
    mapel_status.find(".after-loading").addClass("hidden");
    $("#modal-status-mapel").modal("show");

    var id_update = $(this).attr("data-id");
    mapel_status.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_mapel";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        mapel_status.find("input[name='form[kode]']").val(resp.kode);
        mapel_status.find(".edit-status").val(resp.is_active).trigger("change");
        mapel_status.find(".loading-gif-image").addClass("hidden");
        mapel_status.find(".after-loading").removeClass("hidden");
        mapel_status.find("div.edit-status").addClass('open');
        $("#modal-status-mapel .modal-title").html("Edit Mata Pelajaran : " + resp.kode + " - " + resp.nama);
    });
});
$(".datatable-mapel tbody, #modal-detail-mapel").on("click", ".edit-mapel", function() {
    mapel_repeater_load = false;
    $("#modal-edit-mapel .modal-title").html("Edit Mata Pelajaran : Nama Mata Pelajaran");
    mapel_edit.find(".loading-gif-image").removeClass("hidden");
    mapel_edit.find(".after-loading").addClass("hidden");
    mapel_edit.find(".pengecekan-predikat").prop("checked", false).trigger("change");
    mapel_edit.find(".mt-repeater-delete").click();
    $("#modal-edit-mapel").modal("show");

    var id_update = $(this).attr("data-id");
    mapel_edit.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_mapel";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        mapel_edit.find(".edit-status").val(resp.is_active).trigger("change");
        mapel_edit.find("input[name='form[nama]']").val(resp.nama);
        mapel_edit.find("input[name='form[kode]']").val(resp.kode);
        mapel_edit.find("input[name='form[nilai_kkm]']").val(resp.nilai_kkm);
        mapel_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        setTimeout(function(){
            mapel_edit.find(".jns_penerima").val(resp.jns_penerima).trigger("change");
            if(resp.jns_penerima == 3){
                var siswa_penerima = resp.penerima_nama;
                $.each(siswa_penerima,function(i) {
                    mapel_edit.find('.tagsinput_siswa').tagsinput('add', { "value": siswa_penerima[i].id , "text": siswa_penerima[i].nama+" - "+siswa_penerima[i].kode});
                });
            }
            if(resp.jns_penerima == 2){
                var kelas_penerima = resp.penerima_nama;
                $.each(kelas_penerima,function(i) {
                    mapel_edit.find('.tagsinput_kelas').tagsinput('add', { "value": kelas_penerima[i].id , "text": kelas_penerima[i].kode});
                });
            }
            if(resp.is_predikat == 1){
                mapel_repeater_load = true;
                mapel_edit.find(".pengecekan-predikat").prop("checked", true).trigger("change");
                var predikat_isi = resp.predikat_isi;
                $.each(predikat_isi,function(i) {
                    mapel_edit.find(".btnTambah").click();
                    mapel_edit.find("input[name='form[repeater]["+i+"][n1]']").val(predikat_isi[i].n1);
                    mapel_edit.find("input[name='form[repeater]["+i+"][n2]']").val(predikat_isi[i].n2);
                    mapel_edit.find("input[name='form[repeater]["+i+"][predikat]']").val(predikat_isi[i].predikat);
                });
                mapel_edit.find(".mt-repeater-item:last-child .mt-repeater-delete").click();
            } else {
                mapel_repeater_load = true;
                mapel_edit.find(".pengecekan-predikat").prop("checked", false).trigger("change");
            }
            mapel_edit.find(".loading-gif-image").addClass("hidden");
            mapel_edit.find(".after-loading").removeClass("hidden");
            mapel_edit.find("input[name='form[nama]']").focus();
            $("#modal-edit-mapel .modal-title").html("Edit Mata Pelajaran : " + resp.kode + " - " + resp.nama);
        }, 500);
    });
});
$("#modal-tambah-mapel").on('show.bs.modal', function () {
    mapel_baru.find("input[name='form[nama]'], input[name='form[kode]'], input[name='form[nilai_kkm]'], textarea[name='form[keterangan]']").val("");
    mapel_baru.find(".tagsinput_kelas, .tagsinput_siswa").tagsinput("removeAll");
    mapel_baru.find(".mt-repeater-delete").click();
    mapel_baru.find(".pengecekan-predikat").prop("checked", false).trigger("change");
    $("#modal-tambah-mapel").on('shown.bs.modal', function () {
        mapel_baru.find("input[name='form[nama]']").focus();
        $(".jns_penerima").val(1).trigger("change");
    });
});
mapel_baru.find(".mt-repeater-delete").click(function(){
    setTimeout(function(){
        if( mapel_baru.find(".mt-repeater-item").size() == 0){
            mapel_baru.find(".btnTambah").click();
        }
    }, 500);
});
mapel_edit.find(".mt-repeater-delete").click(function(){
    if(mapel_repeater_load == true){
        setTimeout(function(){
            if( mapel_edit.find(".mt-repeater-item").size() == 0){
                mapel_edit.find(".btnTambah").click();
            }
        }, 500);
    }
});
mapel_baru.find(".pengecekan-predikat").change(function() {
    if($(this).is(":checked")) {
        if(mapel_baru.find(".mt-repeater-item").size() == 0){
            mapel_baru.find(".btnTambah").click();
        }
        mapel_baru.find("input[name='form[is_predikat]']").val(1);
        mapel_baru.find(".mt-repeater-predikat").collapse("show");
        mapel_baru.find(".n2").val("100");
        mapel_baru.find(".predikat").val("A");
        mapel_baru.find(".n1").focus();
    } else{
        mapel_baru.find("input[name='form[is_predikat]']").val(0);
        mapel_baru.find(".mt-repeater-predikat").collapse("hide");
    }
});
mapel_edit.find(".pengecekan-predikat").change(function() {
    if(mapel_repeater_load == true){
        if($(this).is(":checked")) {
            if(mapel_edit.find(".mt-repeater-item").size() == 0){
                mapel_edit.find(".btnTambah").click();
            }
            mapel_edit.find("input[name='form[is_predikat]']").val(1);
            mapel_edit.find(".mt-repeater-predikat").collapse("show");
            mapel_edit.find(".n2").val("100");
            mapel_edit.find(".predikat").val("A");
            mapel_edit.find(".n1").focus();
        } else{
            mapel_edit.find("input[name='form[is_predikat]']").val(0);
            mapel_edit.find(".mt-repeater-predikat").collapse("hide");
        }
    }
});
$("#modal-edit-mapel").on('shown.bs.modal', function () {
    mapel_edit.find("input[name='form[nama]']").focus();
});
$("#modal-status-mapel").on('shown.bs.modal', function () {
    mapel_status.find("div.edit-status").addClass('open');
});
mapel_baru.find(".kkm_mata_pelajaran").change(function(){
    if($(this).val()<=0){
        $(this).val(1);
    }
    if($(this).val()>=101){
        $(this).val(100);
    }
});
mapel_edit.find(".kkm_mata_pelajaran").change(function(){
    if($(this).val()<=0){
        $(this).val(1);
    }
    if($(this).val()>=101){
        $(this).val(100);
    }
});
mapel_baru.find(".jns_penerima").change(function(){
    if($(this).val()==1){
        mapel_baru.find(".show-kelas").collapse("hide");
        mapel_baru.find(".show-siswa").collapse("hide");
        mapel_baru.find(".tagsinput_siswa").attr("name", "");
        mapel_baru.find(".tagsinput_kelas").attr("name", "");
    }
    if($(this).val()==2){
        mapel_baru.find(".show-kelas").collapse("show");
        mapel_baru.find(".show-siswa").collapse("hide");
        mapel_baru.find(".tagsinput_kelas").attr("name", "form[penerima]");
        mapel_baru.find(".tagsinput_siswa").attr("name", "");
    }
    if($(this).val()==3){
        mapel_baru.find(".show-kelas").collapse("hide");
        mapel_baru.find(".show-siswa").collapse("show");
        mapel_baru.find(".tagsinput_siswa").attr("name", "form[penerima]");
        mapel_baru.find(".tagsinput_kelas").attr("name", "");
    }
});
mapel_edit.find(".jns_penerima").change(function(){
    if($(this).val()==1){
        mapel_edit.find(".show-kelas").collapse("hide");
        mapel_edit.find(".show-siswa").collapse("hide");
        mapel_edit.find(".tagsinput_siswa").attr("name", "");
        mapel_edit.find(".tagsinput_kelas").attr("name", "");
    }
    if($(this).val()==2){
        mapel_edit.find(".show-kelas").collapse("show");
        mapel_edit.find(".show-siswa").collapse("hide");
        mapel_edit.find(".tagsinput_kelas").attr("name", "form[penerima]");
        mapel_edit.find(".tagsinput_siswa").attr("name", "");
    }
    if($(this).val()==3){
        mapel_edit.find(".show-kelas").collapse("hide");
        mapel_edit.find(".show-siswa").collapse("show");
        mapel_edit.find(".tagsinput_siswa").attr("name", "form[penerima]");
        mapel_edit.find(".tagsinput_kelas").attr("name", "");
    }
});
function detail_data_mapel(id_update){
    $("#modal-detail-mapel .modal-title").html("Detail Mata Pelajaran : Nama Mata Pelajaran");
    mapel_detail.find(".loading-gif-image").removeClass("hidden");
    mapel_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-mapel").modal("show");
    pagename = "/master_data/ajax_mapel";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        mapel_detail.find(".status-mapel").html(is_active);
        mapel_detail.find(".nama_mapel").text(resp.nama);
        mapel_detail.find(".kode_mapel").text(resp.kode);
        mapel_detail.find(".nilai_kkm").text(resp.nilai_kkm);
        if(resp.keterangan == null || resp.keterangan == ""){
            mapel_detail.find(".keterangan_mapel").html("-");
        } else {
            mapel_detail.find(".keterangan_mapel").html(resp.keterangan);
        }
        if(resp.jns_penerima == 1){
            penerima = "Semua Siswa";
            jenis_penerima = "Kelas";
            mapel_detail.find(".list_penerima_mapel").addClass("hidden");
        }
        if(resp.jns_penerima == 2){
            var kelas_penerima = resp.penerima_nama;
            var list_penerima = "";
            $.each(kelas_penerima,function(i) {
                // $('.tagsinput_kelas').tagsinput('add', { "value": kelas_penerima[i].id , "text": kelas_penerima[i].nama});
                list_penerima += "<a class='detail-kelas' data-id='"+kelas_penerima[i].id+"'><span class='label label-primary label-form'>"+kelas_penerima[i].kode+"</span></a>";
            });
            penerima = "Per Kelas";
            jenis_penerima = "Kelas";
            mapel_detail.find(".list_penerima_mapel").removeClass("hidden");
        }
        if(resp.jns_penerima == 3){
            var siswa_penerima = resp.penerima_nama;
            var list_penerima = "";
            $.each(siswa_penerima,function(i) {
                // $('.tagsinput_siswa').tagsinput('add', { "value": siswa_penerima[i].id , "text": siswa_penerima[i].nama+" - "+siswa_penerima[i].kelas});
                list_penerima += "<a class='detail-siswa' data-id='"+siswa_penerima[i].id+"'><span class='label label-primary label-form'>"+siswa_penerima[i].nama+" - "+siswa_penerima[i].kode+"</span></a>";
            });
            penerima = "Per Siswa";
            jenis_penerima = "Siswa";
            mapel_detail.find(".list_penerima_mapel").removeClass("hidden");
        }
        if(resp.jns_penerima != 1 && resp.jns_penerima != 2 && resp.jns_penerima != 3){
            penerima = "-";
            jenis_penerima = "Kelas/Siswa";
            mapel_detail.find(".list_penerima_mapel").removeClass("hidden");
        }
        if(resp.is_predikat == 1){
            var predikat_isi = resp.predikat_isi;
            var table_predikat = "";
            var nomor_each_predikat_mapel = 1;
            $.each(predikat_isi,function(i) {
                table_predikat = table_predikat+"<tr><td class='text-center'>"+nomor_each_predikat_mapel+"</td><td class='text-center'>"+predikat_isi[i].n1+"</td><td class='text-center'>"+predikat_isi[i].n2+"</td><td class='text-center'>"+predikat_isi[i].predikat+"</td></tr>";
                nomor_each_predikat_mapel++;
            });
            // table_predikat = "<tr><td class='text-center'>1</td><td class='text-center'>90</td><td class='text-center'>100</td><td class='text-center'>A+</td></tr><tr><td class='text-center'>2</td><td class='text-center'>80</td><td class='text-center'>89</td><td class='text-center'>A</td></tr><tr><td class='text-center'>3</td><td class='text-center'>70</td><td class='text-center'>79</td><td class='text-center'>B+</td></tr>";
        } else {
            table_predikat = "<tr><td class='text-center' colspan='4'>Tidak ada predikat</td></tr>";
        }
        mapel_detail.find(".tujuan_mapel").html(penerima);
        mapel_detail.find(".penerima_mapel").html(list_penerima);
        mapel_detail.find(".list_predikat tbody").html(table_predikat);

        if(hak_akses == false){
            mapel_detail.find(".edit-mapel, .status-mapel").addClass("disabled");
        } else {
            mapel_detail.find(".edit-mapel, .status-mapel").removeClass("disabled");
            mapel_detail.find(".edit-mapel, .status-mapel").attr("data-id", resp.id);
        }
        mapel_detail.find(".tgl_insert_mapel").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        mapel_detail.find(".tgl_last_update_mapel").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        mapel_detail.find(".tgl_insert_mapel").prepend(tgl_insert);
        mapel_detail.find(".tgl_last_update_mapel").prepend(tgl_last_update);

        mapel_detail.find(".loading-gif-image").addClass("hidden");
        mapel_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-mapel .modal-title").html("Detail Mata Pelajaran : " + resp.kode + " - " + resp.nama);
    });
}
// END MATA PELAJARAN
// START NILAI
$(".datatable-nilai tbody").on("click", ".detail-nilai", function() {
    id_update = $(this).attr("data-id");
    tgl_ujian = $(this).attr("tgl-ujian");
    detail_data_nilai(id_update, tgl_ujian);
});
$(".datatable-nilai tbody, #modal-detail-nilai").on("click", ".status-nilai", function() {
    $("#modal-status-nilai .modal-title").html("Edit Nilai : Nilai");
    nilai_status.find(".loading-gif-image").removeClass("hidden");
    nilai_status.find(".after-loading").addClass("hidden");
    $("#modal-status-nilai").modal("show");

    id_update = $(this).attr("data-id");
    tgl_ujian = $(this).attr("tgl-ujian");
    nilai_status.find(".id_hidden").val(id_update);
    
    request["id_ujian"] = id_update;
    request["tgl_ujian"] = tgl_ujian;
    pagename = "/nilai_rapor/ajax_nilai";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {"act":"list_siswa_edit_nilai", req : request},
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            resp = JSON.parse(resp);
            if(resp.IsError == false) {
                nilai_status.find(".edit-status").val(resp.is_published).trigger("change");
                nilai_status.find(".id_hidden").val(resp.id);
                nilai_status.find(".periode").val(moment(resp.tgl_ujian).format('YYYYMM'));
                nilai_status.find(".loading-gif-image").addClass("hidden");
                nilai_status.find(".after-loading").removeClass("hidden");
                nilai_status.find("div.edit-status").addClass('open');
                $("#modal-status-nilai .modal-title").html("Edit Status : " + resp.kelas + " - " + resp.pelajaran + "("+ resp.kategori +")");
            } else {
                toastrshow("warning", resp.ErrMessage, "Peringatan");
                setTimeout(function(){
                    if(resp.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
});
function detail_data_nilai(id_update, tgl_ujian){
    $("#modal-detail-nilai .modal-title").html("Detail Nilai : Nilai");
    nilai_detail.find(".after-loading").addClass("hidden");
    nilai_detail.find(".datatable-detail-nilai tbody").html(loader(true));
    $("#modal-detail-nilai").modal("show");
    request["id_ujian"] = id_update;
    request["tgl_ujian"] = tgl_ujian;
    pagename = "/nilai_rapor/ajax_nilai";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {"act":"list_siswa_edit_nilai", req : request},
        tryCount: 0,
        retryLimit: 3,
        success: function(list_siswa){
            hak_akses = JSON.parse(list_siswa).hak_akses;
            list_siswa = JSON.parse(list_siswa);
            if(list_siswa.IsError == false) {
                if(list_siswa.is_predikat == 1){
                    nilai_detail.find(".with-predikat").removeClass("hidden");
                } else {
                    nilai_detail.find(".with-predikat").addClass("hidden");
                }
                if(list_siswa.is_published == 1){
                    is_published = "<span class='fa fa-check-circle'></span> <b>Publish</b>";
                } else {
                    is_published = "<span class='fa fa-times-circle'></span> <b>Tidak Publish</b>"
                }
                nilai_detail.find(".status-nilai").html(is_published);
                
                if(hak_akses == false){
                    nilai_detail.find(".edit-nilai, .status-nilai").addClass("disabled");
                } else {
                    nilai_detail.find(".edit-nilai, .status-nilai").removeClass("disabled");
                    nilai_detail.find(".edit-nilai").attr("href", base_url+"/nilai_rapor/edit_nilai.html?id="+list_siswa.id+"&tgl_ujian="+list_siswa.tgl_ujian);
                    nilai_detail.find(".status-nilai").attr("data-id", list_siswa.id).attr("tgl-ujian", list_siswa.tgl_ujian);
                }
                nilai_detail.find(".tgl_insert_nilai").html("<a class='detail-karyawan' data-id='"+list_siswa.karyawan_insert+"'>("+list_siswa.karyawan_insert_nama+")</a>");
                nilai_detail.find(".tgl_last_update_nilai").html("<a class='detail-karyawan' data-id='"+list_siswa.karyawan_last_update+"'>("+list_siswa.karyawan_last_update_nama+")</a>");
                tgl_insert = moment(list_siswa.tgl_insert).format('DD MMM YYYY HH:mm ');
                tgl_last_update = moment(list_siswa.tgl_last_update).format('DD MMM YYYY HH:mm ');
                nilai_detail.find(".tgl_insert_nilai").prepend(tgl_insert);
                nilai_detail.find(".tgl_last_update_nilai").prepend(tgl_last_update);
                list_per_kelas = "";
                if(list_siswa.Data.length == 0){
                    list_per_kelas += "<tr><td colspan='7'><center><span class='label label-warning label-form'>Tidak ada siswa</span></center></td></tr>";
                    nilai_detail.find("tbody").html(list_per_kelas);
                } else {
                    x = 1;
                    $.each(list_siswa.Data, function(index, item) {
                        if(item.nama_panggilan_siswa == ""){
                            nama_panggilan_siswa = "";
                        } else {
                            nama_panggilan_siswa = " ("+item.nama_panggilan_siswa+")";
                        }
                        if(list_siswa.is_predikat == 1){
                            if(item.nilai == null || item.nilai == "null" || item.nilai == undefined){
                                nilai = "";
                            } else {
                                nilai = item.nilai;
                            }
                            list_per_kelas += "<tr><td class='text-center'>"+x+".</td><td><a class='detail-siswa' data-id='"+item.id_siswa+"'>"+item.nama+nama_panggilan_siswa+"</a></td><td>"+item.nis+"</td><td class='text-center'>"+item.kkm+"</td><td class='text-center'>"+nilai+"</td><td class='text-center with-predikat'>"+item.predikat+"</td><td>"+item.keterangan+"</td></tr>";
                        } else {
                            if(item.nilai == null || item.nilai == "null" || item.nilai == undefined){
                                nilai = "";
                            } else {
                                nilai = item.nilai;
                            }
                            list_per_kelas += "<tr><td class='text-center'>"+x+".</td><td><a class='detail-siswa' data-id='"+item.id_siswa+"'>"+item.nama+nama_panggilan_siswa+"</a></td><td>"+item.nis+"</td><td class='text-center'>"+item.kkm+"</td><td class='text-center'>"+nilai+"</td><td>"+item.keterangan+"</td></tr>";
                        }
                        x++;
                    });
                    nilai_detail.find("tbody").html(list_per_kelas);
                }
                nilai_detail.find(".after-loading").removeClass("hidden");
                $("#modal-detail-nilai .modal-title").html("Detail Nilai : " + list_siswa.kelas + " - " + list_siswa.pelajaran + "("+ list_siswa.kategori +") - " + moment(list_siswa.tgl_ujian).format('DD MMM YYYY'));
            } else {
                toastrshow("warning", list_siswa.ErrMessage, "Peringatan");
                setTimeout(function(){
                    if(list_siswa.ErrMessage == "Sesi User telah habis atau Pengguna lainnya telah login"){
                        window.location.href = base_url + "/login/session_token_expired.html";
                    }
                }, 500);
            }
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
// END NILAI
// START KATEGORI NILAI
var onload_kategori_nilai;
$(".datatable-kategori-nilai tbody, .datatable-nilai tbody, #modal-detail-nilai, .datatable-nilai-per-siswa-tuntas tbody, .datatable-nilai-per-siswa-tidak-tuntas tbody, .datatable-nilai-per-siswa-tuntas-tidak-tuntas tbody, .datatable-nilai-harian-tuntas tbody, .datatable-nilai-harian-tidak-tuntas tbody, .datatable-nilai-harian-tuntas-tidak-tuntas tbody, .datatable-nilai tbody").on("click", ".detail-kategori-nilai", function() {
    var id_update = $(this).attr("data-id");
    detail_data_kategori_nilai(id_update);
});
$(".datatable-kategori-nilai tbody, #modal-detail-kategori-nilai").on("click", ".status-kategori-nilai", function() {
    $("#modal-status-kategori-nilai .modal-title").html("Edit Status : Nama Kategori");
    kategori_nilai_status.find(".loading-gif-image").removeClass("hidden");
    kategori_nilai_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-nilai").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_nilai_status.find(".id_hidden").val(id_update);
    
    pagename = "/nilai_rapor/ajax_nilai_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_nilai_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_nilai_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_nilai_status.find(".loading-gif-image").addClass("hidden");
        kategori_nilai_status.find(".after-loading").removeClass("hidden");
        kategori_nilai_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-nilai .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-nilai tbody, #modal-detail-kategori-nilai").on("click", ".edit-kategori-nilai", function() {
    onload_kategori_nilai = true;
    $("#modal-edit-kategori-nilai .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_nilai_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_nilai_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-nilai").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_nilai_edit.find(".id_hidden").val(id_update);
    
    pagename = "/nilai_rapor/ajax_nilai_kategori";
    /*kategori_nilai_edit.find(".dropdown-kelas-tambah-mapel").select2({
        disabled: true,
        placeholder: "Loading...",
    }).val("").trigger("change");*/
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_nilai_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_nilai_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_nilai_edit.find("select[name='form[id_mapel]']").val(resp.id_pelajaran).trigger("change");
        target = "tambah-mapel";
        // GetDropdownKelasKodeMapel(resp.id_kelas, resp.id_pelajaran,'', target);
        kategori_nilai_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_nilai_edit.find(".loading-gif-image").addClass("hidden");
        kategori_nilai_edit.find(".after-loading").removeClass("hidden");
        kategori_nilai_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-nilai .modal-title").html("Edit Kategori : " + resp.nama);
        onload_kategori_nilai == false;
    });
});
$("#modal-tambah-kategori-nilai").on('show.bs.modal', function () {
    kategori_nilai_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    kategori_nilai_baru.find("select[name='form[id_mapel]'], select[name='form[id_kelas]']").val("").trigger("change");
    $("#modal-tambah-kategori-nilai").on('shown.bs.modal', function () {
        kategori_nilai_baru.find("input[name='form[nama]']").focus();
    });
});
/*kategori_nilai_baru.find(".dropdown-mapel").change(function(){
    if($(this).val()==""){
        kategori_nilai_baru.find(".dropdown-kelas-tambah-mapel").select2({
            disabled: true,
            placeholder: "Pilih Mata Pelajaran terlebih dahulu",
        }).val("").trigger("change");
    } else {
        $(".select2.dropdown-kelas-tambah-mapel").select2({
            disabled: true,
            placeholder: "Loading...",
        }).val("").trigger("change");
        target = "tambah-mapel";
        GetDropdownKelasKodeMapel('', $(this).val(),'', target);
    }
});*/
/*kategori_nilai_edit.find(".dropdown-mapel").change(function(){
    if(onload_kategori_nilai == false){
        if($(this).val()==""){
            kategori_nilai_edit.find(".dropdown-kelas-tambah-mapel").select2({
                disabled: true,
                placeholder: "Pilih Mata Pelajaran terlebih dahulu",
            }).val("").trigger("change");
        } else {
            $(".select2.dropdown-kelas-tambah-mapel").select2({
                disabled: true,
                placeholder: "Loading...",
            }).val("").trigger("change");
            target = "tambah-mapel";
            GetDropdownKelasKodeMapel('', $(this).val(),'', target);
        }
    }
});*/
function detail_data_kategori_nilai(id_update){
    $("#modal-detail-kategori-nilai .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_nilai_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_nilai_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-nilai").modal("show");
    pagename = "/nilai_rapor/ajax_nilai_kategori";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_nilai_detail.find(".status-kategori-nilai").html(is_active);
        kategori_nilai_detail.find(".nama_kategori").text(resp.nama);
        kategori_nilai_detail.find(".nama_mapel").html("<a class='detail-mapel' data-id='"+resp.id_pelajaran+"'>"+resp.mapel+"</a>");
        // kategori_nilai_detail.find(".nama_kelas").html("<a class='detail-kelas' data-id='"+resp.id_kelas+"'>"+resp.kelas+"</a>");
        if(resp.keterangan == null || resp.keterangan == ""){
            kategori_nilai_detail.find(".keterangan_kategori").html("-");
        } else {
            kategori_nilai_detail.find(".keterangan_kategori").html(resp.keterangan);
        }
        if(hak_akses == false){
            kategori_nilai_detail.find(".edit-kategori-nilai, .status-kategori-nilai").addClass("disabled");
        } else {
            kategori_nilai_detail.find(".edit-kategori-nilai, .status-kategori-nilai").removeClass("disabled");
            kategori_nilai_detail.find(".edit-kategori-nilai, .status-kategori-nilai").attr("data-id", resp.id);
        }
        kategori_nilai_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_nilai_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_nilai_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_nilai_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_nilai_detail.find(".loading-gif-image").addClass("hidden");
        kategori_nilai_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-nilai .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
// END KATEGORI NILAI
// START KARYAWAN
$(".datatable-karyawan tbody, .datatable-kelas tbody, .div-tagihan-detail, #modal-detail-periode-psb, #modal-detail-pembayaran, #modal-detail-rekening-sekolah, #modal-detail-kasus, .datatable-nilai-per-siswa-tuntas tbody, .datatable-nilai-per-siswa-tidak-tuntas tbody, .datatable-nilai-per-siswa-tuntas-tidak-tuntas tbody, .datatable-nilai-harian-tuntas tbody, .datatable-nilai-harian-tidak-tuntas tbody, .datatable-nilai-harian-tuntas-tidak-tuntas tbody, .datatable-berita tbody, #modal-detail-nilai, #modal-detail-tarif-khusus, .datatable-kasus tbody, #modal-detail-kelas, #modal-detail-kategori-berita, #modal-detail-kategori-tagihan, #modal-detail-kategori-kasus, #modal-detail-kategori-perijinan, #modal-detail-berita, #modal-detail-mapel, #modal-detail-ruangan, #modal-detail-kategori-pengumuman, #modal-detail-pengumuman, .datatable-pengumuman, #modal-detail-kategori-absensi, #modal-detail-mesin-absensi, #modal-detail-absensi-keterangan, #modal-detail-kategori-tagihan, #modal-detail-tarif, #modal-detail-kategori-nilai, .datatable-nilai tbody").on("click", ".detail-karyawan", function() {
    id_update = $(this).attr("data-id");
    detail_data_karyawan(id_update);
});
$(".datatable-karyawan tbody, #modal-detail-karyawan").on("click", ".status-karyawan", function() {
    $("#modal-status-karyawan .modal-title").html("Edit Karyawan : Nama Karyawan");
    karyawan_status.find(".loading-gif-image").removeClass("hidden");
    karyawan_status.find(".after-loading").addClass("hidden");
    $("#modal-status-karyawan").modal("show");

    var id_update = $(this).attr("data-id");
    karyawan_status.find(".id_hidden").val(id_update);
    
    pagename = "/administrator/ajax_karyawan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        karyawan_status.find("input[name='form[nama]']").val(resp.nama);
        karyawan_status.find(".edit-status").val(resp.is_active).trigger("change");
        karyawan_status.find(".loading-gif-image").addClass("hidden");
        karyawan_status.find(".after-loading").removeClass("hidden");
        karyawan_status.find("div.edit-status").addClass('open');
        $("#modal-status-karyawan .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-karyawan tbody").on("click", ".password-karyawan", function() {
    $("#modal-status-karyawan .modal-title").html("Edit Karyawan : Nama Karyawan");
    password_karyawan_edit.find("input[name='form[password1]'], input[name='form[password2]']").val("");
    $("#modal-edit-password-karyawan").modal("show");
    var id_update = $(this).attr("data-id");
    pagename = "/administrator/ajax_karyawan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        password_karyawan_edit.find("input[name='form[nama]']").val(resp.nama);
        password_karyawan_edit.find("input[name='form[id]']").val(resp.id);
        password_karyawan_edit.find("input[name='form[password1]']").focus();
        $("#modal-edit-password-karyawan .modal-title").html("Edit Password : " + resp.nama);
    });
});
$(".import-karyawan").click(function(){
    $("#modal-import-karyawan").modal("show");
});
$(".password-data").click(function(){
    $("#modal-edit-password-karyawan").modal("show");
});
function detail_data_karyawan(id_update){
    $("#modal-detail-karyawan .modal-title").html("Detail Karyawan : Nama Karyawan");
    karyawan_detail.find(".loading-gif-image").removeClass("hidden");
    karyawan_detail.find(".after-loading").addClass("hidden");
    karyawan_detail.find(".foto-profil-karyawan").addClass("hidden");
    karyawan_detail.find(".foto-profil-karyawan-loading").removeClass("hidden");
    $("#modal-detail-karyawan").modal("show");
    pagename = "/administrator/ajax_karyawan";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.foto == "" || resp.foto == null || resp.foto == "default.jpg"){
            karyawan_detail.find(".foto-profil-karyawan").attr("src", base_url+"/assets/img/no-image.jpg");
            karyawan_detail.find(".foto-profil-karyawan").removeClass("hidden");
            karyawan_detail.find(".foto-profil-karyawan-loading").addClass("hidden");
        } else {
            karyawan_detail.find(".foto-profil-karyawan").attr("src", ParseGambar(resp.foto));
            karyawan_detail.find(".foto-profil-karyawan").load(function() {
                karyawan_detail.find(".foto-profil-karyawan").removeClass("hidden");
                karyawan_detail.find(".foto-profil-karyawan-loading").addClass("hidden");
            }).error(function(){
                karyawan_detail.find(".foto-profil-karyawan").attr("src", base_url+"/assets/img/no-image.jpg");
                karyawan_detail.find(".foto-profil-karyawan").removeClass("hidden");
                karyawan_detail.find(".foto-profil-karyawan-loading").addClass("hidden");
            });
        }
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        karyawan_detail.find(".status-karyawan").html(is_active);
        karyawan_detail.find(".nik_karyawan").text(resp.nik);
        karyawan_detail.find(".nip_karyawan").text(resp.nip);
        karyawan_detail.find(".nama_karyawan").text(resp.nama);
        if(resp.jk == 1){
            jk = "Laki-Laki";
        } else {
            jk = "Perempuan";
        }
        karyawan_detail.find(".jk_karyawan").text(jk);
        karyawan_detail.find(".jabatan_karyawan").text(resp.jabatan);
        karyawan_detail.find(".alamat_karyawan").text(resp.alamat);
        karyawan_detail.find(".no_hp_karyawan").text(resp.no_hp);
        karyawan_detail.find(".email_karyawan").text(resp.email);
        if(hak_akses == false){
            karyawan_detail.find(".edit-karyawan, .status-karyawan").addClass("disabled");
        } else {
            karyawan_detail.find(".edit-karyawan, .status-karyawan").removeClass("disabled");
            karyawan_detail.find(".edit-karyawan").attr("href", base_url+"/administrator/edit_karyawan.html?id="+resp.id);
            karyawan_detail.find(".edit-karyawan, .status-karyawan").attr("data-id", resp.id);
        }
        karyawan_detail.find(".loading-gif-image").addClass("hidden");
        karyawan_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-karyawan .modal-title").html("Detail Karyawan : " + resp.nama);
    });
}
// END KARYAWAN
// START SISWA
$(".datatable-siswa tbody, .datatable-nilai-siswa tbody, #dataTableAwal tbody, #dataTableAkhir tbody, .datatable-tagihan tbody, #modal-detail-pembayaran, #modal-edit-pembayaran, .datatable-nilai-harian-tuntas tbody, .datatable-nilai-harian-tidak-tuntas tbody, .datatable-nilai-harian-tuntas-tidak-tuntas tbody, .div-tagihan-detail, .datatable-pembayaran tbody, .datatable-siswa-tarif-khusus tbody, .datatable-tarif-khusus tbody, .datatable-absensi-terlambat tbody, #modal-detail-tarif-khusus, .datatable-absensi-siswa tbody, .datatable-absensi-terlambat tbody, #modal-detail-nilai, #modal-list-siswa-per-kelas, .datatable-sakit, .datatable-ijin, .datatable-alpa, .datatable-siswa-absensi, #modal-detail-absensi-keterangan, .pengumuman_kelas_siswa, #modal-detail-mapel, #modal-detail-kasus, .datatable-top-10-kasus").on("click", ".detail-siswa", function() {
    if($("#modal-detail-siswa").hasClass('in')){
        id_update = kelas_detail.find(".edit-kelas").attr("data-id");
        $("#modal-detail-kelas, #modal-list-siswa-per-kelas").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_siswa(id_update);
});
$(".datatable-siswa tbody, #modal-detail-siswa").on("click", ".status-siswa", function() {
    $("#modal-status-siswa .modal-title").html("Edit Status : Nama Siswa");
    siswa_status.find(".loading-gif-image").removeClass("hidden");
    siswa_status.find(".after-loading").addClass("hidden");
    $("#modal-status-siswa").modal("show");

    var id_update = $(this).attr("data-id");
    siswa_status.find(".id_hidden").val(id_update);
    
    pagename = "/master_data/ajax_siswa";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        siswa_status.find("input[name='form[nama]']").val(resp.nama);
        siswa_status.find(".edit-status").val(resp.is_active).trigger("change");
        siswa_status.find(".loading-gif-image").addClass("hidden");
        siswa_status.find(".after-loading").removeClass("hidden");
        siswa_status.find("div.edit-status").addClass('open');
        if(resp.nama_panggilan_siswa == ""){
            nama_panggilan_siswa = "";
        } else {
            nama_panggilan_siswa = " ("+resp.nama_panggilan_siswa+")";
        }
        $("#modal-status-siswa .modal-title").html("Edit Status : " + resp.nama+nama_panggilan_siswa);
    });
});
$(".edit-password-siswa").click(function(){
    $("#modal-edit-password-siswa").modal("show");
});
$(".edit-password-wali").click(function(){
    $("#modal-edit-password-wali").modal("show");
});
$(".import-siswa").click(function(){
    $("#modal-import-siswa").modal("show");
});
$("#modal-edit-password-siswa").on('show.bs.modal', function () {
    password_siswa.find("input[name='form[password]'], input[name='form[password2]']").val("");
    $("#modal-edit-password-siswa").on('shown.bs.modal', function () {
        password_siswa.find("input[name='form[password]']").focus();
    });
});
$("#modal-edit-password-wali").on('show.bs.modal', function () {
    password_wali.find("input[name='form[password]'], input[name='form[password2]']").val("");
    $("#modal-edit-password-wali").on('shown.bs.modal', function () {
        password_wali.find("input[name='form[password]']").focus();
    });
});
$("#modal-status-siswa").on('shown.bs.modal', function () {
    siswa_status.find("div.edit-status").addClass('open');
});
function detail_data_siswa(id_update){
    if($("#modal-list-siswa-per-kelas").hasClass('in')){
        $('#modal-detail-kelas, #modal-list-siswa-per-kelas').modal('hide');
    }
    $("#modal-detail-siswa .modal-title").html("Detail Siswa : Nama Siswa");
    siswa_detail.find(".loading-gif-image").removeClass("hidden");
    siswa_detail.find(".after-loading").addClass("hidden");
    siswa_detail.find(".foto-profil-siswa").addClass("hidden");
    siswa_detail.find(".foto-profil-siswa-loading").removeClass("hidden");
    $("#modal-detail-siswa").modal("show");
    pagename = "/master_data/ajax_siswa";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.foto == "" || resp.foto == null || resp.foto == "default.jpg"){
            siswa_detail.find(".foto-profil-siswa").attr("src", base_url+"/assets/img/no-image.jpg");
            siswa_detail.find(".foto-profil-siswa").removeClass("hidden");
            siswa_detail.find(".foto-profil-siswa-loading").addClass("hidden");
        } else {
            siswa_detail.find(".foto-profil-siswa").attr("src", ParseGambar(resp.foto));
            siswa_detail.find(".foto-profil-siswa").load(function() {
                siswa_detail.find(".foto-profil-siswa").removeClass("hidden");
                siswa_detail.find(".foto-profil-siswa-loading").addClass("hidden");
            }).error(function(){
                siswa_detail.find(".foto-profil-siswa").attr("src", base_url+"/assets/img/no-image.jpg");
                siswa_detail.find(".foto-profil-siswa").removeClass("hidden");
                siswa_detail.find(".foto-profil-siswa-loading").addClass("hidden");
            });
        }
        if(resp.nama_panggilan_siswa == "" || resp.nama_panggilan_siswa == null){
            nama_panggilan_siswa = "";
        } else {
            nama_panggilan_siswa = " ("+resp.nama_panggilan_siswa+")";
        }
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        siswa_detail.find(".status-siswa").html(is_active);
        if(hak_akses == false){
            siswa_detail.find(".edit-siswa, .status-siswa, .detail-siswa-absensi, .detail-siswa-nilai, .detail-siswa-keuangan, .detail-siswa-kasus, .detail-siswa-pengumuman").addClass("disabled");
            siswa_detail.find(".nis_siswa").html(resp.nis);
        } else {
            siswa_detail.find(".edit-siswa, status-siswa, .detail-siswa-absensi, .detail-siswa-nilai, .detail-siswa-keuangan, .detail-siswa-kasus, .detail-siswa-pengumuman").removeClass("disabled");
            siswa_detail.find(".edit-siswa").attr("href", base_url+"/master_data/edit_siswa.html?id="+resp.id);
            siswa_detail.find(".edit-siswa, .status-siswa").attr("data-id", resp.id);
            siswa_detail.find(".nis_siswa").html("<a href='"+base_url+"/master_data/detail_siswa.html?id="+resp.id+"'>"+resp.nis+"</a>");
            siswa_detail.find(".detail-siswa-absensi").attr("href", base_url+"/master_data/detail_siswa.html?id="+resp.id+"&menu=absensi");
            siswa_detail.find(".detail-siswa-nilai").attr("href", base_url+"/master_data/detail_siswa.html?id="+resp.id+"&menu=nilai");
            siswa_detail.find(".detail-siswa-keuangan").attr("href", base_url+"/master_data/detail_siswa.html?id="+resp.id+"&menu=keuangan");
            siswa_detail.find(".detail-siswa-kasus").attr("href", base_url+"/master_data/detail_siswa.html?id="+resp.id+"&menu=kasus");
            siswa_detail.find(".detail-siswa-pengumuman").attr("href", base_url+"/master_data/detail_siswa.html?id="+resp.id+"&menu=pengumuman");
        }
        siswa_detail.find(".nama_siswa").html(resp.nama+nama_panggilan_siswa);
        siswa_detail.find(".kelas_siswa").html("<a class='detail-kelas' data-id='"+resp.id_kelas+"'>"+resp.kelas_kode+"</a>");
        if(resp.jk == 1){
            jk = "Laki-Laki";
        } else {
            jk = "Perempuan";
        }
        siswa_detail.find(".jk_siswa").html(jk);
        siswa_detail.find(".no_hp_siswa").html(resp.no_hp);
        siswa_detail.find(".alamat_siswa").html(resp.alamat);
        siswa_detail.find(".email_siswa").html(resp.email);

        siswa_detail.find(".loading-gif-image").addClass("hidden");
        siswa_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-siswa .modal-title").html("Detail Siswa : " + resp.nama+nama_panggilan_siswa);
    });
}
// END SISWA
// START KATEGORI BERITA
$(".datatable-kategori-berita tbody, .datatable-berita tbody, #modal-detail-berita").on("click", ".detail-kategori-berita", function() {
    if($("#modal-detail-siswa").hasClass('in')){
        id_update = kategori_berita_detail.find(".edit-kategori-berita").attr("data-id");
        // $("#modal-detail-kelas, #modal-list-siswa-per-kelas").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_kategori_berita(id_update);
});
$(".datatable-kategori-berita tbody, #modal-detail-kategori-berita").on("click", ".status-kategori-berita", function() {
    $("#modal-status-kategori-berita .modal-title").html("Edit Status : Nama Kategori");
    kategori_berita_status.find(".loading-gif-image").removeClass("hidden");
    kategori_berita_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-berita").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_berita_status.find(".id_hidden").val(id_update);
    
    pagename = "/berita/ajax_berita_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_berita_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_berita_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_berita_status.find(".loading-gif-image").addClass("hidden");
        kategori_berita_status.find(".after-loading").removeClass("hidden");
        kategori_berita_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-berita .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-berita tbody, #modal-detail-kategori-berita").on("click", ".edit-kategori-berita", function() {
    $("#modal-edit-kategori-berita .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_berita_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_berita_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-berita").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_berita_edit.find(".id_hidden").val(id_update);
    
    pagename = "/berita/ajax_berita_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_berita_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_berita_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_berita_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_berita_edit.find(".loading-gif-image").addClass("hidden");
        kategori_berita_edit.find(".after-loading").removeClass("hidden");
        kategori_berita_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-berita .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$("#modal-tambah-kategori-berita").on('show.bs.modal', function () {
    kategori_berita_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-berita").on('shown.bs.modal', function () {
        kategori_berita_baru.find("input[name='form[nama]']").focus();
    });
});
function detail_data_kategori_berita(id_update){
    $("#modal-detail-kategori-berita .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_berita_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_berita_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-berita").modal("show");
    pagename = "/berita/ajax_berita_kategori";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_berita_detail.find(".status-kategori-berita").html(is_active);
        kategori_berita_detail.find(".nama_kategori").text(resp.nama);
        kategori_berita_detail.find(".keterangan_kategori").text(resp.keterangan);
        if(hak_akses == false){
            kategori_berita_detail.find(".edit-kategori-berita, .status-kategori-berita").addClass("disabled");
        } else {
            kategori_berita_detail.find(".edit-kategori-berita, .status-kategori-berita").removeClass("disabled");
            kategori_berita_detail.find(".edit-kategori-berita, .status-kategori-berita").attr("data-id", resp.id);
        }
        kategori_berita_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_berita_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_berita_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_berita_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_berita_detail.find(".loading-gif-image").addClass("hidden");
        kategori_berita_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-berita .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
// END KATEGORI BERITA 
// START BERITA
$(".datatable-berita tbody").on("click", ".detail-berita", function() {
    var id_update = $(this).attr("data-id");
    detail_data_berita(id_update);
});
$(".datatable-berita tbody, #modal-detail-berita").on("click", ".status-berita", function() {
    $("#modal-edit-status-berita .modal-title").html("Edit Status : Nama Kategori");
    berita_status.find(".loading-gif-image").removeClass("hidden");
    berita_status.find(".after-loading").addClass("hidden");
    $("#modal-edit-status-berita").modal("show");

    var id_update = $(this).attr("data-id");
    berita_status.find(".id_hidden").val(id_update);
    
    pagename = "/berita/ajax_berita";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        berita_status.find("input[name='form[subyek]']").val(resp.subyek);
        berita_status.find("select[name='form[is_published]']").val(resp.is_published).trigger("change");
        berita_status.find(".loading-gif-image").addClass("hidden");
        berita_status.find(".after-loading").removeClass("hidden");
        berita_status.find("div.edit-status").addClass('open');
        $("#modal-edit-status-berita .modal-title").html("Edit Berita : " + resp.subyek);
    });
});
function detail_data_berita(id_update){
    $("#modal-detail-berita .modal-title").html("Detail Berita : Nama Berita");
    berita_detail.find(".loading-gif-image").removeClass("hidden");
    berita_detail.find(".after-loading").addClass("hidden");
    berita_detail.find(".foto-profil-berita").addClass("hidden");
    berita_detail.find(".foto-profil-berita-loading").removeClass("hidden");
    $("#modal-detail-berita").modal("show");
    pagename = "/berita/ajax_berita";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.foto == "" || resp.foto == null || resp.foto == "default.jpg"){
            berita_detail.find(".foto-profil-berita").attr("src", base_url+"/assets/img/default.png");
            berita_detail.find(".foto-profil-berita").removeClass("hidden");
            berita_detail.find(".foto-profil-berita-loading").addClass("hidden");
        } else {
            berita_detail.find(".foto-profil-berita").attr("src", ParseGambar(resp.foto));
            berita_detail.find(".foto-profil-berita").load(function() {
                berita_detail.find(".foto-profil-berita").removeClass("hidden");
                berita_detail.find(".foto-profil-berita-loading").addClass("hidden");
            }).error(function(){
                berita_detail.find(".foto-profil-berita").attr("src", base_url+"/assets/img/default.png");
                berita_detail.find(".foto-profil-berita").removeClass("hidden");
                berita_detail.find(".foto-profil-berita-loading").addClass("hidden");
            });
        }
        if(resp.is_published == 1){
            is_published = "<span class='fa fa-check-circle'></span> <b>Publish</b>";
            tgl_publish = moment(resp.waktu_publish).format('DD MMM YYYY HH:mm ');
            if(resp.waktu_publish == "0000-00-00 00:00:00"){
                tgl_publish = " - ";
            }
        } else {
            is_published = "<span class='fa fa-times-circle'></span> <b>Tidak Publish</b>";
            tgl_publish = " - ";
        }
        berita_detail.find(".status-berita").html(is_published);
        resp_berita_pesan = resp.pesan.replace(/=\\"/g, "=\"");
        resp_berita_pesan = resp_berita_pesan.replace(/\\"/g, "\"");
        berita_detail.find(".berita_pesan").html(resp_berita_pesan);
        berita_detail.find(".berita_penerbit").html("<strong>Penerbit</strong><br><a class='detail-karyawan' data-id='"+resp.penerbit+"'>"+resp.nama_penerbit+"</a>");
        if(resp.id_kategori == null || resp.id_kategori == ""){
            kategori_berita = "<strong>Kategori</strong><br><span class='label label-primary label-form'>-</span>";
        } else {
            kategori_berita = "<strong>Kategori</strong><br><a class='detail-kategori-berita' data-id='"+resp.id_kategori+"'><span class='label label-primary label-form'>"+resp.kategori+"</span></a>";
        }
        berita_detail.find(".berita_kategori").html(kategori_berita);
        if(resp.source == null || resp.source == ""){
            source = "<strong>Sumber Berita</strong><br><span class='label label-primary label-form'>-</span>";
        } else {
            source = "<strong>Sumber Berita</strong><br>"+resp.source;
        }
        berita_detail.find(".berita_sumber_berita").html(source);
        if(resp.source_url == null || resp.source_url == ""){
            source_url = "<strong>Sumber Berita</strong><br><span class='label label-primary label-form'>-</span>";
        } else {
            source_url = "<strong>Sumber Berita</strong><br><a href='"+resp.source_url+"' target='_blank'>"+resp.source_url+"</a>";
        }
        berita_detail.find(".berita_url_sumber_berita").html(source_url);
        if(resp.is_published == 1){
            published = "<strong>Status</strong><br><a class='status-berita' data-id='"+resp.id+"'><span class='label label-success label-form'>Publish</span></a>";
        } else {
            published = "<strong>Status</strong><br><a class='status-berita' data-id='"+resp.id+"'><span class='label label-danger label-form'>Tidak Publish</span></a>";
        }
        berita_detail.find(".berita_status").html(published);
        if(hak_akses == false){
            berita_detail.find(".edit-berita, .status-berita").addClass("disabled");
        } else {
            berita_detail.find(".edit-berita, .status-berita").removeClass("disabled");
            berita_detail.find(".edit-berita").attr("href", base_url+"/berita/edit_berita.html?id="+resp.id);
            berita_detail.find(".edit-berita, .status-berita").attr("data-id", resp.id);
        }
        berita_detail.find(".berita_waktu_publish").html("<strong>Waktu Publish</strong><br>"+tgl_publish);
        tgl_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        berita_detail.find(".berita_last_update").html("<strong>Tgl Last Update</strong><br>"+tgl_update+"<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        berita_detail.find(".berita_insert").html("<strong>Tgl Insert</strong><br>"+tgl_insert+"<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        berita_detail.find(".loading-gif-image").addClass("hidden");
        berita_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-berita .modal-title").html("Detail Berita : " + resp.subyek);
    });
}
// END BERITA
// START KATEGORI PENGUMUMAN 
$(".datatable-kategori-pengumuman tbody, .datatable-pengumuman tbody, #modal-detail-pengumuman").on("click", ".detail-kategori-pengumuman", function() {
    var id_update = $(this).attr("data-id");
    detail_data_kategori_pengumuman(id_update);
});
$(".datatable-kategori-pengumuman tbody, #modal-detail-kategori-pengumuman").on("click", ".status-kategori-pengumuman", function() {
    $("#modal-status-kategori-pengumuman .modal-title").html("Edit Status : Nama Kategori");
    kategori_pengumuman_status.find(".loading-gif-image").removeClass("hidden");
    kategori_pengumuman_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-pengumuman").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_pengumuman_status.find(".id_hidden").val(id_update);
    
    pagename = "/pengumuman/ajax_pengumuman_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_pengumuman_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_pengumuman_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_pengumuman_status.find(".loading-gif-image").addClass("hidden");
        kategori_pengumuman_status.find(".after-loading").removeClass("hidden");
        kategori_pengumuman_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-pengumuman .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-pengumuman tbody, #modal-detail-kategori-pengumuman").on("click", ".edit-kategori-pengumuman", function() {
    $("#modal-edit-kategori-pengumuman .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_pengumuman_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_pengumuman_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-pengumuman").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_pengumuman_edit.find(".id_hidden").val(id_update);
    
    pagename = "/pengumuman/ajax_pengumuman_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_pengumuman_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_pengumuman_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_pengumuman_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_pengumuman_edit.find(".loading-gif-image").addClass("hidden");
        kategori_pengumuman_edit.find(".after-loading").removeClass("hidden");
        kategori_pengumuman_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-pengumuman .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$("#modal-tambah-kategori-pengumuman").on('show.bs.modal', function () {
    kategori_pengumuman_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-pengumuman").on('shown.bs.modal', function () {
        kategori_pengumuman_baru.find("input[name='form[nama]']").focus();
    });
});
function detail_data_kategori_pengumuman(id_update){
    $("#modal-detail-kategori-pengumuman .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_pengumuman_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_pengumuman_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-pengumuman").modal("show");
    pagename = "/pengumuman/ajax_pengumuman_kategori";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_pengumuman_detail.find(".status-kategori-pengumuman").html(is_active);
        kategori_pengumuman_detail.find(".nama_kategori").text(resp.nama);
        if(resp.keterangan == null || resp.keterangan == ""){
            kategori_pengumuman_detail.find(".keterangan_kategori").html("-");
        } else {
            kategori_pengumuman_detail.find(".keterangan_kategori").html(resp.keterangan);
        }
        if(hak_akses == false){
            kategori_pengumuman_detail.find(".edit-kategori-pengumuman, .status-kategori-pengumuman").addClass("disabled");
        } else {
            kategori_pengumuman_detail.find(".edit-kategori-pengumuman, .status-kategori-pengumuman").removeClass("disabled");
            kategori_pengumuman_detail.find(".edit-kategori-pengumuman, .status-kategori-pengumuman").attr("data-id", resp.id);
        }
        kategori_pengumuman_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_pengumuman_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_pengumuman_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_pengumuman_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_pengumuman_detail.find(".loading-gif-image").addClass("hidden");
        kategori_pengumuman_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-pengumuman .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
// END KATEGORI PENGUMUMAN 
// START PENGUMUMAN
$(".datatable-pengumuman tbody").on("click", ".detail-pengumuman", function() {
    var id_update = $(this).attr("data-id");
    detail_data_pengumuman(id_update);
});
$(".datatable-pengumuman tbody, #modal-detail-pengumuman").on("click", ".status-pengumuman", function() {
    $("#modal-edit-status-pengumuman .modal-title").html("Edit Status : Nama Kategori");
    pengumuman_status.find(".loading-gif-image").removeClass("hidden");
    pengumuman_status.find(".after-loading").addClass("hidden");
    $("#modal-edit-status-pengumuman").modal("show");

    var id_update = $(this).attr("data-id");
    pengumuman_status.find(".id_hidden").val(id_update);
    
    pagename = "/pengumuman/ajax_pengumuman";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        pengumuman_status.find("input[name='form[subyek]']").val(resp.subyek);
        pengumuman_status.find("select[name='form[is_published]']").val(resp.is_published).trigger("change");
        pengumuman_status.find(".loading-gif-image").addClass("hidden");
        pengumuman_status.find(".after-loading").removeClass("hidden");
        pengumuman_status.find("div.edit-status").addClass('open');
        $("#modal-edit-status-pengumuman .modal-title").html("Edit Pengumuman : " + resp.subyek);
    });
});
function detail_data_pengumuman(id_update){
    $("#modal-detail-pengumuman .modal-title").html("Detail Pengumuman : Nama Pengumuman");
    pengumuman_detail.find(".loading-gif-image").removeClass("hidden");
    pengumuman_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-pengumuman").modal("show");
    pagename = "/pengumuman/ajax_pengumuman";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_published == 1){
            is_published = "<span class='fa fa-check-circle'></span> <b>Publish</b>";
            tgl_publish = moment(resp.waktu_publish).format('DD MMM YYYY HH:mm ');
            if(resp.waktu_publish == "0000-00-00 00:00:00"){
                tgl_publish = " - ";
            }
        } else {
            is_published = "<span class='fa fa-times-circle'></span> <b>Tidak Publish</b>";
            tgl_publish = " - ";
        }
        pengumuman_detail.find(".status-pengumuman").html(is_published);
        resp_pengumuman_pesan = resp.pesan.replace(/=\\"/g, "=\"");
        resp_pengumuman_pesan = resp_pengumuman_pesan.replace(/\\"/g, "\"");
        pengumuman_detail.find(".pengumuman_pesan").html(resp_pengumuman_pesan);
        pengumuman_detail.find(".pengumuman_penerbit").html("<strong>Penerbit</strong><br><a class='detail-karyawan' data-id='"+resp.penerbit+"'>"+resp.nama_penerbit+"</a>");
        if(resp.jns_penerima == 1){
            penerima = "Semua Siswa";
            jenis_penerima = "Kelas";
            pengumuman_detail.find(".pengumuman_kelas_siswa").addClass("hidden");
        }
        if(resp.jns_penerima == 2){
            var kelas_penerima = resp.penerima_nama;
            var list_penerima = "";
            $.each(kelas_penerima,function(i) {
                // $('.tagsinput_kelas').tagsinput('add', { "value": kelas_penerima[i].id , "text": kelas_penerima[i].nama});
                list_penerima += "<a class='detail-kelas' data-id='"+kelas_penerima[i].id+"'><span class='label label-primary label-form'>"+kelas_penerima[i].kode+"</span></a>";
            });
            penerima = "Per Kelas";
            jenis_penerima = "Kelas";
            pengumuman_detail.find(".pengumuman_kelas_siswa").removeClass("hidden");
        }
        if(resp.jns_penerima == 3){
            var siswa_penerima = resp.penerima_nama;
            var list_penerima = "";
            $.each(siswa_penerima,function(i) {
                // $('.tagsinput_siswa').tagsinput('add', { "value": siswa_penerima[i].id , "text": siswa_penerima[i].nama+" - "+siswa_penerima[i].kelas});
                list_penerima += "<a class='detail-siswa' data-id='"+siswa_penerima[i].id+"'><span class='label label-primary label-form'>"+siswa_penerima[i].nama+" - "+siswa_penerima[i].kode+"</span></a>";
            });
            penerima = "Per Siswa";
            jenis_penerima = "Siswa";
            pengumuman_detail.find(".pengumuman_kelas_siswa").removeClass("hidden");
        }
        if(resp.jns_penerima != 1 && resp.jns_penerima != 2 && resp.jns_penerima != 3){
            penerima = "-";
            jenis_penerima = "Kelas/Siswa";
            pengumuman_detail.find(".pengumuman_kelas_siswa").removeClass("hidden");
        }
        pengumuman_detail.find(".pengumuman_penerima").html("<strong>Penerima</strong><br>"+penerima);
        pengumuman_detail.find(".pengumuman_kelas_siswa").html("<strong>"+jenis_penerima+"</strong><br>"+list_penerima);
        if(resp.id_kategori == null || resp.id_kategori == ""){
            kategori_pengumuman = "<strong>Kategori</strong><br><span class='label label-primary label-form'>-</span>";
        } else {
            kategori_pengumuman = "<strong>Kategori</strong><br><a class='detail-kategori-pengumuman' data-id='"+resp.id_kategori+"'><span class='label label-primary label-form'>"+resp.kategori+"</span></a>";
        }
        pengumuman_detail.find(".pengumuman_kategori").html(kategori_pengumuman);
        if(resp.is_published == 1){
            published = "<strong>Status</strong><br><a class='status-pengumuman' data-id='"+resp.id+"'><span class='label label-success label-form'>Publish</span></a>";
        } else {
            published = "<strong>Status</strong><br><a class='status-pengumuman' data-id='"+resp.id+"'><span class='label label-danger label-form'>Tidak Publish</span></a>";
        }
        pengumuman_detail.find(".pengumuman_status").html(published);
        if(hak_akses == false){
            pengumuman_detail.find(".edit-pengumuman, .status-pengumuman").addClass("disabled");
        } else {
            pengumuman_detail.find(".edit-pengumuman, .status-pengumuman").removeClass("disabled");
            pengumuman_detail.find(".edit-pengumuman").attr("href", base_url+"/pengumuman/edit_pengumuman.html?id="+resp.id);
            pengumuman_detail.find(".edit-pengumuman, .status-pengumuman").attr("data-id", resp.id);
        }
        pengumuman_detail.find(".pengumuman_waktu_publish").html("<strong>Waktu Publish</strong><br>"+tgl_publish);
        tgl_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        pengumuman_detail.find(".pengumuman_last_update").html("<strong>Tgl Last Update</strong><br>"+tgl_update+"<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        pengumuman_detail.find(".pengumuman_insert").html("<strong>Tgl Insert</strong><br>"+tgl_insert+"<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        pengumuman_detail.find(".loading-gif-image").addClass("hidden");
        pengumuman_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-pengumuman .modal-title").html("Detail Pengumuman : " + resp.subyek);
    });
}
// END PENGUMUMAN
// START KATEGORI KASUS
$(".datatable-kategori-kasus tbody, .datatable-kasus tbody, #modal-detail-kasus").on("click", ".detail-kategori-kasus", function() {
    if($("#modal-detail-siswa").hasClass('in')){
        id_update = kategori_kasus_detail.find(".edit-kategori-kasus").attr("data-id");
        // $("#modal-detail-kelas, #modal-list-siswa-per-kelas").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_kategori_kasus(id_update);
});
$(".datatable-kategori-kasus tbody, #modal-detail-kategori-kasus").on("click", ".status-kategori-kasus", function() {
    $("#modal-status-kategori-kasus .modal-title").html("Edit Status : Nama Kategori");
    kategori_kasus_status.find(".loading-gif-image").removeClass("hidden");
    kategori_kasus_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-kasus").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_kasus_status.find(".id_hidden").val(id_update);
    
    pagename = "/kasus/ajax_kasus_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_kasus_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_kasus_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_kasus_status.find(".loading-gif-image").addClass("hidden");
        kategori_kasus_status.find(".after-loading").removeClass("hidden");
        kategori_kasus_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-kasus .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-kasus tbody, #modal-detail-kategori-kasus").on("click", ".edit-kategori-kasus", function() {
    $("#modal-edit-kategori-kasus .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_kasus_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_kasus_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-kasus").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_kasus_edit.find(".id_hidden").val(id_update);
    
    pagename = "/kasus/ajax_kasus_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_kasus_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_kasus_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_kasus_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_kasus_edit.find(".loading-gif-image").addClass("hidden");
        kategori_kasus_edit.find(".after-loading").removeClass("hidden");
        kategori_kasus_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-kasus .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$("#modal-tambah-kategori-kasus").on('show.bs.modal', function () {
    kategori_kasus_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-kasus").on('shown.bs.modal', function () {
        kategori_kasus_baru.find("input[name='form[nama]']").focus();
    });
});
function detail_data_kategori_kasus(id_update){
    $("#modal-detail-kategori-kasus .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_kasus_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_kasus_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-kasus").modal("show");
    pagename = "/kasus/ajax_kasus_kategori";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_kasus_detail.find(".status-kategori-kasus").html(is_active);
        kategori_kasus_detail.find(".nama_kategori").text(resp.nama);
        kategori_kasus_detail.find(".keterangan_kategori").text(resp.keterangan);
        if(hak_akses == false){
            kategori_kasus_detail.find(".edit-kategori-kasus, .status-kategori-kasus").addClass("disabled");
        } else {
            kategori_kasus_detail.find(".edit-kategori-kasus, .status-kategori-kasus").removeClass("disabled");
            kategori_kasus_detail.find(".edit-kategori-kasus, .status-kategori-kasus").attr("data-id", resp.id);
        }
        kategori_kasus_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_kasus_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_kasus_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_kasus_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_kasus_detail.find(".loading-gif-image").addClass("hidden");
        kategori_kasus_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-kasus .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
$("#modal-tambah-kategori-kasus").on('show.bs.modal', function () {
    kategori_kasus_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-kasus").on('shown.bs.modal', function () {
        kategori_kasus_baru.find("input[name='form[nama]']").focus();
    });
});
// END KATEGORI KASUS 
// START KASUS
$(".datatable-kasus tbody").on("click", ".detail-kasus", function() {
    var id_update = $(this).attr("data-id");
    detail_data_kasus(id_update);
});
$(".datatable-kasus tbody, #modal-detail-kasus").on("click", ".status-kasus", function() {
    $("#modal-edit-status-kasus .modal-title").html("Edit Status : Nama Kategori");
    kasus_status.find(".loading-gif-image").removeClass("hidden");
    kasus_status.find(".after-loading").addClass("hidden");
    $("#modal-edit-status-kasus").modal("show");

    var id_update = $(this).attr("data-id");
    kasus_status.find(".id_hidden").val(id_update);
    
    pagename = "/kasus/ajax_kasus";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kasus_status.find("select[name='form[is_published]']").val(resp.is_published).trigger("change");
        kasus_status.find("input[name='form[judul]']").val(resp.judul);
        kasus_status.find(".loading-gif-image").addClass("hidden");
        kasus_status.find(".after-loading").removeClass("hidden");
        kasus_status.find("div.edit-status").addClass('open');
        $("#modal-edit-status-kasus .modal-title").html("Edit Kasus : " + resp.judul);
    });
});
function detail_data_kasus(id_update){
    $("#modal-detail-kasus .modal-title").html("Detail Kasus : Nama Kasus");
    kasus_detail.find(".loading-gif-image").removeClass("hidden");
    kasus_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kasus").modal("show");
    pagename = "/kasus/ajax_kasus";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_published == 1){
            is_published = "<span class='fa fa-check-circle'></span> <b>Publish</b>";
        } else {
            is_published = "<span class='fa fa-times-circle'></span> <b>Tidak Publish</b>"
        }
        kasus_detail.find(".status-kasus").html(is_published);
        kasus_detail.find(".kasus_penanggung_jawab").html("<strong>Penanggung Jawab</strong><br><a class='detail-karyawan' data-id='"+resp.id_guru+"'>"+resp.nama_penanggung_jawab+"</a>");
        kasus_detail.find(".kasus_pelanggaran").html("<strong>Pelanggaran</strong><br>"+resp.pelanggaran);
        kasus_detail.find(".kasus_tindak_lanjut").html("<strong>Tindak Lanjut</strong><br>"+resp.tindak_lanjut);
        kasus_detail.find(".kasus_penyelesaian").html("<strong>Penyelesaian</strong><br>"+resp.penyelesaian);
        var siswa_penerima = resp.nama_siswa;
        var list_penerima = "";
        $.each(siswa_penerima,function(i) {
            // $('.tagsinput_siswa').tagsinput('add', { "value": siswa_penerima[i].id , "text": siswa_penerima[i].nama+" - "+siswa_penerima[i].kelas});
            list_penerima += "<a class='detail-siswa' data-id='"+siswa_penerima[i].id+"'><span class='label label-primary label-form'>"+siswa_penerima[i].nama+" - "+siswa_penerima[i].kode+"</span></a>";
        });
        kasus_detail.find(".kasus_siswa").html("<strong>Siswa yang Bersangkutan</strong><br>"+list_penerima);
        if(resp.id_kategori == null || resp.id_kategori == ""){
            kategori_kasus = "<strong>Kategori</strong><br><span class='label label-primary label-form'>-</span>";
        } else {
            kategori_kasus = "<strong>Kategori</strong><br><a class='detail-kategori-kasus' data-id='"+resp.id_kategori+"'><span class='label label-primary label-form'>"+resp.kategori_nama+"</span></a>";
        }
        kasus_detail.find(".kasus_kategori").html(kategori_kasus);
        if(resp.is_published == 1){
            published = "<strong>Status</strong><br><a class='status-kasus' data-id='"+resp.id+"'><span class='label label-success label-form'>Publish</span></a>";
        } else {
            published = "<strong>Status</strong><br><a class='status-kasus' data-id='"+resp.id+"'><span class='label label-danger label-form'>Tidak Publish</span></a>";
        }
        kasus_detail.find(".kasus_status").html(published);
        if(hak_akses == false){
            kasus_detail.find(".edit-kasus, .status-kasus").addClass("disabled");
        } else {
            kasus_detail.find(".edit-kasus, .status-kasus").removeClass("disabled");
            kasus_detail.find(".edit-kasus").attr("href", base_url+"/kasus/edit_kasus.html?id="+resp.id);
            kasus_detail.find(".edit-kasus, .status-kasus").attr("data-id", resp.id);
        }
        tgl_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kasus_detail.find(".kasus_last_update").html("<strong>Tgl Last Update</strong><br>"+tgl_update+"<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        kasus_detail.find(".kasus_insert").html("<strong>Tgl Insert</strong><br>"+tgl_insert+"<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kasus_detail.find(".loading-gif-image").addClass("hidden");
        kasus_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kasus .modal-title").html("Detail Kasus : " + resp.judul);
    });
}
// END KASUS
// START KATEGORI PERIJINAN
$(".datatable-kategori-perijinan tbody, .datatable-perijinan tbody, #modal-detail-perijinan").on("click", ".detail-kategori-perijinan", function() {
    if($("#modal-detail-siswa").hasClass('in')){
        id_update = kategori_perijinan_detail.find(".edit-kategori-perijinan").attr("data-id");
        // $("#modal-detail-kelas, #modal-list-siswa-per-kelas").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_kategori_perijinan(id_update);
});
$(".datatable-kategori-perijinan tbody, #modal-detail-kategori-perijinan").on("click", ".status-kategori-perijinan", function() {
    $("#modal-status-kategori-perijinan .modal-title").html("Edit Status : Nama Kategori");
    kategori_perijinan_status.find(".loading-gif-image").removeClass("hidden");
    kategori_perijinan_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-perijinan").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_perijinan_status.find(".id_hidden").val(id_update);
    
    pagename = "/perijinan/ajax_perijinan_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_perijinan_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_perijinan_status.find(".loading-gif-image").addClass("hidden");
        kategori_perijinan_status.find(".after-loading").removeClass("hidden");
        kategori_perijinan_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-perijinan .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-perijinan tbody, #modal-detail-kategori-perijinan").on("click", ".edit-kategori-perijinan", function() {
    $("#modal-edit-kategori-perijinan .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_perijinan_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_perijinan_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-perijinan").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_perijinan_edit.find(".id_hidden").val(id_update);
    
    pagename = "/perijinan/ajax_perijinan_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_perijinan_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_perijinan_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_perijinan_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_perijinan_edit.find(".loading-gif-image").addClass("hidden");
        kategori_perijinan_edit.find(".after-loading").removeClass("hidden");
        kategori_perijinan_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-perijinan .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$("#modal-tambah-kategori-perijinan").on('show.bs.modal', function () {
    kategori_perijinan_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-perijinan").on('shown.bs.modal', function () {
        kategori_perijinan_baru.find("input[name='form[nama]']").focus();
    });
});
function detail_data_kategori_perijinan(id_update){
    $("#modal-detail-kategori-perijinan .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_perijinan_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_perijinan_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-perijinan").modal("show");
    pagename = "/perijinan/ajax_perijinan_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_perijinan_detail.find(".status-kategori-perijinan").html(is_active);
        kategori_perijinan_detail.find(".edit-kategori-perijinan, .status-kategori-perijinan").attr("data-id", resp.id);
        kategori_perijinan_detail.find(".nama_kategori").text(resp.nama);
        kategori_perijinan_detail.find(".keterangan_kategori").text(resp.keterangan);
        kategori_perijinan_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_perijinan_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_perijinan_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_perijinan_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_perijinan_detail.find(".loading-gif-image").addClass("hidden");
        kategori_perijinan_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-perijinan .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
$("#modal-tambah-kategori-perijinan").on('show.bs.modal', function () {
    kategori_perijinan_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-perijinan").on('shown.bs.modal', function () {
        kategori_perijinan_baru.find("input[name='form[nama]']").focus();
    });
});
// END KATEGORI PERIJINAN 
// START KATEGORI ABSENSI
$(".datatable-kategori-absensi tbody, #modal-detail-kategori-absensi").on("click", ".status-kategori-absensi", function() {
    $("#modal-status-kategori-absensi .modal-title").html("Edit Status : Nama Kategori");
    kategori_absensi_status.find(".loading-gif-image").removeClass("hidden");
    kategori_absensi_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-absensi").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_absensi_status.find(".id_hidden").val(id_update);
    
    pagename = "/absensi/ajax_kategori_absensi";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_absensi_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_absensi_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_absensi_status.find(".loading-gif-image").addClass("hidden");
        kategori_absensi_status.find(".after-loading").removeClass("hidden");
        kategori_absensi_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-absensi .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-absensi tbody, #modal-detail-kategori-absensi").on("click", ".edit-kategori-absensi", function() {
    $("#modal-edit-kategori-absensi .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_absensi_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_absensi_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-absensi").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_absensi_edit.find(".id_hidden").val(id_update);
    
    pagename = "/absensi/ajax_kategori_absensi";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_absensi_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_absensi_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_absensi_edit.find("input[name='form[kode]']").val(resp.kode);
        kategori_absensi_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        if(resp.is_jam_masuk==1){
            kategori_absensi_edit.find(".pengecekan-terlambat").prop('checked', true).trigger("change");
            jam = resp.jam;
            jam = jam.slice(0, -3);
            kategori_absensi_edit.find("input[name='form[jam]']").val(jam);
        } else{
            kategori_absensi_edit.find(".pengecekan-terlambat").prop('checked', false).trigger("change");
            kategori_absensi_edit.find("input[name='form[jam]']").val("06:30");
        }
        kategori_absensi_edit.find("input[name='form[is_jam_masuk]']").val(resp.is_jam_masuk);
        kategori_absensi_edit.find(".loading-gif-image").addClass("hidden");
        kategori_absensi_edit.find(".after-loading").removeClass("hidden");
        kategori_absensi_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-absensi .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$(".datatable-kategori-absensi tbody, #modal-detail-absensi-keterangan").on("click", ".detail-kategori-absensi", function() {
    var id_update = $(this).attr("data-id");
    detail_data_kategori_absensi(id_update);
});
$("#modal-tambah-kategori-absensi").on('show.bs.modal', function () {
    kategori_absensi_baru.find("input[name='form[nama]'], input[name='form[kode]'], textarea[name='form[keterangan]']").val("");
    kategori_absensi_baru.find(".pengecekan-terlambat").prop('checked', false);
    kategori_absensi_baru.find(".jam-masuk").collapse("hide");
    kategori_absensi_baru.find("input[name='form[is_jam_masuk]']").val(0);
    $("#modal-tambah-kategori-absensi").on('shown.bs.modal', function () {
        kategori_absensi_baru.find("input[name='form[nama]']").focus();
    });
});
kategori_absensi_baru.find('.pengecekan-terlambat').change(function() {
    if($(this).is(":checked")) {
        kategori_absensi_baru.find("input[name='form[is_jam_masuk]']").val(1);
        kategori_absensi_baru.find(".input-jam-masuk").val("06:30");
        kategori_absensi_baru.find(".jam-masuk").collapse("show");
    } else{
        kategori_absensi_baru.find("input[name='form[is_jam_masuk]']").val(0);
        kategori_absensi_baru.find(".jam-masuk").collapse("hide");
    }
});
kategori_absensi_edit.find('.pengecekan-terlambat').change(function() {
    if($(this).is(":checked")) {
        kategori_absensi_edit.find("input[name='form[is_jam_masuk]']").val(1);
        kategori_absensi_edit.find(".input-jam-masuk").val("06:30");
        kategori_absensi_edit.find(".jam-masuk").collapse("show");
    } else{
        kategori_absensi_edit.find("input[name='form[is_jam_masuk]']").val(0);
        kategori_absensi_edit.find(".jam-masuk").collapse("hide");
    }
});
kategori_absensi_baru.find(".kode-kategori-absensi").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
kategori_absensi_edit.find(".kode-kategori-absensi").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
function detail_data_kategori_absensi(id_update){
    $("#modal-detail-kategori-absensi .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_absensi_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_absensi_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-absensi").modal("show");
    pagename = "/absensi/ajax_kategori_absensi";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_absensi_detail.find(".status-kategori-absensi").html(is_active);
        kategori_absensi_detail.find(".nama_kategori").text(resp.nama);
        kategori_absensi_detail.find(".kode_kategori").text(resp.kode);
        if(resp.is_jam_masuk==1){
            jam = resp.jam;
            jam = jam.slice(0, -3);
            kategori_absensi_detail.find(".jam_kategori").html("<span class='label label-info label-form'></span>");
        } else{
            kategori_absensi_detail.find(".jam_kategori").html("<span class='label label-danger label-form'>-</span>");
            jam = "-";
        }
        kategori_absensi_detail.find(".jam_kategori span").text(jam);
        kategori_absensi_detail.find(".keterangan_kategori").text(resp.keterangan);
        if(hak_akses == false){
            kategori_absensi_detail.find(".edit-kategori-absensi, .status-kategori-absensi").addClass("disabled");
        } else {
            kategori_absensi_detail.find(".edit-kategori-absensi, .status-kategori-absensi").removeClass("disabled");
            kategori_absensi_detail.find(".edit-kategori-absensi, .status-kategori-absensi").attr("data-id", resp.id);
        }
        kategori_absensi_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_absensi_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_absensi_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_absensi_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_absensi_detail.find(".loading-gif-image").addClass("hidden");
        kategori_absensi_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-absensi .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
// END KATEGORI ABSENSI
// START POSISI ABSENSI
$(".datatable-mesin-absensi tbody, .datatable-absensi-terlambat-detail tbody, #modal-detail-absensi-keterangan, #modal-detail-absensi-keterangan, .detail-absensi-siswa").on("click", ".detail-posisi-absensi", function() {
    var id_update = $(this).attr("data-id");
    detail_data_posisi_absensi(id_update);
});
$(".datatable-mesin-absensi tbody, #modal-detail-mesin-absensi").on("click", ".status-posisi-absensi", function() {
    $("#modal-status-mesin-absensi .modal-title").html("Edit Status : Nama Mesin");
    posisi_absensi_status.find(".loading-gif-image").removeClass("hidden");
    posisi_absensi_status.find(".after-loading").addClass("hidden");
    $("#modal-status-mesin-absensi").modal("show");

    var id_update = $(this).attr("data-id");
    posisi_absensi_status.find(".id_hidden").val(id_update);
    
    pagename = "/absensi/ajax_mesin_absensi";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        posisi_absensi_status.find("input[name='form[nama_mesin]']").val(resp.nama_mesin);
        posisi_absensi_status.find(".edit-status").val(resp.is_active).trigger("change");
        posisi_absensi_status.find(".loading-gif-image").addClass("hidden");
        posisi_absensi_status.find(".after-loading").removeClass("hidden");
        posisi_absensi_status.find("div.edit-status").addClass('open');
        $("#modal-status-mesin-absensi .modal-title").html("Edit Status : " + resp.nama_mesin);
    });
});
$(".datatable-mesin-absensi tbody, #modal-detail-mesin-absensi").on("click", ".edit-posisi-absensi", function() {
    $("#modal-edit-mesin-absensi .modal-title").html("Edit Mesin : Nama Mesin");
    posisi_absensi_edit.find(".loading-gif-image").removeClass("hidden");
    posisi_absensi_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-mesin-absensi").modal("show");

    var id_update = $(this).attr("data-id");
    posisi_absensi_edit.find(".id_hidden").val(id_update);
    
    pagename = "/absensi/ajax_mesin_absensi";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        posisi_absensi_edit.find(".edit-status").val(resp.is_active).trigger("change");
        posisi_absensi_edit.find("input[name='form[nama_mesin]']").val(resp.nama_mesin);
        posisi_absensi_edit.find("input[name='form[kode]']").val(resp.kode);
        posisi_absensi_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        posisi_absensi_edit.find(".loading-gif-image").addClass("hidden");
        posisi_absensi_edit.find(".after-loading").removeClass("hidden");
        posisi_absensi_edit.find("input[name='form[nama_mesin]']").focus();
        $("#modal-edit-mesin-absensi .modal-title").html("Edit Mesin : " + resp.nama_mesin);
    });
});
$("#modal-tambah-mesin-absensi").on('show.bs.modal', function () {
    posisi_absensi_baru.find("input[name='form[nama_mesin]'], input[name='form[kode]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-mesin-absensi").on('shown.bs.modal', function () {
        posisi_absensi_baru.find("input[name='form[nama_mesin]']").focus();
    });
});
posisi_absensi_baru.find(".kode-mesin").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
posisi_absensi_edit.find(".kode-mesin").bind('keyup', function (e) {
    if (e.which >= 97 && e.which <= 122) {
        var newKey = e.which - 32;
        e.keyCode = newKey;
        e.charCode = newKey;
    }
    $(this).val(($(this).val()).toUpperCase());
});
function detail_data_posisi_absensi(id_update){
    $("#modal-detail-mesin-absensi .modal-title").html("Detail Mesin : Nama Mesin");
    posisi_absensi_detail.find(".loading-gif-image").removeClass("hidden");
    posisi_absensi_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-mesin-absensi").modal("show");
    pagename = "/absensi/ajax_mesin_absensi";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        posisi_absensi_detail.find(".status-posisi-absensi").html(is_active);
        posisi_absensi_detail.find(".nama_mesin").text(resp.nama_mesin);
        posisi_absensi_detail.find(".kode_mesin").text(resp.kode);
        posisi_absensi_detail.find(".keterangan_mesin").text(resp.keterangan);
        if(hak_akses == false){
            posisi_absensi_detail.find(".edit-posisi-absensi, .status-posisi-absensi").addClass("disabled");
        } else {
            posisi_absensi_detail.find(".edit-posisi-absensi, .status-posisi-absensi").removeClass("disabled");
            posisi_absensi_detail.find(".edit-posisi-absensi, .status-posisi-absensi").attr("data-id", resp.id);
        }
        posisi_absensi_detail.find(".tgl_insert_mesin").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        posisi_absensi_detail.find(".tgl_last_update_mesin").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        posisi_absensi_detail.find(".tgl_insert_mesin").prepend(tgl_insert);
        posisi_absensi_detail.find(".tgl_last_update_mesin").prepend(tgl_last_update);

        posisi_absensi_detail.find(".loading-gif-image").addClass("hidden");
        posisi_absensi_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-mesin-absensi .modal-title").html("Detail Mesin : " + resp.nama_mesin);
    });
}
// END POSISI ABSENSI
// START KATEGORI TAGIHAN
$(".datatable-kategori-tagihan tbody, .datatable-tarif-khusus tbody, .div-tagihan-detail, .datatable-tagihan tbody, #modal-detail-tarif-khusus, .datatable-tagihan tbody, .datatable-tarif tbody, #modal-detail-tagihan, #modal-detail-tarif").on("click", ".detail-kategori-tagihan", function() {
    if($("#modal-detail-siswa").hasClass('in')){
        id_update = kategori_tagihan_detail.find(".edit-kategori-tagihan").attr("data-id");
        // $("#modal-detail-kelas, #modal-list-siswa-per-kelas").modal("hide");
    }
    id_update = $(this).attr("data-id");
    detail_data_kategori_tagihan(id_update);
});
$(".datatable-kategori-tagihan tbody, #modal-detail-kategori-tagihan").on("click", ".status-kategori-tagihan", function() {
    $("#modal-status-kategori-tagihan .modal-title").html("Edit Status : Nama Kategori");
    kategori_tagihan_status.find(".loading-gif-image").removeClass("hidden");
    kategori_tagihan_status.find(".after-loading").addClass("hidden");
    $("#modal-status-kategori-tagihan").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_tagihan_status.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tagihan_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_tagihan_status.find("input[name='form[nama]']").val(resp.nama);
        kategori_tagihan_status.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_tagihan_status.find(".loading-gif-image").addClass("hidden");
        kategori_tagihan_status.find(".after-loading").removeClass("hidden");
        kategori_tagihan_status.find("div.edit-status").addClass('open');
        $("#modal-status-kategori-tagihan .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-kategori-tagihan tbody, #modal-detail-kategori-tagihan").on("click", ".edit-kategori-tagihan", function() {
    $("#modal-edit-kategori-tagihan .modal-title").html("Edit Kategori : Nama Kategori");
    kategori_tagihan_edit.find(".loading-gif-image").removeClass("hidden");
    kategori_tagihan_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-kategori-tagihan").modal("show");

    var id_update = $(this).attr("data-id");
    kategori_tagihan_edit.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tagihan_kategori";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        kategori_tagihan_edit.find(".edit-status").val(resp.is_active).trigger("change");
        kategori_tagihan_edit.find("input[name='form[nama]']").val(resp.nama);
        kategori_tagihan_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        kategori_tagihan_edit.find(".loading-gif-image").addClass("hidden");
        kategori_tagihan_edit.find(".after-loading").removeClass("hidden");
        kategori_tagihan_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-kategori-tagihan .modal-title").html("Edit Kategori : " + resp.nama);
    });
});
$("#modal-tambah-kategori-tagihan").on('show.bs.modal', function () {
    kategori_tagihan_baru.find("input[name='form[nama]'], textarea[name='form[keterangan]']").val("");
    $("#modal-tambah-kategori-tagihan").on('shown.bs.modal', function () {
        kategori_tagihan_baru.find("input[name='form[nama]']").focus();
    });
});
function detail_data_kategori_tagihan(id_update){
    $("#modal-detail-kategori-tagihan .modal-title").html("Detail Kategori : Nama Kategori");
    kategori_tagihan_detail.find(".loading-gif-image").removeClass("hidden");
    kategori_tagihan_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-kategori-tagihan").modal("show");
    pagename = "/keuangan/ajax_tagihan_kategori";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        kategori_tagihan_detail.find(".status-kategori-tagihan").html(is_active);
        kategori_tagihan_detail.find(".nama_kategori").text(resp.nama);
        kategori_tagihan_detail.find(".keterangan_kategori").text(resp.keterangan);
        if(hak_akses == false){
            kategori_tagihan_detail.find(".edit-kategori-tagihan, .status-kategori-tagihan").addClass("disabled");
        } else {
            kategori_tagihan_detail.find(".edit-kategori-tagihan, .status-kategori-tagihan").removeClass("disabled");
            kategori_tagihan_detail.find(".edit-kategori-tagihan, .status-kategori-tagihan").attr("data-id", resp.id);
        }
        kategori_tagihan_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        kategori_tagihan_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        kategori_tagihan_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        kategori_tagihan_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);

        kategori_tagihan_detail.find(".loading-gif-image").addClass("hidden");
        kategori_tagihan_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-kategori-tagihan .modal-title").html("Detail Kategori : " + resp.nama);
    });
}
// END KATEGORI TAGIHAN
// STAR TARIF
$(".datatable-tarif tbody, .datatable-tarif-khusus tbody, .div-tagihan-detail, #modal-detail-pembayaran, #modal-edit-pembayaran, .datatable-tagihan tbody, #modal-detail-tarif-khusus").on("click", ".detail-tarif", function() {
    var id_update = $(this).attr("data-id");
    detail_data_tarif(id_update);
});
$(".datatable-tarif tbody, #modal-detail-tarif").on("click", ".edit-tarif", function() {
    $("#modal-edit-tarif .modal-title").html("Edit Tarif : Nama Tarif");
    tarif_edit.find(".loading-gif-image").removeClass("hidden");
    tarif_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-tarif").modal("show");

    var id_update = $(this).attr("data-id");
    tarif_edit.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tarif";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tarif_edit.find(".edit-status").val(resp.is_active).trigger("change");
        tarif_edit.find("input[name='form[nama]']").val(resp.nama);
        var inputan = Number(resp.tarif);
        var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
        tarif_edit.find("input[name='form[tarif]']").val(inputan);
        tanggal = moment(resp.bulan+" "+resp.tahun, "M YYYY").format('MMM YYYY');
        tarif_edit.find(".datetimepicker5").datepicker('setDate', tanggal);
        tarif_edit.find("input[name='form[periode]']").val(resp.tahun+"-"+resp.bulan);
        tarif_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        tarif_edit.find(".dropdown-kategori-tagihan").val(resp.id_kategori).trigger("change");
        tarif_edit.find(".loading-gif-image").addClass("hidden");
        tarif_edit.find(".after-loading").removeClass("hidden");
        tarif_edit.find("input[name='form[nama]']").focus();
        tanggal = moment(resp.bulan+" "+resp.tahun, "M YYYY").format('MMM YYYY');
        $("#modal-edit-tarif .modal-title").html("Edit Tarif : " + resp.nama + " - " + tanggal);
    });
});
tarif_edit.find(".nominal-tarif").focus(function () {
    var inputan = $(this).val();
    inputan = inputan.replace(/\./g, "", inputan);
    $(this).val(inputan);
});
tarif_edit.find(".nominal-tarif").blur(function () {
    var inputan = Number($(this).val());
    var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
    $(this).val(inputan);
});
tarif_baru.find(".nominal-tarif").focus(function () {
    var inputan = $(this).val();
    inputan = inputan.replace(/\./g, "", inputan);
    $(this).val(inputan);
});
tarif_baru.find(".nominal-tarif").blur(function () {
    var inputan = Number($(this).val());
    var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
    $(this).val(inputan);
});
tarif_edit.find(".tanggal").bind('change', function () {
    var tanggal = tarif_edit.find(".tanggal").val();
    tanggal = moment(tanggal, "MMM YYYY").format("YYYY-MM");
    bulan = tanggal.slice(-2);
    tahun = tanggal.substring(0, 4);
    tarif_edit.find("input[name='form[periode]']").val(tahun+"-"+bulan);
});
$(".datatable-tarif tbody, #modal-detail-tarif").on("click", ".status-tarif", function() {
    $("#modal-status-tarif .modal-title").html("Edit Status : Nama Tarif");
    tarif_status.find(".loading-gif-image").removeClass("hidden");
    tarif_status.find(".after-loading").addClass("hidden");
    $("#modal-status-tarif").modal("show");

    var id_update = $(this).attr("data-id");
    tarif_status.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tarif";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tarif_status.find("input[name='form[periode]']").val(resp.tahun+"-"+resp.bulan);
        tarif_status.find("input[name='form[nama]']").val(resp.nama);
        tarif_status.find(".edit-status").val(resp.is_active).trigger("change");
        tarif_status.find(".loading-gif-image").addClass("hidden");
        tarif_status.find(".after-loading").removeClass("hidden");
        tarif_status.find("div.edit-status").addClass('open');
        tanggal = moment(resp.bulan+" "+resp.tahun, "M YYYY").format('MMM YYYY');
        $("#modal-status-tarif .modal-title").html("Edit Status : " + resp.nama + " - " + tanggal);
    });
});
$("#modal-tambah-tarif").on('show.bs.modal', function () {
    tarif_baru.find("input[name='form[nama]'], .nominal-tarif, textarea[name='form[keterangan]']").val("");
    tarif_baru.find(".dropdown-kategori-tagihan").val("").trigger("change");
    tarif_baru.find(".dropdown-tahun").val(new Date().getFullYear()).trigger("change");
    tarif_baru.find(".pilih-bulan").val("1").trigger("change");
    for(x=1;x<=12;x++){
        tarif_baru.find(".dropdown-menu.inner.selectpicker li:nth-child("+x+")").removeClass("selected");
    }
    tarif_baru.find(".dropdown-menu.inner.selectpicker li:nth-child(1)").addClass("selected");
    $("#modal-tambah-tarif").on('shown.bs.modal', function () {
        tarif_baru.find("input[name='form[nama]']").focus();
    });
});
$("#modal-edit-tarif").on('show.bs.modal', function () {
    $("#modal-edit-tarif").on('shown.bs.modal', function () {
        tarif_edit.find("input[name='form[nama]']").focus();
    });
});
tarif_baru.find(".pilih-bulan").change(function(){
    tarif_periode(tarif_baru);
});
tarif_baru.find(".dropdown-tahun").change(function(){
    tarif_periode(tarif_baru);
});
function tarif_periode(param){
    bulan_list = param.find(".pilih-bulan").val();
    var array_bulan = JSON.parse("[" + bulan_list + "]");
    periode = "";
    $.each(array_bulan, function( i, l ){
        if(l.toString().length == 1){
            l = "0"+l;
        }
        periode += l+",";
    });
    periode = periode.slice(0, -1);
    param.find(".hidden-periode").val(periode);
}
function detail_data_tarif(id_update){
    $("#modal-detail-tarif .modal-title").html("Detail Tarif : Nama Tarif");
    tarif_detail.find(".loading-gif-image").removeClass("hidden");
    tarif_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-tarif").modal("show");
    pagename = "/keuangan/ajax_tarif";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        tarif_detail.find(".status-tarif").html(is_active);
        tarif_detail.find(".nama_tarif").text(resp.nama);
        var inputan = resp.tarif;
        var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
        tarif_detail.find(".nominal_tarif").text("Rp "+inputan);
        tanggal = moment(resp.bulan+" "+resp.tahun, "M YYYY").format('MMM YYYY');
        tarif_detail.find(".bulan_tahun_tarif").text(tanggal);
        tarif_detail.find(".kategori_tagihan").html("<a class='detail-kategori-tagihan' data-id='"+resp.id_kategori+"'>"+resp.kategori_nama+"</a>");
        tarif_detail.find(".keterangan_kategori").text(resp.keterangan);
        if(hak_akses == false){
            tarif_detail.find(".edit-tarif, .status-tarif").addClass("disabled");
        } else {
            tarif_detail.find(".edit-tarif, .status-tarif").removeClass("disabled");
            tarif_detail.find(".edit-tarif, .status-tarif").attr("data-id", resp.id);
        }
        tarif_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        tarif_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        tarif_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        tarif_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);
        tarif_detail.find(".loading-gif-image").addClass("hidden");
        tarif_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-tarif .modal-title").html("Detail Tarif : " + resp.nama + " - " + tanggal);
    });
}
// END TARIF
// STAR TARIF KHUSUS
$("#modal-tambah-tarif-khusus").on('show.bs.modal', function () {
    tarif_khusus_baru.find("input[name='form[tarif]'], textarea[name='form[keterangan]']").val("");
    tarif_khusus_baru.find(".tagsinput_siswa").tagsinput("removeAll");
    tarif_khusus_baru.find(".dropdown-kategori-tagihan").val("").trigger("change");
    tarif_khusus_baru.find(".select2.dropdown-tarif").select2({
        disabled: true,
        placeholder: "Pilih Kategori terlebih dahulu",
    });
    $("#modal-tambah-tarif").on('shown.bs.modal', function () {
        tarif_khusus_baru.find(".dropdown-kategori-tagihan").select2("open");
    });
});
tarif_khusus_baru.find(".select2.dropdown-kategori-tagihan").change(function(){
    tarif_khusus_baru.find(".select2.dropdown-tarif").select2({
        disabled: true,
        placeholder: "Loading...",
    });
    if($(this).val() == ""){
        tarif_khusus_baru.find(".select2.dropdown-tarif").select2({
            disabled: true,
            placeholder: "Pilih Kategori terlebih dahulu",
        }).val("").trigger("change");
    } else {
        GetDropdownTarif('', $(this).val(), '', 'tambah');
    }
});
tarif_khusus_baru.find(".nominal-tarif").focus(function () {
    var inputan = $(this).val();
    inputan = inputan.replace(/\./g, "", inputan);
    $(this).val(inputan);
});
tarif_khusus_baru.find(".nominal-tarif").blur(function () {
    var inputan = Number($(this).val());
    var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
    $(this).val(inputan);
});
tarif_khusus_edit.find(".nominal-tarif").focus(function () {
    var inputan = $(this).val();
    inputan = inputan.replace(/\./g, "", inputan);
    $(this).val(inputan);
});
tarif_khusus_edit.find(".nominal-tarif").blur(function () {
    var inputan = Number($(this).val());
    var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
    $(this).val(inputan);
});
$(".datatable-tarif-khusus tbody, #modal-detail-tarif-khusus").on("click", ".edit-tarif-khusus", function() {
    $("#modal-edit-tarif-khusus .modal-title").html("Edit Tarif Khusus : Nama Siswa - Nama Tarif");
    tarif_khusus_edit.find(".loading-gif-image").removeClass("hidden");
    tarif_khusus_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-tarif-khusus").modal("show");
    var id_update = $(this).attr("data-id");
    tarif_khusus_edit.find(".id_hidden").val(id_update);
    pagename = "/keuangan/ajax_tarif_khusus";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tarif_khusus_edit.find("input[name='form[id_siswa]']").val(resp.id_siswa);
        tarif_khusus_edit.find("input[name='form[id_tarif]']").val(resp.id_tarif);
        tarif_khusus_edit.find(".edit-status").val(resp.is_active).trigger("change");
        var inputan = Number(resp.tarif_akhir);
        var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
        tarif_khusus_edit.find("input[name='form[tarif]']").val(inputan);
        tarif_khusus_edit.find("textarea[name='form[keterangan]']").val(resp.keterangan);
        tarif_khusus_edit.find(".loading-gif-image").addClass("hidden");
        tarif_khusus_edit.find(".after-loading").removeClass("hidden");
        tarif_khusus_edit.find("input[name='form[tarif]']").focus();
        $("#modal-edit-tarif-khusus .modal-title").html("Edit Tarif Khusus : " + resp.nama_siswa + " - " + resp.nama_tarif);
    });
});
$(".datatable-tarif-khusus tbody, #modal-detail-tarif-khusus").on("click", ".status-tarif-khusus", function() {
    $("#modal-status-tarif-khusus .modal-title").html("Edit Status : Nama Tarif Khusus");
    tarif_khusus_status.find(".loading-gif-image").removeClass("hidden");
    tarif_khusus_status.find(".after-loading").addClass("hidden");
    $("#modal-status-tarif-khusus").modal("show");

    var id_update = $(this).attr("data-id");
    tarif_khusus_status.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tarif_khusus";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tarif_khusus_status.find("input[name='form[id_siswa]']").val(resp.id_siswa);
        tarif_khusus_status.find("input[name='form[id_tarif]']").val(resp.id_tarif);
        tarif_khusus_status.find(".edit-status").val(resp.is_active).trigger("change");
        tarif_khusus_status.find(".loading-gif-image").addClass("hidden");
        tarif_khusus_status.find(".after-loading").removeClass("hidden");
        tarif_khusus_status.find("div.edit-status").addClass('open');
        var inputan = Number(resp.tarif_akhir);
        var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
        $("#modal-status-tarif-khusus .modal-title").html("Edit Status : " + resp.nama_siswa + " - " + resp.nama_tarif + " - Rp " + inputan);
    });
});
$(".datatable-tarif-khusus tbody, .div-tagihan-detail").on("click", ".detail-tarif-khusus", function() {
    var id_update = $(this).attr("data-id");
    detail_data_tarif_khusus(id_update);
});
function detail_data_tarif_khusus(id_update){
    $("#modal-detail-tarif-khusus .modal-title").html("Detail Tarif Khusus : Nama Tarif Khusus");
    tarif_khusus_detail.find(".loading-gif-image").removeClass("hidden");
    tarif_khusus_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-tarif-khusus").modal("show");
    pagename = "/keuangan/ajax_tarif_khusus";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        tarif_khusus_detail.find(".status-tarif-khusus").html(is_active);
        tarif_khusus_detail.find(".nama_siswa").html("<a class='detail-siswa' data-id='"+resp.id_siswa+"'>"+resp.nama_siswa+"</a>");
        tarif_khusus_detail.find(".nis_siswa").html(resp.nis);
        tarif_khusus_detail.find(".nama_kategori").html("<a class='detail-kategori-tagihan' data-id='"+resp.id_kategori+"'>"+resp.nama_kategori+"</a>");
        tanggal = moment(resp.bulan+" "+resp.tahun, "M YYYY").format('MMM YYYY');
        tarif_khusus_detail.find(".nama_tarif").html("<a class='detail-tarif' data-id='"+resp.id_tarif+"'>"+resp.nama_tarif+" - "+tanggal+"</a>");
        if(parseInt(resp.tarif_awal) > parseInt(resp.tarif_akhir)){
            var inputan = Number(resp.tarif_awal-resp.tarif_akhir);
            var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
            label_tarif = "data-original-title='&darr; Rp "+inputan+"'";
        } else {
            var inputan = Number(resp.tarif_akhir-resp.tarif_awal);
            var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
            label_tarif = "data-original-title='&uarr; Rp "+inputan+"'";
        }
        var tarif_awal = Number(resp.tarif_awal);
        var number_string = tarif_awal.toString(), sisa = number_string.length % 3, tarif_awal = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; tarif_awal += separator + ribuan.join('.'); }
        var tarif_akhir = Number(resp.tarif_akhir);
        var number_string = tarif_akhir.toString(), sisa = number_string.length % 3, tarif_akhir = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; tarif_akhir += separator + ribuan.join('.'); }
        tarif_khusus_detail.find(".nominal_tarif").html("<span class='label label-default label-form' data-toggle='tooltip' data-placement='top' title='' "+label_tarif+">Rp "+tarif_awal+"<i class='fa fa-arrow-right' style='margin-right: 10px;margin-left: 10px;'></i>Rp "+tarif_akhir+"</span>");
        tarif_khusus_detail.find(".keterangan_tarif_khusus").text(resp.keterangan);
        if(hak_akses == false){
            tarif_khusus_detail.find(".edit-tarif-khusus, .status-tarif-khusus").addClass("disabled");
        } else {
            tarif_khusus_detail.find(".edit-tarif-khusus, .status-tarif-khusus").removeClass("disabled");
            tarif_khusus_detail.find(".edit-tarif-khusus, .status-tarif-khusus").attr("data-id", resp.id);
        }
        tarif_khusus_detail.find(".tgl_insert_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        tarif_khusus_detail.find(".tgl_last_update_kategori").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        tarif_khusus_detail.find(".tgl_insert_kategori").prepend(tgl_insert);
        tarif_khusus_detail.find(".tgl_last_update_kategori").prepend(tgl_last_update);
        tarif_khusus_detail.find(".loading-gif-image").addClass("hidden");
        tarif_khusus_detail.find(".after-loading").removeClass("hidden");
        var inputan = Number(resp.tarif_akhir);
        var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
        $("#modal-detail-tarif-khusus .modal-title").html("Detail Tarif Khusus : " + resp.nama_siswa + " - " + resp.nama_tarif + " - " + tanggal);
    });
}
// END TARIF KHUSUS
// START TAGIHAN
tagihan_edit.find(".tgl_jatuh_tempo").change(function(){
        tgl_jatuh_tempo = $(this).val();
        if(tgl_jatuh_tempo==""){
            tagihan_edit.find(".tgl_jatuh_tempo_hidden").val("");
        } else {
            tgl_jatuh_tempo = moment(tgl_jatuh_tempo, "DD MMM YYYY").format("YYYY-MM-DD");
            tagihan_edit.find(".tgl_jatuh_tempo_hidden").val(tgl_jatuh_tempo);
        }
});
tagihan_edit.find(".select2.dropdown-kategori-tagihan").change(function(){
    if(is_tagihan_edit == false){
        tagihan_edit.find(".select2.dropdown-tarif").select2({
            disabled: true,
            placeholder: "Loading...",
        });
        if($(this).val() == ""){
            tagihan_edit.find(".select2.dropdown-tarif").select2({
                disabled: true,
                placeholder: "Pilih Kategori terlebih dahulu",
            }).val("").trigger("change");
        } else {
            tagihan_edit.find(".select2.dropdown-tarif").select2({
                disabled: true,
                placeholder: "Loading...",
            }).val("").trigger("change");
            GetDropdownTarif('', $(this).val(), '', "edit-tagihan");
        }
    }
});
$(".datatable-tagihan tbody, .detail-data-tagihan").on("click", ".edit-tagihan", function() {
    is_tagihan_edit = true;
    $("#modal-edit-tagihan .modal-title").html("Edit Tagihan : Nama Tagihan");
    tagihan_edit.find(".loading-gif-image").removeClass("hidden");
    tagihan_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-tagihan").modal("show");

    var id_update = $(this).attr("data-id");
    tagihan_edit.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tagihan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tagihan_edit.find("select[name='form[id_kategori]']").val(resp.id_kategori).trigger("change");
        tagihan_edit.find(".select2.dropdown-tarif").select2({
            disabled: true,
            placeholder: "Loading...",
        }).val("").trigger("change");
        GetDropdownTarif(resp.id_tarif, resp.id_kategori, function(){
            is_tagihan_edit = false;
        }, 'edit-tagihan');
        var tgl_jatuh_tempo = moment(resp.tgl_jatuh_tempo, "YYYY-MM-DD").format("DD MMM YYYY");
        tagihan_edit.find('.tgl_jatuh_tempo').datepicker('setDate', tgl_jatuh_tempo);
        tagihan_edit.find("input[name='form[tgl_jatuh_tempo]']").val(resp.tgl_jatuh_tempo);
        tagihan_edit.find("input[name='form[id_siswa]']").val(resp.id_siswa);
        tagihan_edit.find(".loading-gif-image").addClass("hidden");
        tagihan_edit.find(".after-loading").removeClass("hidden");
        tanggal = moment(resp.tarif_bulan+" "+resp.tarif_tahun, "M YYYY").format('MMM YYYY');
        $("#modal-edit-tagihan .modal-title").html("Edit Tagihan : " + resp.nama_tarif+" - ("+tanggal+")");
    });
});
$(".datatable-tagihan tbody").on("click", ".nonaktifkan-tagihan", function() {
    $("#modal-nonaktifkan-tagihan .modal-title").html("Nonaktifkan Tagihan : Nama Tagihan");
    tagihan_nonaktifkan.find(".loading-gif-image").removeClass("hidden");
    tagihan_nonaktifkan.find(".after-loading").addClass("hidden");
    $("#modal-nonaktifkan-tagihan").modal("show");

    var id_update = $(this).attr("data-id");
    tagihan_nonaktifkan.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tagihan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tagihan_nonaktifkan.find(".loading-gif-image").addClass("hidden");
        tagihan_nonaktifkan.find(".after-loading").removeClass("hidden");
        tagihan_nonaktifkan.find('.tgl_jatuh_tempo').val(resp.tgl_jatuh_tempo);
        tanggal = moment(resp.tarif_bulan+" "+resp.tarif_tahun, "M YYYY").format('MMM YYYY');
        $("#modal-nonaktifkan-tagihan .modal-title").html("Nonaktifkan Tagihan : " + resp.nama_tarif+" - ("+tanggal+")");
    });
});
$(".datatable-tagihan tbody").on("click", ".aktifkan-tagihan", function() {
    $("#modal-aktifkan-tagihan .modal-title").html("Aktifkan Tagihan : Nama Tagihan");
    tagihan_aktifkan.find(".loading-gif-image").removeClass("hidden");
    tagihan_aktifkan.find(".after-loading").addClass("hidden");
    $("#modal-aktifkan-tagihan").modal("show");

    var id_update = $(this).attr("data-id");
    tagihan_aktifkan.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_tagihan";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        tagihan_aktifkan.find(".loading-gif-image").addClass("hidden");
        tagihan_aktifkan.find(".after-loading").removeClass("hidden");
        tagihan_aktifkan.find('.tgl_jatuh_tempo').val(resp.tgl_jatuh_tempo);
        tanggal = moment(resp.tarif_bulan+" "+resp.tarif_tahun, "M YYYY").format('MMM YYYY');
        $("#modal-aktifkan-tagihan .modal-title").html("Aktifkan Tagihan : " + resp.nama_tarif+" - ("+tanggal+")");
    });
});
// END TAGIHAN
// START PEMBAYARAN
var first_load_edit_pembayaran = false;
function total_edit_pembayaran(){
    var total_formnominal = pembayaran_edit.find(".mt-repeater-item").size();
    var total_tagihan = 0;
    var total_bayar = 0;
    var total_belum_bayar = 0;
    for (i = 1; i <= total_formnominal; i++) {
        total_tagihan = (total_tagihan*1)+(pembayaran_edit.find(".mt-repeater-item:nth-child(" + i + ") .bayar").attr("datamax")*1);
    }
    for (i = 1; i <= total_formnominal; i++) {
        var bayar = pembayaran_edit.find(".mt-repeater-item:nth-child(" + i + ") .bayar").val();
        bayar = bayar.replace(/\./g, "", bayar);
        total_bayar = (total_bayar*1)+(bayar*1);
    }
    for (i = 1; i <= total_formnominal; i++) {
        var tagihan = pembayaran_edit.find(".mt-repeater-item:nth-child(" + i + ") .bayar").attr("datamax");
        var bayar = pembayaran_edit.find(".mt-repeater-item:nth-child(" + i + ") .bayar").val();
        bayar = bayar.replace(/\./g, "", bayar);
        var belum_bayar = (tagihan*1)-(bayar*1)
        total_belum_bayar = (total_belum_bayar*1)+(belum_bayar*1);
    }
    // FORMAT RIBUAN
    var number_string = total_tagihan.toString(), sisa = number_string.length % 3, total_tagihan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; total_tagihan += separator + ribuan.join('.'); }
    var number_string = total_bayar.toString(), sisa = number_string.length % 3, total_bayar = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; total_bayar += separator + ribuan.join('.'); }
    var number_string = total_belum_bayar.toString(), sisa = number_string.length % 3, total_belum_bayar = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; total_belum_bayar += separator + ribuan.join('.'); }

    pembayaran_edit.find(".total-tagihan").text("Rp "+total_tagihan);
    pembayaran_edit.find(".total-bayar").text("Rp "+total_bayar);
    pembayaran_edit.find(".total-belum-bayar").text("Rp "+total_belum_bayar);
}
$(".datatable-pembayaran").on("click", ".edit-pembayaran", function() {
    first_load_edit_pembayaran = true;
    pembayaran_edit.find(".collapse-rekening").collapse("hide");
    $("#modal-edit-pembayaran .modal-title").html("Detail Pembayaran Siswa - Kelas - No Pembayaran");
    pembayaran_edit.find(".loading-gif-image").removeClass("hidden");
    pembayaran_edit.find(".result-save, .result-error").addClass("hidden");
    pembayaran_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-pembayaran").modal("show");

    var id_update = $(this).attr("data-id");
    pembayaran_edit.find(".id_hidden").val(id_update);
    
    request["Sort"] = "";
    request["Page"] = "";
    request["Limit"] = "";
    request["no_pembayaran"] = id_update;
    pagename = "/keuangan/ajax_pembayaran";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {act:"getdetaildata_edit", req:request},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.nama_panggilan_siswa == "" || resp.nama_panggilan_siswa == null){
                nama_panggilan_siswa = "";
            } else {
                nama_panggilan_siswa = " ("+resp.nama_panggilan_siswa+")";
            }
            pembayaran_edit.find(".nis").html(resp.nis);
            pembayaran_edit.find("#id_pembayaran").attr("id-pembayaran", resp.no_pembayaran);
            pembayaran_edit.find(".siswa").html("<a data-id='"+resp.id_siswa+"' class='detail-siswa'>"+resp.siswa+nama_panggilan_siswa+"</a>");
            pembayaran_edit.find(".kelas").html("<a data-id='"+resp.id_kelas+"' class='detail-siswa'>"+resp.kelas+"</a>");
            pembayaran_edit.find(".no-pembayaran").html(resp.no_pembayaran);
            pembayaran_edit.find(".dropdown-karyawan").val(resp.id_petugas).trigger("change");
            pembayaran_edit.find(".cara-bayar").val(resp.cara_bayar).trigger("change");
            if(resp.cara_bayar == "TRANSFER"){
                pembayaran_edit.find(".dropdown-rekening").val(resp.id_rekening).trigger("change");
                pembayaran_edit.find(".collapse-rekening").collapse("show");
            } else {
                pembayaran_edit.find(".dropdown-rekening").val("").trigger("change");
                pembayaran_edit.find(".collapse-rekening").collapse("hide");
            }
            pembayaran_edit.find(".keterangan").val(resp.keterangan);
            var list_pembayaran = "";
            var x = 0;
            $.each(resp.Data, function(index, item) {
                bulan_tahun = moment(item.tarif_tahun+"-"+item.tarif_bulan, "YYYY-MM").format("MMM YYYY");
                var sisa_tagihan = item.sisa_tagihan;
                var number_string = sisa_tagihan.toString(), sisa = number_string.length % 3, sisa_tagihan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; sisa_tagihan += separator + ribuan.join('.'); }
                var jml_bayar = item.jml_bayar;
                var number_string = jml_bayar.toString(), sisa = number_string.length % 3, jml_bayar = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; jml_bayar += separator + ribuan.join('.'); }
                var jumlah_siswa_tagihan = ((item.sisa_tagihan*1)+(item.jml_bayar*1));
                var number_string = jumlah_siswa_tagihan.toString(), sisa = number_string.length % 3, jumlah_siswa_tagihan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; jumlah_siswa_tagihan += separator + ribuan.join('.'); }
                list_pembayaran += "<tr class='mt-repeater-item'><td><a href='"+base_url+"/keuangan/detail_tagihan.html?id="+item.id_tagihan_ai+"'>"+item.id_tagihan+"</a></td><td><a class='detail-tarif' data-id='"+item.id_tarif+"'>"+item.nama_tarif+" - ("+bulan_tahun+")</a></td><td class='text-right'>Rp "+jumlah_siswa_tagihan+"</td><td><input name='form[repeater]["+x+"][id_tagihan]' type='hidden' value='"+item.id_tagihan+"'><input autocomplete='off' name='form[repeater]["+x+"][jml_bayar]' type='text' datamax='"+((item.sisa_tagihan*1)+(item.jml_bayar*1))+"' class='form-control text-right bayar pull-right' value='"+jml_bayar+"' placeholder='Bayar' onkeypress='return validatedata(event)'></td></tr>";
                x++;
            });
            pembayaran_edit.find(".table-input-bayar tbody").html(list_pembayaran);
            if(resp.tgl_bayar == "" || resp.tgl_bayar == undefined || resp.tgl_bayar == null){

            } else {
                var tgl_bayar = moment(resp.tgl_bayar, "YYYY-MM-DD").format("DD MMM YYYY");
                pembayaran_edit.find('.datepicker-tanggal-bayar').datepicker('setDate', tgl_bayar);
                pembayaran_edit.find("input[name='form[tgl_bayar]']").val(resp.tgl_bayar);
            }
            pembayaran_edit.find(".bayar").focus(function(){
                var index = $(this).parents(".mt-repeater-item").index();
                index = index + 1;
                var inputan = $(this).val();
                inputan = inputan.replace(/\./g, "", inputan);
                $(this).val(inputan);
            });
            pembayaran_edit.find(".bayar").blur(function(){
                var index = $(this).parents(".mt-repeater-item").index();
                index = index + 1;
                var datamax = Number($(".mt-repeater-item:nth-child(" + index + ") .bayar").attr("datamax"));
                var inputan = Number($(this).val());
                if(inputan>=datamax){
                    inputan = datamax;
                } else{

                }
                var number_string = inputan.toString(), sisa = number_string.length % 3, inputan = number_string.substr(0, sisa), ribuan = number_string.substr(sisa).match(/\d{3}/g); if (ribuan) { separator = sisa ? '.' : ''; inputan += separator + ribuan.join('.'); }
                $(this).val(inputan);
                total_edit_pembayaran();
            });
            total_edit_pembayaran();
            pembayaran_edit.find(".loading-gif-image").addClass("hidden");
            pembayaran_edit.find(".after-loading").removeClass("hidden");
            $("#modal-edit-pembayaran .modal-title").html("Edit Pembayaran : " + resp.siswa + nama_panggilan_siswa + " - " + resp.kelas + " - " + resp.no_pembayaran);
            first_load_edit_pembayaran = false;
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
});
pembayaran_edit.find(".tanggal_bayar_edit").change(function(){
    tanggal_bayar = $(this).val();
    if(tanggal_bayar==""){
        pembayaran_edit.find(".hidden-tanggal-bayar").val("");
    } else {
        tanggal_bayar = moment(tanggal_bayar, "DD MMM YYYY").format("YYYY-MM-DD");
        pembayaran_edit.find(".hidden-tanggal-bayar").val(tanggal_bayar);
    }
});
pembayaran_edit.find(".cara-bayar").change(function(){
    if(first_load_edit_pembayaran == false){
        if($(this).val() == "TRANSFER"){
            pembayaran_edit.find(".collapse-rekening").collapse("show");
            pembayaran_edit.find(".dropdown-rekening").val("").trigger("change");
        } else {
            pembayaran_edit.find(".collapse-rekening").collapse("hide");
            pembayaran_edit.find(".dropdown-rekening").val("").trigger("change");
        }
    }
});
$(".datatable-pembayaran").on("click", ".cetak-pembayaran", function() {
    id_update = $(this).attr("data-id");
    CetakDetailPembayaran(id_update);
});
$(".datatable-pembayaran").on("click", ".detail-pembayaran", function() {
    id_update = $(this).attr("data-id");
    detail_data_pembayaran(id_update);
});
function detail_data_pembayaran(id_update){
    $("#modal-detail-pembayaran .modal-title").html("Detail Pembayaran Siswa - Kelas - No Pembayaran");
    pembayaran_detail.find(".loading-gif-image").removeClass("hidden");
    pembayaran_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-pembayaran").modal("show");
    request["Sort"] = "";
    request["Page"] = "";
    request["Limit"] = "";
    request["no_pembayaran"] = id_update;
    pagename = "/keuangan/ajax_pembayaran";
    $.ajax({
        type: "POST",
        url: base_url + pagename,
        data: {act:"listdetaildatahtml", req:request},
        dataType: "JSON",
        tryCount: 0,
        retryLimit: 3,
        success: function(resp){
            if(resp.nama_panggilan_siswa == "" || resp.nama_panggilan_siswa == null){
                nama_panggilan_siswa = "";
            } else {
                nama_panggilan_siswa = " ("+resp.nama_panggilan_siswa+")";
            }
            pembayaran_detail.find(".datatable-list-detail-pembayaran tbody").html(resp.lsdt);
            pembayaran_detail.find("#id_pembayaran").attr("id-pembayaran", resp.no_pembayaran);
            pembayaran_detail.find(".nis").html(resp.nis);
            pembayaran_detail.find(".siswa").html("<a data-id='"+resp.id_siswa+"' class='detail-siswa'>"+resp.siswa+nama_panggilan_siswa+"</a>");
            pembayaran_detail.find(".kelas").html("<a data-id='"+resp.id_kelas+"' class='detail-siswa'>"+resp.kelas+"</a>");
            pembayaran_detail.find(".petugas").html("<a data-id='"+resp.id_petugas+"' class='detail-siswa'>"+resp.petugas+"</a>");
            pembayaran_detail.find(".tanggal-bayar").html(resp.tgl_bayar);
            pembayaran_detail.find(".no-pembayaran").html(resp.no_pembayaran);
            pembayaran_detail.find(".cara-bayar").html(resp.cara_bayar);
            if(resp.cara_bayar == "TRANSFER"){
                pembayaran_detail.find(".rekening").html("<a data-id='"+resp.id_rekening+"' class='detail-rekening-sekolah'>"+resp.kode_bank+" - "+resp.nama_bank+" - "+resp.atas_nama+"</a>");
                pembayaran_detail.find(".collapse-rekening").removeClass("hidden");
            } else {
                pembayaran_detail.find(".rekening").html("");
                pembayaran_detail.find(".collapse-rekening").addClass("hidden");
            }
            pembayaran_detail.find(".keterangan-bayar").html(resp.keterangan);
            pembayaran_detail.find(".total-bayar").html(resp.total_bayar);
            pembayaran_detail.find(".loading-gif-image").addClass("hidden");
            pembayaran_detail.find(".after-loading").removeClass("hidden");
            $("#modal-detail-pembayaran .modal-title").html("Detail Pembayaran : " + resp.siswa + nama_panggilan_siswa + " - " + resp.kelas + " - " + resp.no_pembayaran);
        },
        error: function(xhr, textstatus, errorthrown) {
            setTimeout(function(){
                $(".modal").modal("hide");
                toastrshow("warning", "Periksa koneksi internet anda kembali", "Peringatan");
            }, 500);
        }
    });
}
pembayaran_edit.find(".result-save .alert button").click(function(){
    pembayaran_edit.find(".result-save").addClass("hidden");
});
pembayaran_edit.find(".result-error .alert button").click(function(){
    pembayaran_edit.find(".result-error").addClass("hidden");
});
function CetakDetailPembayaran(id_pembayaran){
    window.open(base_url+"/keuangan/cetak.html?id="+id_pembayaran, "", "width=1050,height=580");
}
// END PEMBAYARAN
// START REKENING SEKOLAH TAGIHAN
$(".datatable-rekening-sekolah tbody, #modal-detail-pembayaran").on("click", ".detail-rekening-sekolah", function() {
    id_update = $(this).attr("data-id");
    detail_data_rekening_sekolah(id_update);
});
$(".datatable-rekening-sekolah tbody, #modal-detail-rekening-sekolah").on("click", ".status-rekening-sekolah", function() {
    $("#modal-status-rekening-sekolah .modal-title").html("Edit Status : Nama Kategori");
    rekening_sekolah_status.find(".loading-gif-image").removeClass("hidden");
    rekening_sekolah_status.find(".after-loading").addClass("hidden");
    $("#modal-status-rekening-sekolah").modal("show");

    var id_update = $(this).attr("data-id");
    rekening_sekolah_status.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_rekening_sekolah";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        rekening_sekolah_status.find(".edit-status").val(resp.is_active).trigger("change");
        rekening_sekolah_status.find("input[name='form[kode_bank]']").val(resp.kode_bank);
        rekening_sekolah_status.find("input[name='form[nama_bank]']").val(resp.nama_bank);
        rekening_sekolah_status.find("input[name='form[atas_nama]']").val(resp.atas_nama);
        rekening_sekolah_status.find(".loading-gif-image").addClass("hidden");
        rekening_sekolah_status.find(".after-loading").removeClass("hidden");
        rekening_sekolah_status.find("div.edit-status").addClass('open');
        $("#modal-status-rekening-sekolah .modal-title").html("Edit Status : " + resp.atas_nama);
    });
});
$(".datatable-rekening-sekolah tbody, #modal-detail-rekening-sekolah").on("click", ".edit-rekening-sekolah", function() {
    $("#modal-edit-rekening-sekolah .modal-title").html("Edit Rekening Sekolah : Nama Rekening Sekolah");
    rekening_sekolah_edit.find(".loading-gif-image").removeClass("hidden");
    rekening_sekolah_edit.find(".after-loading").addClass("hidden");
    $("#modal-edit-rekening-sekolah").modal("show");

    var id_update = $(this).attr("data-id");
    rekening_sekolah_edit.find(".id_hidden").val(id_update);
    
    pagename = "/keuangan/ajax_rekening_sekolah";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        rekening_sekolah_edit.find(".dropdown-bank").val(resp.kode_bank).trigger("change");
        rekening_sekolah_edit.find("input[name='form[no_rek]']").val(resp.no_rek);
        rekening_sekolah_edit.find("input[name='form[atas_nama]']").val(resp.atas_nama);
        rekening_sekolah_edit.find("textarea[name='form[uraian]']").val(resp.uraian);
        rekening_sekolah_edit.find(".edit-status").val(resp.is_active).trigger("change");
        rekening_sekolah_edit.find(".loading-gif-image").addClass("hidden");
        rekening_sekolah_edit.find(".after-loading").removeClass("hidden");
        rekening_sekolah_edit.find("input[name='form[no_rek]']").focus();
        $("#modal-edit-rekening-sekolah .modal-title").html("Edit Rekening Sekolah : " + resp.atas_nama);
    });
});
rekening_sekolah_baru.find("select[name='form[kode_bank]']").change(function(){
    rekening_sekolah_baru.find("input[name='form[nama_bank]']").val($("option:selected", this).attr("nama-bank"));
})
rekening_sekolah_edit.find("select[name='form[kode_bank]']").change(function(){
    rekening_sekolah_edit.find("input[name='form[nama_bank]']").val($("option:selected", this).attr("nama-bank"));
})
$("#modal-tambah-rekening-sekolah").on('show.bs.modal', function () {
    rekening_sekolah_baru.find("input[name='form[no_rek]'], input[name='form[atas_nama]'], textarea[name='form[uraian]']").val("");
    rekening_sekolah_baru.find("select[name='form[kode_bank]']").val("").trigger("change");
    $("#modal-tambah-rekening-sekolah").on('shown.bs.modal', function () {
        rekening_sekolah_baru.find("input[name='form[no_rek]']").focus();
    });
});
function detail_data_rekening_sekolah(id_update){
    $("#modal-detail-rekening-sekolah .modal-title").html("Detail Rekening Sekolah : Nama Rekening Sekolah");
    rekening_sekolah_detail.find(".loading-gif-image").removeClass("hidden");
    rekening_sekolah_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-rekening-sekolah").modal("show");
    pagename = "/keuangan/ajax_rekening_sekolah";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        rekening_sekolah_detail.find(".status-rekening-sekolah").html(is_active);
        rekening_sekolah_detail.find(".kode_bank").text(resp.kode_bank);
        rekening_sekolah_detail.find(".nama_bank").text(resp.nama_bank);
        rekening_sekolah_detail.find(".no_rek").text(resp.no_rek);
        rekening_sekolah_detail.find(".atas_nama").text(resp.atas_nama);
        rekening_sekolah_detail.find(".keterangan_rekening").text(resp.uraian);
        if(hak_akses == false){
            rekening_sekolah_detail.find(".edit-rekening-sekolah, .status-rekening-sekolah").addClass("disabled");
        } else {
            rekening_sekolah_detail.find(".edit-rekening-sekolah, .status-rekening-sekolah").removeClass("disabled");
            rekening_sekolah_detail.find(".edit-rekening-sekolah, .status-rekening-sekolah").attr("data-id", resp.id);
        }
        rekening_sekolah_detail.find(".tgl_insert_rekening").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        rekening_sekolah_detail.find(".tgl_last_update_rekening").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        rekening_sekolah_detail.find(".tgl_insert_rekening").prepend(tgl_insert);
        rekening_sekolah_detail.find(".tgl_last_update_rekening").prepend(tgl_last_update);

        rekening_sekolah_detail.find(".loading-gif-image").addClass("hidden");
        rekening_sekolah_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-rekening-sekolah .modal-title").html("Detail Rekening Sekolah : " + resp.atas_nama);
    });
}
// END REKENING SEKOLAH TAGIHAN
// START PSB PERIODE
$(".datatable-periode-psb tbody, .datatable-pengumuman tbody, #modal-detail-pengumuman").on("click", ".detail-periode-psb", function() {
    var id_update = $(this).attr("data-id");
    detail_data_periode_psb(id_update);
});
$(".datatable-periode-psb tbody, #modal-detail-periode-psb").on("click", ".status-periode-psb", function() {
    $("#modal-status-periode-psb .modal-title").html("Edit Status : Nama Periode Pendaftaran");
    periode_psb_status.find(".loading-gif-image").removeClass("hidden");
    periode_psb_status.find(".after-loading").addClass("hidden");
    $("#modal-status-periode-psb").modal("show");

    var id_update = $(this).attr("data-id");
    periode_psb_status.find(".id_hidden").val(id_update);
    
    pagename = "/psb/ajax_periode_psb";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        periode_psb_status.find("input[name='form[nama]']").val(resp.nama);
        periode_psb_status.find(".edit-status").val(resp.is_active).trigger("change");
        periode_psb_status.find(".loading-gif-image").addClass("hidden");
        periode_psb_status.find(".after-loading").removeClass("hidden");
        periode_psb_status.find("div.edit-status").addClass('open');
        $("#modal-status-periode-psb .modal-title").html("Edit Status : " + resp.nama);
    });
});
$(".datatable-periode-psb tbody, #modal-detail-periode-psb").on("click", ".edit-periode-psb", function() {
    periode_psb_repeater_syarat_load = false;
    periode_psb_repeater_nilai_load = false;
    $("#modal-edit-periode-psb .modal-title").html("Edit Periode Pendaftaran : Nama Periode Pendaftaran");
    periode_psb_edit.find(".loading-gif-image").removeClass("hidden");
    periode_psb_edit.find(".after-loading").addClass("hidden");
    periode_psb_edit.find(".pengecekan-syarat-ketentuan, .pengecekan-nilai, .pengecekan-kuota").prop("checked", false).trigger("change");
    periode_psb_edit.find(".mt-repeater-delete").click();
    periode_psb_edit.find(".dropdown-required").val("").select2();
    $("#modal-edit-periode-psb").modal("show");

    var id_update = $(this).attr("data-id");
    periode_psb_edit.find(".id_hidden").val(id_update);
    
    pagename = "/psb/ajax_periode_psb";
    GetDataById(id_update, function(resp) {
        var resp = resp.Data[0];
        periode_psb_edit.find(".edit-status").val(resp.is_active).trigger("change");
        periode_psb_edit.find("input[name='form[nama]']").val(resp.nama);
        periode_psb_edit.find("textarea[name='form[catatan]']").val(resp.catatan);
        if(resp.required == "" || resp.required == null){

        } else {
            var data_required = resp.required.split(',')
            var output_data_required = new Array();
            for (var index_n_required in data_required)
            {
                output_data_required.push(data_required[index_n_required]);
            }
            periode_psb_edit.find(".dropdown-required").val(output_data_required).trigger('change');
        }
        periode_psb_edit.find(".dropdown-required").val(output_data_required).trigger('change');
        setTimeout(function(){
            if(resp.is_syarat_ketentuan == 1){
                periode_psb_repeater_syarat_load = true;
                periode_psb_edit.find(".pengecekan-syarat-ketentuan").prop("checked", true).trigger("change");
                var syarat_isi = resp.syarat;
                $.each(syarat_isi,function(i) {
                    periode_psb_edit.find(".btnTambahSyaratKetentuan").click();
                    periode_psb_edit.find("input[name='form[syarat]["+i+"][syarat]']").val(syarat_isi[i]);
                });
                periode_psb_edit.find(".mt-repeater-item-syarat-ketentuan:last-child .mt-repeater-delete").click();
            } else {
                periode_psb_repeater_syarat_load = true;
                periode_psb_edit.find(".pengecekan-syarat-ketentuan").prop("checked", false).trigger("change");
            }
            if(resp.is_nilai == 1){
                periode_psb_repeater_nilai_load = true;
                periode_psb_edit.find(".pengecekan-nilai").prop("checked", true).trigger("change");
                var nilai_isi = resp.nilai;
                $.each(nilai_isi,function(i) {
                    periode_psb_edit.find(".btnTambahMapel").click();
                    periode_psb_edit.find("input[name='form[nilai]["+i+"][nilai]']").val(nilai_isi[i]);
                });
                periode_psb_edit.find(".mt-repeater-item-mapel:last-child .mt-repeater-delete").click();
            } else {
                periode_psb_repeater_nilai_load = true;
                periode_psb_edit.find(".pengecekan-nilai").prop("checked", false).trigger("change");
            }
        }, 250);
        if(resp.is_kuota == 1){
            periode_psb_edit.find(".pengecekan-kuota").prop("checked", true).trigger("change");
            periode_psb_edit.find("input[name='form[kuota]']").val(resp.kuota);
        } else {
            periode_psb_edit.find(".pengecekan-kuota").prop("checked", false).trigger("change");
        }
        periode_psb_edit.find('.view-start').datepicker('setDate', moment(resp.tgl_awal, "YYYY-MM-DD").format("DD MMM YYYY"));
        periode_psb_edit.find('.view-end').datepicker('setDate', moment(resp.tgl_akhir, "YYYY-MM-DD").format("DD MMM YYYY"));
        periode_psb_edit.find(".loading-gif-image").addClass("hidden");
        periode_psb_edit.find(".after-loading").removeClass("hidden");
        periode_psb_edit.find("input[name='form[nama]']").focus();
        $("#modal-edit-periode-psb .modal-title").html("Edit Periode Pendaftaran : " + resp.nama);
    });
});
function tambah_data_periode_psb(){
    var date_now_psb = new Date(); var bulan_psb = date_now_psb.getMonth()+1; var tgl_psb = date_now_psb.getDate(); var date_now_psb_output = date_now_psb.getFullYear() + '/' + (bulan_psb<10 ? '0' : '') + bulan_psb + '/' + (tgl_psb<10 ? '0' : '') + tgl_psb;
    periode_psb_baru.find('.view-start').datepicker('setDate', moment(date_now_psb_output, "YYYY-MM-DD").format("DD MMM YYYY"));
    periode_psb_baru.find('.view-end').datepicker('setDate', moment(date_now_psb_output, "YYYY-MM-DD").add(1, 'months').format("DD MMM YYYY"));
    periode_psb_baru.find("input[name='form[nama]'], input[name='form[kuota]'], input[name='form[required]'], textarea[name='form[catatan]']").val("");
    periode_psb_baru.find(".select-seleksi").val("1").trigger("change");
    periode_psb_baru.find(".mt-repeater-delete").click();
    periode_psb_baru.find(".dropdown-required").val("").select2();
    periode_psb_baru.find(".pengecekan-syarat-ketentuan").prop("checked", false).trigger("change");
    periode_psb_baru.find(".pengecekan-nilai").prop("checked", false).trigger("change");
    periode_psb_baru.find(".pengecekan-kuota").prop("checked", false).trigger("change");
    $("#modal-tambah-periode-psb").on('shown.bs.modal', function () {
        periode_psb_baru.find("input[name='form[nama]']").focus();
    });
}
periode_psb_baru.find(".pengecekan-nilai").change(function() {
    if($(this).is(":checked")) {
        if(periode_psb_baru.find(".mt-repeater-item-mapel").size() == 0){
            periode_psb_baru.find(".btnTambahMapel").click();
        }
        periode_psb_baru.find("input[name='form[is_nilai]']").val(1);
        periode_psb_baru.find(".mt-repeater-psb-nilai").collapse("show");
        periode_psb_baru.find(".nama_mapel").focus();
    } else {
        periode_psb_baru.find(".select-seleksi").val("1").trigger("change");
        periode_psb_baru.find("input[name='form[is_nilai]']").val(0);
        periode_psb_baru.find(".mt-repeater-psb-nilai").collapse("hide");
    }
});
periode_psb_baru.find(".pengecekan-syarat-ketentuan").change(function() {
    if($(this).is(":checked")) {
        if(periode_psb_baru.find(".mt-repeater-item-syarat-ketentuan").size() == 0){
            periode_psb_baru.find(".btnTambahSyaratKetentuan").click();
        }
        periode_psb_baru.find("input[name='form[is_syarat_ketentuan]']").val(1);
        periode_psb_baru.find(".mt-repeater-syarat-ketentuan").collapse("show");
        periode_psb_baru.find(".syarat").focus();
    } else {
        periode_psb_baru.find("input[name='form[is_syarat_ketentuan]']").val(0);
        periode_psb_baru.find(".mt-repeater-syarat-ketentuan").collapse("hide");
    }
});
periode_psb_baru.find(".pengecekan-kuota").change(function() {
    if($(this).is(":checked")) {
        periode_psb_baru.find("input[name='form[is_kuota]']").val(1);
        periode_psb_baru.find(".div-kuota-collapse").collapse("show");
        periode_psb_baru.find(".kuota-input").focus();
    } else {
        periode_psb_baru.find("input[name='form[is_kuota]']").val(0);
        periode_psb_baru.find(".div-kuota-collapse").collapse("hide");
    }
});
periode_psb_baru.find(".dropdown-required").change(function() {
    periode_psb_baru.find("input[name='form[required]']").val($(this).val());
});
// batas tambah dan edit
periode_psb_edit.find(".pengecekan-nilai").change(function() {
    if(periode_psb_repeater_nilai_load == true){
        if($(this).is(":checked")) {
            if(periode_psb_edit.find(".mt-repeater-item-mapel").size() == 0){
                periode_psb_edit.find(".btnTambahMapel").click();
            }
            periode_psb_edit.find("input[name='form[is_nilai]']").val(1);
            periode_psb_edit.find(".mt-repeater-psb-nilai").collapse("show");
            periode_psb_edit.find(".nama_mapel").focus();
        } else {
            periode_psb_edit.find(".select-seleksi").val("1").trigger("change");
            periode_psb_edit.find("input[name='form[is_nilai]']").val(0);
            periode_psb_edit.find(".mt-repeater-psb-nilai").collapse("hide");
        }
    }
});
periode_psb_edit.find(".pengecekan-syarat-ketentuan").change(function() {
    if(periode_psb_repeater_syarat_load == true){
        if($(this).is(":checked")) {
            if(periode_psb_edit.find(".mt-repeater-item-syarat-ketentuan").size() == 0){
                periode_psb_edit.find(".btnTambahSyaratKetentuan").click();
            }
            periode_psb_edit.find("input[name='form[is_syarat_ketentuan]']").val(1);
            periode_psb_edit.find(".mt-repeater-syarat-ketentuan").collapse("show");
            periode_psb_edit.find(".syarat").focus();
        } else {
            periode_psb_edit.find("input[name='form[is_syarat_ketentuan]']").val(0);
            periode_psb_edit.find(".mt-repeater-syarat-ketentuan").collapse("hide");
        }
    }
});
periode_psb_edit.find(".pengecekan-kuota").change(function() {
    if($(this).is(":checked")) {
        periode_psb_edit.find("input[name='form[is_kuota]']").val(1);
        periode_psb_edit.find(".div-kuota-collapse").collapse("show");
        periode_psb_edit.find(".kuota-input").focus();
    } else {
        periode_psb_edit.find("input[name='form[is_kuota]']").val(0);
        periode_psb_edit.find(".div-kuota-collapse").collapse("hide");
    }
});
periode_psb_edit.find(".mt-repeater-item-syarat-ketentuan .mt-repeater-delete").click(function(){
    if(periode_psb_repeater_syarat_load == true){
        setTimeout(function(){
            if(periode_psb_edit.find(".mt-repeater-item-syarat-ketentuan").size() == 0){
                periode_psb_edit.find(".btnTambahSyaratKetentuan").click();
            }
        }, 500);
    }
});
periode_psb_edit.find(".mt-repeater-item-mapel .mt-repeater-delete").click(function(){
    if(periode_psb_repeater_nilai_load == true){
        setTimeout(function(){
            if(periode_psb_edit.find(".mt-repeater-item-mapel").size() == 0){
                periode_psb_edit.find(".btnTambahMapel").click();
            }
        }, 500);
    }
});
periode_psb_edit.find(".dropdown-required").change(function() {
    periode_psb_edit.find("input[name='form[required]']").val($(this).val());
});
function detail_data_periode_psb(id_update){
    $("#modal-detail-periode-psb .modal-title").html("Detail Mata Pelajaran : Nama Mata Pelajaran");
    periode_psb_detail.find(".loading-gif-image").removeClass("hidden");
    periode_psb_detail.find(".after-loading").addClass("hidden");
    $("#modal-detail-periode-psb").modal("show");
    pagename = "/psb/ajax_periode_psb";
    GetDataById(id_update, function(resp) {
        hak_akses = resp.hak_akses;
        var resp = resp.Data[0];
        if(resp.is_active == 1){
            is_active = "<span class='fa fa-check-circle'></span> <b>Aktif</b>";
        } else {
            is_active = "<span class='fa fa-times-circle'></span> <b>Tidak Aktif</b>"
        }
        periode_psb_detail.find(".status-periode-psb").html(is_active);
        periode_psb_detail.find(".nama_periode").text(resp.nama);
        periode_psb_detail.find(".periode_pendaftaran").text(moment(resp.tgl_awal, "YYYY-MM-DD").format("DD MMM YYYY")+" sampai "+moment(resp.tgl_akhir, "YYYY-MM-DD").format("DD MMM YYYY"));
        if(resp.is_syarat_ketentuan == 1){
            var syarat_isi = resp.syarat;
            var table_syarat = "";
            var nomor_each_syarat = 1;
            $.each(syarat_isi,function(i) {
                table_syarat = table_syarat+"<tr><td class='text-center'>"+nomor_each_syarat+"</td><td>"+syarat_isi[i]+"</td></tr>";
                nomor_each_syarat++;
            });
        } else {
            table_syarat = "<tr><td class='text-center' colspan='2'>Tidak ada Syarat Pendaftaran</td></tr>";
        }
        periode_psb_detail.find(".list_syarat tbody").html(table_syarat);
        if(resp.is_nilai == 1){
            var nilai_isi = resp.nilai;
            var table_nilai = "";
            var nomor_each_nilai = 1;
            $.each(nilai_isi,function(i) {
                table_nilai = table_nilai+"<tr><td class='text-center'>"+nomor_each_nilai+"</td><td class='text-center'>"+nilai_isi[i]+"</td></tr>";
                nomor_each_nilai++;
            });
        } else {
            table_nilai = "<tr><td class='text-center' colspan='2'>Tidak ada Mata Pelajaran</td></tr>";
        }
        periode_psb_detail.find(".list_nilai tbody").html(table_nilai);
        if(resp.is_kuota == 1){
            periode_psb_detail.find(".kuota_siswa").text(resp.kuota+" siswa");
        } else {
            periode_psb_detail.find(".kuota_siswa").text("-");
        }
        if(hak_akses == false){
            periode_psb_detail.find(".edit-periode-psb, .status-periode-psb").addClass("disabled");
        } else {
            periode_psb_detail.find(".edit-periode-psb, .status-periode-psb").removeClass("disabled");
            periode_psb_detail.find(".edit-periode-psb, .status-periode-psb").attr("data-id", resp.id);
        }
        if(resp.catatan == null || resp.catatan == ""){
            periode_psb_detail.find(".catatan_psb").html("-");
        } else {
            periode_psb_detail.find(".catatan_psb").html(resp.catatan);
        }
        if(resp.required == null || resp.required == ""){
            periode_psb_detail.find(".required_psb").html("-");
        } else {
            var data_required = resp.required.split(',')
            var output_data_required = "";
            for (var index_n_required in data_required)
            {
                if(data_required[index_n_required] == "nisn"){
                    output_data_required += "NISN Siswa, ";
                }
                if(data_required[index_n_required] == "nama_panggilan_siswa"){
                    output_data_required += "Nama Panggilan Siswa, ";
                }
                if(data_required[index_n_required] == "status_anak_yatim"){
                    output_data_required += "Status, ";
                }
                if(data_required[index_n_required] == "agama_siswa"){
                    output_data_required += "Agama Siswa, ";
                }
                if(data_required[index_n_required] == "email"){
                    output_data_required += "Email Siswa, ";
                }
                if(data_required[index_n_required] == "telepon_rumah_siswa"){
                    output_data_required += "Telepon Rumah Siswa, ";
                }
                if(data_required[index_n_required] == "no_hp"){
                    output_data_required += "HP Siswa, ";
                }
                if(data_required[index_n_required] == "alamat"){
                    output_data_required += "Alamat Siswa, ";
                }
                if(data_required[index_n_required] == "id_provinsi"){
                    output_data_required += "Provinsi(Alamat) Siswa, ";
                }
                if(data_required[index_n_required] == "id_kota"){
                    output_data_required += "Kota/Kabupaten(Alamat) Siswa, ";
                }
                if(data_required[index_n_required] == "id_kecamatan"){
                    output_data_required += "Kecamatan(Alamat) Siswa, ";
                }
                if(data_required[index_n_required] == "tinggal_bersama_siswa"){
                    output_data_required += "Tinggal Bersama Siswa, ";
                }
                if(data_required[index_n_required] == "anak_ke_siswa"){
                    output_data_required += "Anak Ke Siswa, ";
                }
                if(data_required[index_n_required] == "banyak_saudara_siswa"){
                    output_data_required += "Banyak Saudara Siswa, ";
                }
                if(data_required[index_n_required] == "tanggal_lahir_siswa"){
                    output_data_required += "Tanggal Lahir Siswa, ";
                }
                if(data_required[index_n_required] == "id_provinsi_siswa_lahir"){
                    output_data_required += "Provinsi(Lahir) Siswa, ";
                }
                if(data_required[index_n_required] == "id_kota_siswa_lahir"){
                    output_data_required += "Kota/Kabupaten(Lahir) Siswa, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_siswa_lahir"){
                    output_data_required += "Kecamatan(Lahir) Siswa, ";
                }
                if(data_required[index_n_required] == "asal_sekolah_sd_siswa"){
                    output_data_required += "Asal Sekolah SD Siswa, ";
                }
                if(data_required[index_n_required] == "asal_sekolah_smp_siswa"){
                    output_data_required += "Asal Sekolah SMP Siswa, ";
                }
                if(data_required[index_n_required] == "riwayat_penyakit"){
                    output_data_required += "Riwayat Penyakit Siswa, ";
                }
                if(data_required[index_n_required] == "uang_saku"){
                    output_data_required += "Uang Saku Siswa, ";
                }
                if(data_required[index_n_required] == "nama_lengkap_ayah"){
                    output_data_required += "Nama Lengkap Ayah, ";
                }
                if(data_required[index_n_required] == "agama_ayah"){
                    output_data_required += "Agama Ayah, ";
                }
                if(data_required[index_n_required] == "email_ayah"){
                    output_data_required += "Email Ayah, ";
                }
                if(data_required[index_n_required] == "telepon_rumah_ayah"){
                    output_data_required += "Telepon Rumah Ayah, ";
                }
                if(data_required[index_n_required] == "no_hp_ayah"){
                    output_data_required += "No HP Ayah, ";
                }
                if(data_required[index_n_required] == "alamat_ayah"){
                    output_data_required += "Alamat Ayah, ";
                }
                if(data_required[index_n_required] == "id_provinsi_ayah"){
                    output_data_required += "Provinsi(Alamat) Ayah, ";
                }
                if(data_required[index_n_required] == "id_kota_ayah"){
                    output_data_required += "Kota/Kabupaten(Alamat) Ayah, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_ayah"){
                    output_data_required += "Kecamatan(Alamat) Ayah, ";
                }
                if(data_required[index_n_required] == "tanggal_lahir_ayah"){
                    output_data_required += "Tanggal Lahir Ayah, ";
                }
                if(data_required[index_n_required] == "id_provinsi_ayah_lahir"){
                    output_data_required += "Provinsi(Lahir) Ayah, ";
                }
                if(data_required[index_n_required] == "id_kota_ayah_lahir"){
                    output_data_required += "Kota/Kabupaten(Lahir) Ayah, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_ayah_lahir"){
                    output_data_required += "Kecamatan(Lahir) Ayah, ";
                }
                if(data_required[index_n_required] == "pendidikan_terakhir_ayah"){
                    output_data_required += "Pendidikan Terakhir Ayah, ";
                }
                if(data_required[index_n_required] == "pekerjaan_ayah"){
                    output_data_required += "Pekerjaan Ayah, ";
                }
                if(data_required[index_n_required] == "penghasilan_ayah"){
                    output_data_required += "Penghasilan Ayah, ";
                }
                if(data_required[index_n_required] == "nama_lengkap_ibu"){
                    output_data_required += "Nama Lengkap Ibu, ";
                }
                if(data_required[index_n_required] == "agama_ibu"){
                    output_data_required += "Agama Ibu, ";
                }
                if(data_required[index_n_required] == "email_ibu"){
                    output_data_required += "Email Ibu, ";
                }
                if(data_required[index_n_required] == "telepon_rumah_ibu"){
                    output_data_required += "Telepon Rumah Ibu, ";
                }
                if(data_required[index_n_required] == "no_hp_ibu"){
                    output_data_required += "No HP Ibu, ";
                }
                if(data_required[index_n_required] == "alamat_ibu"){
                    output_data_required += "Alamat Ibu, ";
                }
                if(data_required[index_n_required] == "id_provinsi_ibu"){
                    output_data_required += "Provinsi(Alamat) Ibu, ";
                }
                if(data_required[index_n_required] == "id_kota_ibu"){
                    output_data_required += "Kota/Kabupaten(Alamat) Ibu, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_ibu"){
                    output_data_required += "Kecamatan(Alamat) Ibu, ";
                }
                if(data_required[index_n_required] == "tanggal_lahir_ibu"){
                    output_data_required += "Tanggal Lahir Ibu, ";
                }
                if(data_required[index_n_required] == "id_provinsi_ibu_lahir"){
                    output_data_required += "Provinsi(Lahir) Ibu, ";
                }
                if(data_required[index_n_required] == "id_kota_ibu_lahir"){
                    output_data_required += "Kota/Kabupaten(Lahir) Ibu, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_ibu_lahir"){
                    output_data_required += "Kecamatan(Lahir) Ibu, ";
                }
                if(data_required[index_n_required] == "pendidikan_terakhir_ibu"){
                    output_data_required += "Pendidikan Terakhir Ibu, ";
                }
                if(data_required[index_n_required] == "pekerjaan_ibu"){
                    output_data_required += "Pekerjaan Ibu, ";
                }
                if(data_required[index_n_required] == "penghasilan_ibu"){
                    output_data_required += "Penghasilan Ibu, ";
                }
                if(data_required[index_n_required] == "nama_lengkap_wali"){
                    output_data_required += "Nama Lengkap Wali, ";
                }
                if(data_required[index_n_required] == "agama_wali"){
                    output_data_required += "Agama Wali, ";
                }
                if(data_required[index_n_required] == "email_wali"){
                    output_data_required += "Email Wali, ";
                }
                if(data_required[index_n_required] == "telepon_rumah_wali"){
                    output_data_required += "Telepon Rumah Wali, ";
                }
                if(data_required[index_n_required] == "no_hp_wali"){
                    output_data_required += "No HP Wali, ";
                }
                if(data_required[index_n_required] == "alamat_wali"){
                    output_data_required += "Alamat Wali, ";
                }
                if(data_required[index_n_required] == "id_provinsi_wali"){
                    output_data_required += "Provinsi(Alamat) Wali, ";
                }
                if(data_required[index_n_required] == "id_kota_wali"){
                    output_data_required += "Kota/Kabupaten(Alamat) Wali, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_wali"){
                    output_data_required += "Kecamatan(Alamat) Wali, ";
                }
                if(data_required[index_n_required] == "tanggal_lahir_wali"){
                    output_data_required += "Tanggal Lahir Wali, ";
                }
                if(data_required[index_n_required] == "id_provinsi_wali_lahir"){
                    output_data_required += "Provinsi(Lahir) Wali, ";
                }
                if(data_required[index_n_required] == "id_kota_wali_lahir"){
                    output_data_required += "Kota/Kabupaten(Lahir) Wali, ";
                }
                if(data_required[index_n_required] == "id_kecamatan_wali_lahir"){
                    output_data_required += "Kecamatan(Lahir) Wali, ";
                }
                if(data_required[index_n_required] == "pendidikan_terakhir_wali"){
                    output_data_required += "Pendidikan Terakhir Wali, ";
                }
                if(data_required[index_n_required] == "pekerjaan_wali"){
                    output_data_required += "Pekerjaan Wali, ";
                }
                if(data_required[index_n_required] == "penghasilan_wali"){
                    output_data_required += "Penghasilan Wali, ";
                }
            }
            periode_psb_detail.find(".required_psb").html(output_data_required.slice(0,-2));
        }
        periode_psb_detail.find(".tgl_insert_periode_psb").html("<a class='detail-karyawan' data-id='"+resp.karyawan_insert+"'>("+resp.karyawan_insert_nama+")</a>");
        periode_psb_detail.find(".tgl_last_update_periode_psb").html("<a class='detail-karyawan' data-id='"+resp.karyawan_last_update+"'>("+resp.karyawan_last_update_nama+")</a>");
        tgl_insert = moment(resp.tgl_insert).format('DD MMM YYYY HH:mm ');
        tgl_last_update = moment(resp.tgl_last_update).format('DD MMM YYYY HH:mm ');
        periode_psb_detail.find(".tgl_insert_periode_psb").prepend(tgl_insert);
        periode_psb_detail.find(".tgl_last_update_periode_psb").prepend(tgl_last_update);


        periode_psb_detail.find(".loading-gif-image").addClass("hidden");
        periode_psb_detail.find(".after-loading").removeClass("hidden");
        $("#modal-detail-periode-psb .modal-title").html("Detail Periode Pendaftaran : " + resp.nama);
    });
}
// END PSB PERIODE
// END SHOW MODAL --------------------------------------------------------------------