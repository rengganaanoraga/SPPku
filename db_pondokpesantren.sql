/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_pondokpesantren

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-03-21 10:30:34
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `tb_bulan`
-- ----------------------------
DROP TABLE IF EXISTS `tb_bulan`;
CREATE TABLE `tb_bulan` (
  `id_bulan` int(4) NOT NULL AUTO_INCREMENT,
  `nama_bulan` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_bulan`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_bulan
-- ----------------------------
INSERT INTO tb_bulan VALUES ('1', 'Januari');
INSERT INTO tb_bulan VALUES ('2', 'Februari');
INSERT INTO tb_bulan VALUES ('3', 'Maret');
INSERT INTO tb_bulan VALUES ('4', 'April');
INSERT INTO tb_bulan VALUES ('5', 'Mei');
INSERT INTO tb_bulan VALUES ('6', 'Juni');
INSERT INTO tb_bulan VALUES ('7', 'Juli');
INSERT INTO tb_bulan VALUES ('8', 'Agustus');
INSERT INTO tb_bulan VALUES ('9', 'September');
INSERT INTO tb_bulan VALUES ('10', 'Oktober');
INSERT INTO tb_bulan VALUES ('11', 'November');
INSERT INTO tb_bulan VALUES ('12', 'Desember');

-- ----------------------------
-- Table structure for `tb_kas`
-- ----------------------------
DROP TABLE IF EXISTS `tb_kas`;
CREATE TABLE `tb_kas` (
  `id_kas` int(4) NOT NULL AUTO_INCREMENT,
  `bulan` varchar(20) DEFAULT NULL,
  `tahun` varchar(20) DEFAULT NULL,
  `jumlah` int(100) DEFAULT NULL,
  `deskripsi` varchar(50) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL COMMENT 'Status untuk membedakan apakah kas tersebut masuk atau keluar',
  `tanggal_kas` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_kas`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_kas
-- ----------------------------
INSERT INTO tb_kas VALUES ('1', 'Februari', '2020', '35000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');
INSERT INTO tb_kas VALUES ('2', 'Januari', '2020', '35000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');
INSERT INTO tb_kas VALUES ('3', 'Maret', '2020', '35000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');
INSERT INTO tb_kas VALUES ('4', 'Mei', '2020', '185000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');
INSERT INTO tb_kas VALUES ('5', 'Juni', '2020', '185000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');
INSERT INTO tb_kas VALUES ('6', 'April', '2020', '185000', 'Pembayaran SPP', '0', '2020-03-21 00:00:00');

-- ----------------------------
-- Table structure for `tb_pembayaran`
-- ----------------------------
DROP TABLE IF EXISTS `tb_pembayaran`;
CREATE TABLE `tb_pembayaran` (
  `id_pembayaran` int(4) NOT NULL AUTO_INCREMENT,
  `no_pembayaran` varchar(20) DEFAULT NULL,
  `id_santri` int(4) DEFAULT NULL,
  `jumlah_bayar` int(100) DEFAULT NULL,
  `tanggal_pembayaran` date DEFAULT NULL,
  `bulan` varchar(20) DEFAULT NULL,
  `tahun` varchar(20) DEFAULT NULL,
  `jumlah_iuran` int(100) NOT NULL,
  `status_iuran` enum('1','0') DEFAULT '1',
  `deskripsi_iuran` varchar(150) DEFAULT NULL,
  `tagihan` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pembayaran`) USING BTREE,
  KEY `id_santri` (`id_santri`) USING BTREE,
  CONSTRAINT `tb_pembayaran_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `tb_santri` (`id_santri`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_pembayaran
-- ----------------------------
INSERT INTO tb_pembayaran VALUES ('1', '2020-03-21 10:27:53', '1', '35000', '2020-03-21', 'Februari', '2020', '15000', '0', 'Pembayaran SPP', '50000');
INSERT INTO tb_pembayaran VALUES ('2', '2020-03-21 10:27:53', '1', '35000', '2020-03-21', 'Januari', '2020', '15000', '0', 'Pembayaran SPP', '50000');
INSERT INTO tb_pembayaran VALUES ('3', '2020-03-21 10:27:53', '1', '35000', '2020-03-21', 'Maret', '2020', '15000', '0', 'Pembayaran SPP', '50000');
INSERT INTO tb_pembayaran VALUES ('4', '2020-03-21 10:28:11', '1', '185000', '2020-03-21', 'Mei', '2020', '15000', '0', 'Pembayaran SPP', '200000');
INSERT INTO tb_pembayaran VALUES ('5', '2020-03-21 10:28:11', '1', '185000', '2020-03-21', 'Juni', '2020', '15000', '0', 'Pembayaran SPP', '200000');
INSERT INTO tb_pembayaran VALUES ('6', '2020-03-21 10:28:11', '1', '185000', '2020-03-21', 'April', '2020', '15000', '0', 'Pembayaran SPP', '200000');

-- ----------------------------
-- Table structure for `tb_santri`
-- ----------------------------
DROP TABLE IF EXISTS `tb_santri`;
CREATE TABLE `tb_santri` (
  `id_santri` int(4) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` int(2) DEFAULT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `alamat` text,
  `nama_orangtua` varchar(50) DEFAULT NULL,
  `no_handphone` varchar(15) DEFAULT NULL,
  `gambar_profile` varchar(100) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(2) DEFAULT NULL,
  PRIMARY KEY (`id_santri`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_santri
-- ----------------------------
INSERT INTO tb_santri VALUES ('1', 'Abdul Aziz', '0', 'Malang', '0000-00-00', 'Kepanjen, Kab.Malang', 'Cholil', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('2', 'Abdul Lathif', '0', 'Lamongan', '0000-00-00', 'Paciran, Kab. Lamongan', 'Moh. Khozin', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('3', 'Ahmad Fachrudin H.', '0', 'Malang', '0000-00-00', 'Gondanglegi, Kab. Malang', 'Khodim', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('4', 'Ahmad Rizal Irsyad A.', '0', 'Malang', '0000-00-00', 'Tajinan, Kab. Malang', 'Hariono', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('5', 'Ahman Noer Faizin', '0', 'Malang', '0000-00-00', 'Tajinan, Kab.Malang', 'Tokit', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('6', 'Ahza Dia’ul F.', '0', 'Blitar', '0000-00-00', 'Selopuro, Kab.Blitar', 'Moh. Santoso', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('7', 'Aji Prasetyo H.', '0', 'Malang', '0000-00-00', 'Gedangan, Kab. Malang', 'Bambang H.', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('8', 'Anwar Jamil F.', '0', 'Malang', '0000-00-00', 'Bantur, Kab.Malang', 'Badi', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('9', 'Bima Wahyu S.', '0', 'Trenggalek', '0000-00-00', 'Pogalan, Kab.Trenggalek', 'Slamet', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('10', 'Bulan Bintang C.N.', '0', 'Malang', '0000-00-00', 'Gedangan, Kab.Malang', 'Edy Purwanto', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('11', 'Dwi Wahyu Cahyono', '0', 'Malang', '0000-00-00', 'Wonosari, Kab.Malang', 'Samuri', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('12', 'Fadli Ocvando', '0', 'Malang', '0000-00-00', 'Turen, Kab.Malang', 'Masduki', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('13', 'Fajar Zikrillah N', '0', 'Bandung', '0000-00-00', 'Jl. Arif Rahman, Bojonegoro', 'Sumarwoto', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('14', 'Fakhrudin Faiz', '0', 'Mojokerto', '0000-00-00', 'Talun, Kab.Mojokerto', 'Agung Hermawan', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('15', 'Hari Sumanianto', '0', 'Mojokerto', '0000-00-00', 'Mojokerto', 'Sukadin', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('16', 'M. Affan F', '0', 'Bangkalan', '0000-00-00', 'Socah, Kab. Bangkalan', 'Moh. Jazid', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('17', 'M. Charis F', '0', 'Blitar', '0000-00-00', 'Talun, Kab. Blitar', 'Nurul Huda', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('18', 'M. Khairul R.', '0', 'Blitar', '0000-00-00', 'Wingi, Kab.Biltar', 'Yudiono M', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('19', 'M. Khoiruman', '0', 'Malang', '0000-00-00', 'Pakisaji, Kab.Malang', 'Imam Gozali', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('20', 'M. Nizar Ainun Najib', '0', 'Pati', '0000-00-00', 'Tayu, Kab. Pati', 'Malikhah', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('21', 'M. Silakhul Faza', '0', 'Malang', '0000-00-00', 'Poncokusumo, Kab. Malang', 'Sujianto', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('22', 'M. Syahgar Ilhaq', '0', 'Kediri', '0000-00-00', 'Gampenreso, Kab.Blitar', 'Arief M.', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('23', 'M.Rizal Pratama ', '0', 'Malang', '0000-00-00', 'Jl. M. Wiyono 14, Malang', 'Sumali', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('24', 'Muhammad Rizqi A.', '0', 'Jakarta', '0000-00-00', 'Jakarta Timur', 'Ade Solihin', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('25', 'Mustofa', '0', 'Sumenep', '0000-00-00', 'Ambunten, Kab.Sumenep', 'Duhan', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('26', 'Nuhfatul Zainul A.', '0', 'Malang', '0000-00-00', 'Sumawe, Kab. Malang', 'Tokit', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('27', 'Oki Aldrin S.', '0', 'Malang', '0000-00-00', 'Gedangan, Kab. Malang', 'Suwignyo', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('28', 'Oki Nur Adi S.', '0', 'Malang', '0000-00-00', 'Bantur, Kab.Malang', 'Bpk. Mat', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('29', 'Oky Bagus L.', '0', 'Malang', '0000-00-00', 'Kalipare, Kab. Malang', 'Lukman', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('30', 'Reavino Johan D.', '0', 'Malang', '0000-00-00', 'Dampit, Kab. Malang', 'Joko Susanto', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('31', 'Risan Praktikto W.', '0', 'Banyuwangi', '0000-00-00', 'Rogojampi, Kab.Banyuwangi', 'Supeno', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('32', 'Rizqi Pratama R.', '0', 'Malang', '0000-00-00', 'Turen, Kab. Malang', 'Phaput Arief', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('33', 'Tauhid Muhammad', '0', 'Malang', '0000-00-00', 'Jl. Untung Sudiro Malang', 'Moch. Sholeh', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('34', 'Wahyu Andika S.M.', '0', 'Malang', '0000-00-00', 'Bantur, Kab. Malang', 'Sujarno', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');
INSERT INTO tb_santri VALUES ('35', 'Wildan Nur Jahid', '0', 'Malang', '0000-00-00', 'Wajak, Kab. Malang', 'Yunior Lutfi', ' -', '', '1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '0');

-- ----------------------------
-- Table structure for `tb_user`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id_user` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
DELIMITER ;;
CREATE TRIGGER `tb_pembayaran_after_ins_tr1` AFTER INSERT ON `tb_pembayaran` FOR EACH ROW BEGIN
INSERT INTO 
  `tb_kas`
(
  `bulan`,
  `tahun`,
  `jumlah`,
  `deskripsi`,
  `status`,
  `tanggal_kas`) 
VALUE (
  NEW.bulan,
  NEW.tahun,
  NEW.jumlah_bayar,
  NEW.deskripsi_iuran,
  '0',
  NEW.tanggal_pembayaran);
END
;;
DELIMITER ;
DELIMITER ;;
CREATE TRIGGER `tb_pembayaran_after_update` AFTER UPDATE ON `tb_pembayaran` FOR EACH ROW BEGIN
	UPDATE `tb_kas` SET jumlah = NEW.jumlah_bayar WHERE bulan = OLD.bulan AND tahun = OLD.tahun;
END
;;
DELIMITER ;
