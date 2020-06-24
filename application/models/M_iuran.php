<?php
defined('BASEPATH') OR exit('No direct script acces allowed');
class M_iuran extends CI_Model{
  	
  	public function __construct(){
  		parent::__construct();
  	}

  	public function GetData($where=""){
        $data = $this->db->query("SELECT * FROM tb_bulan");
        /*$ReturnData = ["Data" => $data->result_array()];
        return ($ReturnData);*/
        return $data->result();
   	}

    public function GetPembayaran($bulan, $tahun){
        $data = $this->db->query("SELECT * FROM tb_pembayaran where bulan = '$bulan' and tahun = '$tahun'");
        return $data->result();
    }
    public function AddData($bulan, $tahun, $jumlah, $deskripsi, $status){
        $this->db->query("INSERT INTO tb_pembayaran VALUES(NULL,NULL,NULL,NULL,NOW(),'$bulan', '$tahun', '$jumlah','$status', '$deskripsi')");
    }
    public function GetSl(){
        $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran where status_iuran = '0'");
        return $data->row();
    }
    public function GetPl(){
        $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran where status_iuran = '1'");
        return $data->row();
    }
    public function GetSaldoIuran($bulan, $tahun){
        $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran where status_iuran = '0' and bulan = '$bulan' and tahun = '$tahun'");
        return $data->row();
    }
    public function GetPengeluaran($bulan, $tahun){
        $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran where status_iuran = '1' and bulan = '$bulan' and tahun = '$tahun'");
        return $data->row();
    }
}