<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class C_login extends CI_Controller {
	public function index(){
		$this->load->view('login');
	}
	public function GetData(){
		$tahun = $this->input->post('tahun');
		$bulan =  $this->input->post('bulan');
		$data['iuran'] = $this->M_iuran->GetPembayaran($bulan, $tahun);
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
	public function prosesLogin()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		if ($username == 'alislam' && $password == 'istiqomah2020') {
			$data = array(
				'username' => $username,
				'status' => 'login'
			);
			$this->session->set_userdata($data);
			redirect(base_url('spp'));
		}else{
          ?>
			<script>alert('Gagal')</script><?php
          $this->load->view('login');
        }
	}
	public function logout()
	{
		$this->session->sess_destroy();
		redirect(base_url());
	}
}
