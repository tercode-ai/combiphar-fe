const Page = () => {
  return (
    <div className="relative grid h-screen flex-col justify-center md:grid md:items-center lg:max-w-none lg:px-0">
      <div className="flex flex-col items-center rounded-xl bg-background p-8">
        <div className="flex justify-center pb-6">
          <img src="/combiphar.png" alt="combiphar" className="h-12" />
        </div>
        <h2 className="mt-6 text-center text-xl">
          Terima Kasih telah menggunakan layanan Combiphar Assistant
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Kami senang dapat membantu Anda mendapatkan informasi dan jawaban yang
          Anda butuhkan
          <br />
          Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk kembali
          mengakses chatbot ini kapan saja.
        </p>
      </div>
    </div>
  );
};

export default Page;
