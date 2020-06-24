<!DOCTYPE html>
<html lang="en">
    <head>        
        <!-- META SECTION -->
        <title>SPP - Pondok Pesantren Al Islam</title>            
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="icon" href="<?=base_url()?>assets/img/logo_spp.png" type="image/x-icon" />
        <link href="https://cdn.jsdelivr.net/npm/select2@4.0.12/dist/css/select2.min.css" rel="stylesheet" />
      	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- END META SECTION -->
        
        <!-- CSS INCLUDE -->        
        <link rel="stylesheet" type="text/css" id="theme" href="<?=base_url()?>assets/joli/css/theme-default.css"/>
        <!-- EOF CSS INCLUDE -->                                    
    </head>
    <body>
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
                <div class="page-content" style="height: 100%;">
                    
                    <!-- START X-NAVIGATION VERTICAL -->
                    <?php
                        $this->load->view('header');
                    ?>
                    <!-- END X-NAVIGATION VERTICAL -->                     

                    <!-- START BREADCRUMB -->
                    <ul class="breadcrumb">
                        <li><a href="#">Home</a></li>                    
                        <li class="active">SPP</li>
                    </ul>
                    <!-- END BREADCRUMB -->                       
                    
                    <!-- PAGE CONTENT WRAPPER -->
                    <div class="page-content-wrap">
                        
                        <!-- START WIDGETS -->                    
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="page-inline">
                                    <h1><i class="fa fa-money"></i> <?php if ($this->session->userdata('status')!='login') {
                                        echo 'info Spp';
                                    }else{
                                        echo "Pembayaran Spp";
                                    } ?></h1>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <div class="form-inline">
                                            <?php
                                            if ($this->session->userdata('status')!='login') {
                                            ?>
                                            <div class="form-group col-md-6">
                                                <label class=""><b>Nama Santri</b></label>
                                                <select style="width:100%;" class="form-control metode-bayar selectSantri" id="id">
                                                    <option value="">Pilih Nama Santri</option>
                                                    <?php foreach ($santri as $sans) {
                                                        ?>
                                                        <option value="<?php echo $sans->id_santri;?>"><?php echo $sans->nama;?></option>
                                                 <?php   } ?>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class=""><b>Tahun</b></label>
                                                <select style="width:100%;" id="tahun" class="form-control select metode-bayar">
                                                    <option value="">Pilih Tahun</option>
                                                    <?php 
                                                        for($i=date('Y');$i>=2019;$i--){
                                                            ?>
                                                            <option value="<?php echo $i; ?>" id="filterTahun"><?php echo $i; ?></option>
                                                    <?php    }
                                                    ?>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-12">
                                                <button class="btn btn-info col-md-12" style="margin-top: 10px;" onclick="lihatData()">
                                                   Submit
                                               </button>
                                            </div>
                                            <?php
                                            }else{
                                            ?>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label class=""><b>Nama Santri</b></label>
                                                <select style="width:100%;" class="form-control metode-bayar selectSantri" id="id">
                                                    <option value="">Pilih Nama Santri</option>
                                                    <?php foreach ($santri as $sans) {
                                                        ?>
                                                        <option value="<?php echo $sans->id_santri;?>"><?php echo $sans->nama;?></option>
                                                 <?php   } ?>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label class=""><b>Tahun</b></label>
                                                <select style="width:100%;" id="tahun" class="form-control select metode-bayar">
                                                    <option value="">Pilih Tahun</option>
                                                    <?php 
                                                        for($i=date('Y');$i>=2019;$i--){
                                                            ?>
                                                            <option value="<?php echo $i; ?>" id="filterTahun"><?php echo $i; ?></option>
                                                    <?php    }
                                                    ?>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4 col-sm-12">
                                                <label class=""><b>Status Santri</b></label>
                                                <select style="width:100%;" id="tagihan" class="form-control select metode-bayar">
                                                    <option value="">Pilih Status Santri</option>
                                                    <option value="50000">Magang</option>
                                                    <option value="200000">Menetap</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-md-12">
                                                <button class="btn btn-info col-md-12" style="margin-top: 10px;" onclick="lihatData()">
                                                   Submit
                                               </button>
                                            </div>
                                            <?php
                                            }
                                            ?>
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
                        
                        <!-- START DASHBOARD CHART -->
                        <!-- END DASHBOARD CHART -->
                        
                    </div>
                    <!-- END PAGE CONTENT WRAPPER -->                                
                </div>
            </div>            
            <!-- END PAGE CONTENT -->
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
          $('#id').select2();
            $("ul").click(function(){
                $(this).toggleClass("x-navigation-open");
            })

            function lihatData(){
                if ($('#id').val() != '' && $('#tahun').val() != '') {
                    $.ajax({
                        type:"post",
                        url:"<?php  if ($this->session->userdata('status') == 'login') { echo base_url('index.php/C_spp/GetDataAdmin');}else{ echo base_url('index.php/C_spp/GetData');} ?>",
                        data:"id="+$("#id").val()+"&tahun="+$("#tahun").val()+"&tagihan="+$("#tagihan").val(),
                        cache: false,
                        success: function(msg){
                            $("#tableData").html(msg);
                        }
                    });
                }else{
                    alert('Tahun atau Santri belum terpilih');
                }
            }
        </script>  
    </body>
</html>