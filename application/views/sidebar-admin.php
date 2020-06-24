<div class="page-sidebar" >
    <!-- START X-NAVIGATION -->
    <ul class="x-navigation x-navigation-custom" id="kntl">
        <li class="xn-logo">
            <a href="#"><img style="max-height: 32px;max-width: 175px;" src="<?=base_url()?>assets/img/logo.png">SPP-KU</a>
            <a href="#" class="x-navigation-control"></a>
        </li>
        <li class="xn-profile">
            <a href="#" class="profile-mini">
                <img src="<?=base_url()?>assets/img/logopondok.png"/>
            </a>
            <div class="profile">
                <div class="profile-image">
                    <img src="<?=base_url()?>assets/img/logopondok.png"/>
                </div>
                <div class="profile-data">
                    <div class="profile-data-name">Al Islam</div>
                    <div class="profile-data-title">Admin</div>
                </div>
            </div>                                                                        
        </li>
        <li class="xn-title">Navigation</li>
        <li class="<?php if($this->uri->segment(1) == 'spp'){
            echo 'active';
        } ?>">
            <a href="<?php echo base_url('spp') ?>"><span class="fa fa-money"></span> <span class="xn-text">Pembayaran SPP</span></a>                     
        </li>
        <li class="<?php if($this->uri->segment(1) == 'cash'){
            echo 'active';
        } ?>">
            <a href="<?php echo base_url('cash') ?>"><span class="fa fa-dollar"></span> <span class="xn-text">Laporan Cash</span></a>   
        </li>
        
        <li class="<?php if($this->uri->segment(1) == 'iuran'){
            echo 'active';
        } ?>">
            <a href="<?php echo base_url('iuran') ?>"><span class="fa fa-list-alt"></span> <span class="xn-text">Laporan Iuran</span></a>   
        </li>
    </ul>
    <!-- END X-NAVIGATION -->
</div>
<script>
    SetHeight();
</script>