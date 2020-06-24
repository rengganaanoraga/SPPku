<?php
defined('BASEPATH') OR exit('No direct script acces allowed');
class M_spp extends CI_Model{
	
	public function __construct(){
		parent::__construct();
	}

	public function GetData($where=""){
      	$data = $this->db->query("SELECT * FROM tb_bulan");
      	return $data->result();
 	}
 	public function GetBulan($bulan){
      	$data = $this->db->query("SELECT * FROM tb_pembayaran where bulan = '$bulan'");
      	return $data->row();
 	}

 	public function GetSantri(){
      	$data = $this->db->query("SELECT * FROM tb_santri");
       	/*$ReturnData = ["Data" => $data->result_array()];
      	return ($ReturnData);*/
      	return $data->result();
 	}
    public function GetPembayaran($bulan, $tahun, $idSantri)
    {
        $data = $this->db->query("SELECT ifnull(sum(jumlah_bayar),0) as jumlah FROM tb_pembayaran where bulan = '$bulan' and tahun = '$tahun' and id_santri = '$idSantri'");
        return $data->row();
    }
    public function BayarSpp($idSantri, $tahun, $bulan, $bayar, $tagihan)
    {
        $data = $this->db->query("SELECT * FROM tb_pembayaran WHERE bulan = '$bulan' and tahun = '$tahun' and id_santri = '$idSantri' ");
        $as = $data->row();
        if ($as) {
            $dataBayar = $bayar + $as->jumlah_bayar;
            $this->db->query("UPDATE tb_pembayaran SET jumlah_bayar = '$dataBayar' WHERE bulan = '$bulan' AND tahun = '$tahun' AND id_santri = '$idSantri' ");
        }
        else{
            $tgl_bayar = date('Y-m-d');
            $dataBayar = $bayar - 15000;
            $iuran = 15000;
            $this->db->query("INSERT INTO tb_pembayaran VALUES(NULL, NOW(), '$idSantri', '$dataBayar', '$tgl_bayar', '$bulan', '$tahun', '$iuran', '0', 'Pembayaran SPP', '$tagihan')");
        }
    }
    public function GetIuran($bulan, $tahun, $idSantri)
    {
        $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran where bulan = '$bulan' and tahun = '$tahun' and id_santri = '$idSantri'");
        return $data->row();
    }
    public function GetTotalBayar($tahun, $idSantri)
    {

      $tgl_bayar = date('Y-m-d');
      $data = $this->db->query("SELECT sum(jumlah_bayar) as jumlah FROM tb_pembayaran WHERE $tahun = '$tahun' and id_santri = '$idSantri' AND tanggal_pembayaran = '$tgl_bayar'");
      return $data->row();
    }
    public function GetTotalIuran($tahun, $idSantri)
    {

      $tgl_bayar = date('Y-m-d');
      $data = $this->db->query("SELECT sum(jumlah_iuran) as jumlah FROM tb_pembayaran WHERE $tahun = '$tahun' and id_santri = '$idSantri' AND tanggal_pembayaran = '$tgl_bayar'");
      return $data->row();
    }
    public function GetDataNota($tahun, $idSantri)
    {
      $tgl_bayar = date('Y-m-d');
      $data = $this->db->query("SELECT * FROM tb_pembayaran WHERE  tahun = '$tahun' AND id_santri = '$idSantri'  AND tanggal_pembayaran = '$tgl_bayar'");
      return $data->result();
    }
  	public function GetTagihan($tahun, $idSantri, $bulan)
    {
      $data = $this->db->query("SELECT  ifnull(tagihan,0) as tagihan FROM tb_pembayaran WHERE  tahun = '$tahun' AND id_santri = '$idSantri' AND bulan = '$bulan'");
      return $data->row();
    }
}