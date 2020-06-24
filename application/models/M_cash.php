<?php
 	defined('BASEPATH') OR exit('No direct script acces allowed');
	class M_cash extends CI_Model{
	
		public function __construct(){
			parent::__construct();
		}

		public function GetData($bulan, $tahun){
			$data = $this->db->query("SELECT * FROM tb_kas where bulan = '$bulan' and tahun = '$tahun'");
			/*$ReturnData = ["Data" => $data->result_array()];
			return ($ReturnData);*/
			return $data->result();
		}
		public function GetSaldo($bulan, $tahun){
			$data = $this->db->query("SELECT sum(jumlah) as jumlah FROM tb_kas where bulan = '$bulan' and tahun = '$tahun' and `status` = 0 ");
			return $data->row();
		}
		public function GetSl(){
			$data = $this->db->query("SELECT sum(jumlah) as jumlah FROM tb_kas where status  = 0");
			return $data->row();
		}
		public function GetPl(){
			$data = $this->db->query("SELECT sum(jumlah) as jumlah FROM tb_kas where status = 1");
			return $data->row();
		}
		public function GetPengeluaran($bulan, $tahun){
			$data = $this->db->query("SELECT sum(jumlah) as jumlah FROM `tb_kas` where bulan = '$bulan' and tahun = '$tahun' and  `status` = 1");
			return $data->row();
		}
		public function GetBulan(){
			$data = $this->db->query("SELECT * FROM tb_bulan");
			return $data->result();
		}
		public function AddData($bulan, $tahun, $jumlah, $deskripsi, $status){	
			$this->db->query("INSERT INTO tb_kas VALUES(NULL,'$bulan', '$tahun', '$jumlah','$deskripsi', '$status',NOW())");
		}
	}