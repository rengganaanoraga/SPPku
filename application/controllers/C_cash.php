<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class C_cash extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('M_cash');
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
		$data['bulan'] =  $this->M_cash->GetBulan();
		$this->load->view('cash', $data);
	}
	public function GetData()
	{
		$bulan = $this->input->post('bulan');
		$tahun = $this->input->post('tahun');
		$data['cash'] = $this->M_cash->GetData($bulan, $tahun);
		$data['bulan'] = $bulan;
		$data['tahun'] = $tahun;
		$this->load->view('tabelCash', $data);
	}
	public function AddData()
	{
		$bulan = $this->input->post('bulan');
		$tahun = $this->input->post('tahun');
		$jumlah = $this->input->post('jumlah');
		$deskripsi = $this->input->post('deskripsi');
		$status = $this->input->post('status');
		$this->M_cash->AddData($bulan, $tahun, $jumlah, $deskripsi, $status);
	}
	public function Print($bulan, $tahun, $as, $jumlahPengeluaran, $jumlahSaldo)
	{
		$data['bulan'] = $bulan;
		$data['tahun']= $tahun;
		$data['saldo']= $as;
		$data['pengeluaran']= $jumlahPengeluaran;
		$data['pemasukan']= $jumlahSaldo;
		$this->load->view('print-laporan-cash', $data);
	}
}
