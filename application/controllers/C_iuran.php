<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class C_iuran extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('M_iuran');
		$this->load->helper('url');
		if($this->session->userdata('status') != 'login'){
			?>
			<script>
				alert('Harap login dulu');
				window.location = "C_login";
			</script>
			<?php
		}
	}
	public function index(){
		$data['bulan'] =  $this->M_iuran->GetData();
		$this->load->view('iuran', $data);
	}
	public function GetData(){
		$data['tahun'] = $this->input->post('tahun');
		$data['bulan'] =  $this->input->post('bulan');
		$data['iuran'] = $this->M_iuran->GetPembayaran($data['bulan'], $data['tahun']);
		$this->load->view('tabelIuran', $data);
	}
	public function AddData()
	{
		$bulan = $this->input->post('bulan');
		$tahun = $this->input->post('tahun');
		$jumlah = $this->input->post('jumlah');
		$deskripsi = $this->input->post('deskripsi');
		$status = $this->input->post('status');
		$this->M_iuran->AddData($bulan, $tahun, $jumlah, $deskripsi, $status);
	}
	public function Print($bulan, $tahun, $saldo, $pengeluaran, $pemasukan)
	{
		$data['bulan'] = $bulan;
		$data['tahun']= $tahun;
		$data['saldo']= $saldo;
		$data['pengeluaran']= $pengeluaran;
		$data['pemasukan']= $pemasukan;
		$this->load->view('print-laporan', $data);
	}
}
