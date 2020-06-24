<!DOCTYPE html>
    <html lang="en">
        <head>        
            <!-- META SECTION -->
            <title>Joli Admin - Responsive Bootstrap Admin Template</title>            
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            
            <link rel="icon" href="favicon.ico" type="image/x-icon" />
            <!-- END META SECTION -->
                            
            <!-- CSS INCLUDE -->        
            <link rel="stylesheet" type="text/css" id="theme" href="<?=base_url()?>assets/joli/css/theme-default.css"/>
            <!-- EOF CSS INCLUDE -->                                    
        </head>
    <body>

        <ul class="x-navigation x-navigation-horizontal x-navigation-panel x-navigation-custom">
            <!-- TOGGLE NAVIGATION -->
            <li class="xn-icon-button">
                <a href="#" class="x-navigation-minimize"><span class="fa fa-outdent"></span></a>
            </li>
            <li class="xn-openable data-sekolah-header-menu">
                <a style="font-size: 20px;">Pondok Pesantren Al Islam</a>
            </li>
            <!-- END TOGGLE NAVIGATION -->
            <!-- SEARCH -->
            <!-- END SEARCH -->
            <!-- SIGN OUT -->
            <li class="xn-icon-button pull-right">
                
                <?php 
                if ($this->session->userdata('status') == 'login') {
                    ?>
                    <a href="#" data-toggle="modal" data-target="#mb-signout" class="mb-control" data-box="#mb-signout"><span class="fa fa-sign-out"></span></a>
                    <?php
                }else{
                    ?>
                    <a href="<?php echo base_url('login') ?>" class="mb-control" data-box="#mb-signout"><span class="fa fa-sign-in"></span></a>
                    <?php
                }                         
                ?>
            </li> 
            <!-- END SIGN OUT -->
            <!-- MESSAGES -->

            <!-- END MESSAGES -->
            <!-- TASKS -->

            <!-- END TASKS -->
        </ul>

        <!-- MESSAGE BOX-->
        <div class="message-box animated fadeIn" data-sound="alert" id="mb-signout">
            <div class="mb-container">
                <div class="mb-middle">
                    <div class="mb-title"><span class="fa fa-sign-out"></span><strong>Keluar</strong> ?</div>
                    <div class="mb-content">
                        <p>Apakah anda yakin akan keluar?</p>
                    </div>
                    <div class="mb-footer">
                        <div class="pull-right">
                            <a href="<?php echo base_url('logout') ?>" class="btn btn-success btn-lg">Ya</a>
                            <button class="btn btn-default btn-lg mb-control-close"  data-dismiss="modal">Tidak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END MESSAGE BOX-->
        <script>
            SetHeight();
        </script>