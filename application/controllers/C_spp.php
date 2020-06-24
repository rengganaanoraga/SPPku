<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class C_spp extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('M_spp');
		$this->load->helper('url');
	}
	public function index(){
		$act = $this->input->post("act");
		$form = $this->input->post("form");
		$this->req = $this->input->post('req');
		$this->form = $this->input->post("form");
		print_r($this->$act());
	}
	public function GetHalaman(){
		$data ['santri'] = $this->M_spp->GetSantri();
		$this->load->view('spp', $data);
	}
	public function GetData(){
		$data['idSantri'] = $this->input->post('id');
		$data['tahun'] = $this->input->post('tahun');
		$data['bulan'] =  $this->M_spp->GetData();
		$this->load->view('tabelData', $data);
	}
	public function GetDataAdmin(){
      if($this->session->userdata('status') != 'login'){
			?>
			<script>
				alert('Harap login dulu');
				window.location = "C_login";
			</script>
			<?php
		}else{
          $data['idSantri'] = $this->input->post('id');
          $data['tahun'] = $this->input->post('tahun');
          $data['tagihan'] = $this->input->post('tagihan');
          $data['bulan'] =  $this->M_spp->GetData();
          $this->load->view('tableSppAdmin', $data);
      }
	}
	public function GetBulan(){
		return $this->M_spp->GetBulan();
	}
	public function BayarSpp()
	{
      if($this->session->userdata('status') != 'login'){
			?>
			<script>
				alert('Harap login dulu');
				window.location = "C_login";
			</script>
			<?php
		}else{
          $tahun = $this->input->post('tahun');
          $idSantri = $this->input->post('idSantri');
          $bulan = $this->input->post('nama');
          $bayar = $this->input->post('bayar');
          $tagihan = $this->input->post('tagihan');
          $this->M_spp->BayarSpp($idSantri, $tahun, $bulan, $bayar, $tagihan);
      }
	}
	public function PrintNota($idSantri, $tahun)
	{
		$tahun = $tahun;
		$idSantri = $idSantri;
		$data['jumlahBayar'] = $this->M_spp->GetTotalBayar($tahun, $idSantri);
		$data['TotalIuran'] = $this->M_spp->GetTotalIuran($tahun, $idSantri);
		$data['dataBayar'] = $this->M_spp->GetDataNota($tahun, $idSantri);
		$this->load->view('print-pembayaran', $data);
	}
	
}
