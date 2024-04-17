import React from 'react';

const AboutScreen: React.FC = () => {
  return (
    <div className='mt-0 mb-4 md:mt-20 lg:mt-24 w-full sm:w-[80%] md:w-[80%] lg:w-[60%] mx-auto'>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Tentang Alkareem</h1>
        <p className="mb-4 text-justify indent-8">
          Alkareem adalah sebuah platform yang didedikasikan untuk menghubungkan dan mengakomodir kebutuhan Keluarga besar Bani KH. Abdul Karim Lirboyo. Kami bertujuan untuk menyediakan berbagai informasi, layanan, dan komunikasi yang diperlukan oleh komunitas ini.
        </p>
        <h2 className="text-2xl font-bold mb-2">Visi</h2>
        <p className="mb-4 text-justify indent-8">
          Visi kami adalah menjadi pusat informasi dan interaksi yang terpercaya bagi Keluarga besar Bani KH. Abdul Karim Lirboyo, memungkinkan setiap anggota untuk terhubung, berkomunikasi, dan berkembang bersama dalam semangat kebersamaan dan kesatuan.
        </p>
        <h2 className="text-2xl font-bold mb-2">Misi</h2>
        <ul className="list-disc list-inside mb-4 text-justify list-outside mx-10">
          <li>Menghadirkan platform yang mudah diakses dan user-friendly untuk memenuhi kebutuhan informasi komunitas.</li>
          <li>Menyediakan berbagai fitur dan layanan yang mendukung kegiatan komunitas dan kehidupan sehari-hari anggota.</li>
          <li>Memfasilitasi komunikasi yang efektif dan kolaboratif antara anggota komunitas.</li>
          <li>Mendorong pertumbuhan dan perkembangan positif bagi individu dan keluarga dalam bingkai nilai-nilai Islam dan tradisi keluarga Bani KH. Abdul Karim Lirboyo.</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Tentang Kami</h2>
        <p className='text-justify indent-8'>
          Alkareem didirikan dengan tujuan untuk memberikan solusi terbaik bagi Keluarga besar Bani KH. Abdul Karim Lirboyo dalam memenuhi kebutuhan komunikasi dan informasi mereka. Tim kami terdiri dari individu yang berkomitmen tinggi untuk memberikan layanan terbaik dan mendukung pertumbuhan serta kebersamaan dalam komunitas ini.
        </p>
      </div>
    </div>
  );
};

export default AboutScreen;
