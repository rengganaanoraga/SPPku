<!DOCTYPE html>
<html lang="en">
    <head>        
        <!-- META SECTION -->
        <title>Iuran - Pondok Pesantren Al Islam</title>            
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="icon" href="<?=base_url()?>assets/img/logo_spp.png" type="image/x-icon" />
        <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
        <!-- END META SECTION -->
        
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" type="text/css" id="theme" href="<?=base_url()?>assets/joli/css/theme-default.css"/>
        <!-- EOF CSS INCLUDE -->                                    
    </head>
    <body
        <!-- START PAGE CONTAINER -->
        <div class="page-container" >
            
            <!-- START PAGE SIDEBAR -->
            <?php
                if ($this->session->userdata('status') == 'login') {
                    $this->load->view('sidebar-admin');
                }else{
                    $this->load->view('sidebar');
                }
            ?>
            <div class="height-view-data">
                
            <!-- END PAGE SIDEBAR -->
            
            <!-- PAGE CONTENT -->
                <div class="page-content">
                    
                    <!-- START X-NAVIGATION VERTICAL -->
                    <?php
                        $this->load->view('header');
                    ?>
                    <!-- END X-NAVIGATION VERTICAL -->                     

                    <!-- START BREADCRUMB -->
                    <ul class="breadcrumb">
                        <li><a href="#">Home</a></li>                    
                        <li class="active">Iuran</li>
                    </ul>
                    <!-- END BREADCRUMB -->                       
                    
                    <!-- PAGE CONTENT WRAPPER -->
                    <div class="page-content-wrap">

                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            
                            <!-- START WIDGET MESSAGES -->
                            <div class="widget widget-success widget-item-icon">
                                <br>
                                <div class="widget-title">Total Iuran Masuk</div>
                                <br>
                                <div class="widget-int num-count">
                                    Rp.<?php $as = $this->M_iuran->GetSl(); $pl = $this->M_iuran->GetPl(); echo $as->jumlah-$pl->jumlah;?>,-
                                </div>
                            </div>                            
                            <!-- END WIDGET MESSAGES -->
                            
                        </div>

                        <div class="col-md-6 col-xs-12">
                            
                            <!-- START WIDGET MESSAGES -->
                            <div class="widget widget-danger widget-item-icon">
                                <br>
                                <div class="widget-title">Total Iuran Keluar</div>
                                <br>
                                <div class="widget-int num-count">
                                    Rp.<?php $as = $this->M_iuran->GetPl(); if($as->jumlah == null){$as->jumlah = 0;}; echo $as->jumlah?>,-
                                </div>
                            </div>                            
                            <!-- END WIDGET MESSAGES -->
                            
                        </div>
                    </div>
                        
                        <!-- START WIDGETS -->                    
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="page-inline">
                                    <h1><i class="fa fa-list-alt"></i> <?php if ($this->uri->segment(1) == 'admin') {
                                        echo 'Pembayaran Spp';
                                    }else{
                                        echo "Laporan Iuran";
                                    } ?></h1>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="form-inline">
                                            <!-- <div class="col-md-6 col-sm-6"> -->
                                                <div class="form-group col-md-6">
                                                    <label class=""><b>Tahun</b></label>
                                                    <!-- <div class="col-md-9 col-xs-8 text-left"> -->
                                                        <select style="width: 100%" class="form-control  " id="tahun">
                                                            <option value="">Pilih Tahun</option>
                                                            <?php 
                                                            for ($i=date('Y'); $i >= 2019 ; $i--) { 
                                                            ?>
                                                                <option value="<?php echo $i ?>"><?php echo $i ?></option>
                                                            <?php
                                                            }
                                                            ?>
                                                        </select>
                                                    <!-- </div> -->
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label class=""><b>Bulan</b></label>
                                                    <!-- <div class="col-md-9 col-xs-8 text-left"> -->
                                                        <select style="width: 100%" class="form-control metode-bayar selectSantri" id="bulan">
                                                            <option value="">Pilih Bulan</option>
                                                            <?php foreach ($bulan as $bl) {
                                                                ?>
                                                                <option value="<?php echo $bl->nama_bulan;?>"><?php echo $bl->nama_bulan;?></option>
                                                         <?php   } ?>
                                                        </select>
                                                    <!-- </div> -->
                                                </div>
                                                <div class="form-group col-md-12">
                                                    <button class="btn btn-info col-md-12" style="margin-top: 10px;" onclick="lihatData()">
                                                       Submit
                                                   </button>
                                                </div>
                                            <!-- </div> -->
                                            <!-- <div class="col-md-5 col-sm-6 col-md-offset-1"> -->
                                                <!-- <div class="form-group">
                                                    <button class="btn btn-info col-md-12" style="margin-top: 10px;" onclick="lihatData()">
                                                       Submit
                                                   </button>
                                                </div> -->
                                            <!-- </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END WIDGETS -->                    
                        
                       
                        <div class="row">
                            <div class="col-md-12">
                                 <div id="tableData">
                            
                                </div>
                                
                            </div>
                            <div class="col-md-12">
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tambah Data Iuran</h5>
                                      </div>
                                      <div class="modal-body">
                                        <form>
                                          <div class="form-group">
                                              <label class="col-form-label">Jumlah</label>
                                              <input type="number" id="formJumlah" class="form-control" placeholder="jumlah">
                                          </div>
                                          <div class="form-group">
                                              <label class="col-form-label">Deskripsi</label>
                                              <textarea id="formDeskripsi" placeholder="Deskripsi" class="form-control" maxlength="250"> 
                                              </textarea>
                                          </div>
                                          <div class="form-group">
                                              <label class="col-form-label">Status</label>
                                              <select class="form-control" id="formStatus">
                                                  <option value="0">Masuk</option>
                                                  <option value="1">Keluar</option>
                                              </select>
                                          </div>
                                        </form>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                        <button type="button" class="btn btn-primary" onclick="tambahDataIuran()">Tambah Data</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-8">
                                
                                <!-- START SALES BLOCK -->
                                <!-- END SALES BLOCK -->
                                
                            </div>
                            <div class="common-modal modal fade" id="common-Modal1" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-content">
                                    <ul class="list-inline item-details">
                                        <li><a href="http://themifycloud.com/downloads/janux-premium-responsive-bootstrap-admin-dashboard-template/">Admin templates</a></li>
                                        <li><a href="http://themescloud.org">Bootstrap themes</a></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="col-md-4">
                                
                                <!-- START SALES & EVENTS BLOCK -->
                                <!-- END SALES & EVENTS BLOCK -->
                                
                            </div>
                        </div>
                        
                    </div>
                    <!-- END PAGE CONTENT WRAPPER -->                                
                </div>
            </div>            
            <!-- END PAGE CONTENT -->
        </div>

         <div class="modal fade bs-modal-md" id="modalsantri" role="dialog">
            <div class="modal-dialog non-modal-lg set-size-modal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" style="position: absolute;right: 5px;z-index: 99;" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <div class="row">
                            <div class="col-md-3">
                                <h4 class="modal-title">Pilih Santri</h4>
                            </div>
                            <div class="col-md-9">
                                <form id="SetFrmSiswa">
                                    <div class="row">
                                        <div class="col-md-5">
                                        </div>
                                        <div class="col-md-7">
                                            <div class="input-group input-search">
                                                <input type="text" placeholder="Cari Santri" class="form-control kywd" title="Cari Santri"> 
                                                <span class="input-group-btn">
                                                    <button class="btn btn-primary"><i class="fa fa-search button-icon"></i></button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body" style="padding:0px;">
                        <div class="row">
                            <br class="show-br hidden">
                            <input class="form-control text-left" value="Bayu" style="color: black; cursor: pointer;" readonly=""></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- END PAGE CONTAINER -->

        <!-- START PRELOADS -->
        <!-- END PRELOADS -->                  
        
    <!-- START SCRIPTS -->
        <!-- START PLUGINS -->
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/jquery/jquery-ui.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/js/select2.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/bootstrap/bootstrap.min.js"></script>        
        <!-- END PLUGINS -->

        <!-- START THIS PAGE PLUGINS-->        
        <script type='text/javascript' src='<?=base_url()?>assets/joli/js/plugins/icheck/icheck.min.js'></script>        
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/scrolltotop/scrolltopcontrol.js"></script>
        
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/morris/raphael-min.js"></script>     
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/rickshaw/d3.v3.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/rickshaw/rickshaw.min.js"></script>
        <script type='text/javascript' src='<?=base_url()?>assets/joli/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'></script>
        <script type='text/javascript' src='<?=base_url()?>assets/joli/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'></script>                
        <script type='text/javascript' src='<?=base_url()?>assets/joli/js/plugins/bootstrap/bootstrap-datepicker.js'></script>                
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/owl/owl.carousel.min.js"></script>                 
        
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/moment.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/daterangepicker/daterangepicker.js"></script>
        <!-- END THIS PAGE PLUGINS-->        

        <!-- START TEMPLATE -->
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/plugins/datatables/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="<?=base_url()?>assets/joli/js/proses.js"></script>
        <script type="text/javascript">
            SetHeight();
            $("ul").click(function(){
                $(this).toggleClass("x-navigation-open");
            })
            function lihatData(){
                if ($('#tahun').val() != '' && $('#bulan').val() != '') {
                    $.ajax({
                        type:"post",
                        url:"<?php echo base_url('index.php/C_iuran/GetData') ?>",
                        data:"tahun="+$("#tahun").val()+"&bulan="+$("#bulan").val(),
                        cache: false,
                        success: function(msg){
                            $("#tableData").html(msg);
                        }
                    });
                }else{
                    alert('data tahun atau bulan belum terpilih!');
                }
            }
            function tambahDataIuran() {
                $.ajax({
                    type:"post",
                    url:"<?php echo base_url('index.php/C_iuran/AddData'); ?>",
                    data:"bulan="+$('#bulan').val()+"&tahun="+$('#tahun').val()+"&jumlah="+$('#formJumlah').val()+"&deskripsi="+$('#formDeskripsi').val()+"&status="+$('#formStatus').val()+"&jumlah="+$('#formJumlah').val(),
                    cache:false,
                    success: function(msg){
                        alert("Sukses");
                        location.reload();
                    }
                });
            }
        </script>
    </body>
</html>