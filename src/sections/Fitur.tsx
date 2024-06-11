function Fitur() {
  return (
    <>
      <section className="py-10 bg-white sm:py-16 lg:py-24" id="fitur">
        <p className="text-center text-base font-semibold leading-7 text-primary-500">Features</p>
        <h2 className="text-center my-5 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Fitur Keunggulan</h2>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-blue-100" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-9 h-9 text-blue-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20.597 7.482L24 16.518h-2.51l-.58-1.618h-3.246l.694-1.754h2.002l-.95-2.66zm-8.111 0l1.772 5.84l2.492-5.84h2.415l-3.643 9.036H13.14l-1.64-5.237l-1.72 5.237H7.404L6.17 14.402l1.214-3.742l1.342 2.661l1.903-5.839zm-8.746 0q1.596 0 2.424.917a3 3 0 0 1 .28.368L5.37 12.08l-.385 1.185q-.528.15-1.204.151H2.293v3.102H0V7.482zm-.58 1.753h-.866v2.428h.86q.836 0 1.148-.358q.285-.323.284-.873q0-.546-.323-.871q-.324-.326-1.103-.326"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Mendukung PWA</h3>
              <p className="mt-4 text-base text-gray-600">Progressive Web Apps (PWA) adalah teknologi web yang memungkinkan aplikasi web untuk berfungsi seperti aplikasi native di perangkat seluler.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-orange-100" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                </svg>
                <svg className="absolute text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Halaman Cepat dan Mudah Diakses</h3>
              <p className="mt-4 text-base text-gray-600">Halaman yang cepat dan mudah diakses akan meningkatkan pengalaman pengguna dan membantu meningkatkan peringkat SEO.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-green-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute text-green-600 w-9 h-9" viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4m-6-8V8m3 4v-1m3 1v-2m-3 2v-1"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Tampilan Minimimalis Dan Mudah Dimengerti</h3>
              <p className="mt-4 text-base text-gray-600">Tampilan minimalis dan mudah dimengerti akan membuat pengguna merasa nyaman dan mudah dalam menggunakan aplikasi.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-purple-100" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute text-purple-600 w-9 h-9" viewBox="0 0 14 14">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M2.56 1.954C2.56.895 3.445.092 4.47.092s1.912.803 1.912 1.862v.462c0 1.059-.887 1.862-1.911 1.862c-1.025 0-1.912-.803-1.912-1.862zm1.91-.362c-.258 0-.41.192-.41.362v.462c0 .17.152.362.41.362c.259 0 .412-.193.412-.362v-.462c0-.17-.153-.362-.411-.362ZM1.595.842a.75.75 0 1 0-1.5 0v2.703a.75.75 0 0 0 1.5 0zm0 4.792a.75.75 0 1 0-1.5 0v2.703a.75.75 0 1 0 1.5 0zm1.715-.75a.75.75 0 0 1 .75.75v2.703a.75.75 0 1 1-1.5 0V5.634a.75.75 0 0 1 .75-.75m-1.715 5.503a.75.75 0 1 0-1.5 0v2.703a.75.75 0 0 0 1.5 0zM8.097.092a.75.75 0 0 1 .75.75v2.703a.75.75 0 1 1-1.5 0V.842a.75.75 0 0 1 .75-.75m3.176.75a.75.75 0 1 0-1.5 0v2.703a.75.75 0 1 0 1.5 0zM4.47 9.654c-1.025 0-1.912.803-1.912 1.862v.462c0 1.059.887 1.862 1.912 1.862c1.024 0 1.911-.803 1.911-1.862v-.462c0-1.059-.887-1.862-1.911-1.862m-.412 1.862c0-.17.153-.362.412-.362c.258 0 .411.193.411.362v.462c0 .17-.153.362-.411.362c-.259 0-.412-.192-.412-.362zm.965-4.772a1.91 1.91 0 0 1 1.911-1.91a.75.75 0 0 1 0 1.5a.411.411 0 0 0-.41.41v.483a.75.75 0 1 1-1.5 0zM10.5 7.75c-.69 0-1.25.56-1.25 1.25v.5h2.5V9c0-.69-.56-1.25-1.25-1.25M7.75 9v.531A1 1 0 0 0 7 10.5V13a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.5a1 1 0 0 0-.75-.969V9a2.75 2.75 0 1 0-5.5 0"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Keamanan Data Pengguna</h3>
              <p className="mt-4 text-base text-gray-600">Keamanan data pengguna sangat penting, kami menggunakan teknologi terbaru untuk menjaga data pengguna agar tetap aman dan terenkripsi.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-black" width="65" height="70" viewBox="0 0 65 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-9 h-9" viewBox="0 0 128 128">
                  <path
                    fill="#fff"
                    d="M26.994 127.655h-2.032v-15.766h9.231v1.937h-7.199v5.176h6.495v1.892h-6.495zm11.022-13.497a1.44 1.44 0 0 1-1.818.182a1.43 1.43 0 0 1-.533-1.742a1.44 1.44 0 0 1 2.77.547a1.37 1.37 0 0 1-.42 1.013zm0 13.497h-2.033v-10.79h2.033zm4.46 0h-2.03v-10.79h1.942v1.762h.088a2.77 2.77 0 0 1 1.27-1.454a3.64 3.64 0 0 1 1.867-.573a3.9 3.9 0 0 1 1.524.266l-.773 1.892a3.1 3.1 0 0 0-1.082-.155a2.66 2.66 0 0 0-1.957.872q-.85.87-.85 2.28zm10.226.344q-2.452 0-3.986-1.63q-1.535-1.628-1.536-4.118a5.93 5.93 0 0 1 1.494-4.042a4.84 4.84 0 0 1 3.81-1.696q2.407 0 3.855 1.563q1.448 1.565 1.446 4.184l-.022.375h-8.55q.087 1.629 1.094 2.58a3.32 3.32 0 0 0 2.352.947q2.186 0 2.96-1.85l1.81.749a4.84 4.84 0 0 1-1.744 2.102q-1.216.836-2.983.836m2.916-7.053q-.066-.925-.85-1.762q-.785-.835-2.33-.819a2.92 2.92 0 0 0-1.955.706a3.6 3.6 0 0 0-1.137 1.892zm9.52 7.053a4.6 4.6 0 0 1-2.22-.516a3.75 3.75 0 0 1-1.474-1.325h-.088v1.497h-1.938v-15.766h2.026v4.976l-.088 1.497h.088a3.75 3.75 0 0 1 1.468-1.321a4.6 4.6 0 0 1 2.22-.528q2.097 0 3.623 1.651t1.523 4.096q0 2.445-1.523 4.096q-1.524 1.652-3.617 1.643m-.331-1.85a3.24 3.24 0 0 0 2.43-1.068q1.016-1.068 1.016-2.83q0-1.76-1.017-2.83a3.32 3.32 0 0 0-2.432-1.067a3.32 3.32 0 0 0-2.437 1.057q-1.006 1.057-1.005 2.84q.002 1.785 1.005 2.84a3.24 3.24 0 0 0 2.44 1.067zM75.452 128q-1.725 0-2.882-.99q-1.155-.993-1.16-2.62q0-1.762 1.37-2.764q1.37-1 3.38-1q1.788 0 2.933.66v-.308a2.4 2.4 0 0 0-.818-1.905a2.94 2.94 0 0 0-2.005-.707a3.1 3.1 0 0 0-1.602.419a2.16 2.16 0 0 0-.983 1.145l-1.855-.793q.376-.968 1.48-1.794c1.104-.826 1.709-.826 2.916-.826q2.071 0 3.452 1.204t1.37 3.413v6.522h-1.952v-1.497h-.088q-1.215 1.84-3.556 1.84zm.331-1.85a3.3 3.3 0 0 0 2.286-.935a2.9 2.9 0 0 0 1.036-2.212q-.862-.706-2.589-.706q-1.48 0-2.23.638a1.91 1.91 0 0 0-.751 1.497c-.01.511.253.989.69 1.256a2.74 2.74 0 0 0 1.558.471zM87.025 128q-1.812 0-2.992-.88a5.2 5.2 0 0 1-1.726-2.203l1.812-.748q.862 2.025 2.934 2.026a2.7 2.7 0 0 0 1.553-.418a1.28 1.28 0 0 0 .607-1.1q0-1.057-1.48-1.432l-2.187-.528a5.2 5.2 0 0 1-1.965-1.001a2.4 2.4 0 0 1-.927-1.992q0-1.432 1.27-2.323a5.1 5.1 0 0 1 3.015-.89a5.04 5.04 0 0 1 2.56.651a3.67 3.67 0 0 1 1.612 1.862l-1.767.719q-.597-1.431-2.474-1.432a2.9 2.9 0 0 0-1.524.375a1.14 1.14 0 0 0-.618 1.014q0 .925 1.436 1.255l2.143.508q1.524.344 2.254 1.204a2.92 2.92 0 0 1 .735 1.95a3 3 0 0 1-1.208 2.423q-1.185.96-3.063.96m10.933 0q-2.451 0-3.986-1.63q-1.534-1.628-1.536-4.118a5.93 5.93 0 0 1 1.491-4.05a4.84 4.84 0 0 1 3.81-1.697q2.407 0 3.855 1.564q1.448 1.563 1.446 4.184l-.022.375h-8.547q.089 1.629 1.094 2.58a3.32 3.32 0 0 0 2.352.946q2.186 0 2.96-1.85l1.81.754a4.84 4.84 0 0 1-1.745 2.102q-1.215.84-2.982.84m2.916-7.053q-.065-.925-.85-1.762q-.785-.835-2.33-.819a2.92 2.92 0 0 0-1.955.706a3.6 3.6 0 0 0-1.137 1.892z"
                  />
                  <path fill="#ffa000" d="M30.916 72.85L42.029 1.736a2.053 2.053 0 0 1 3.838-.652L57.36 22.521l4.581-8.723a2.053 2.053 0 0 1 3.633 0L96.592 72.85Z" />
                  <path fill="#f57c00" d="M69.31 45.148L57.356 22.51l-26.44 50.34Z" />
                  <path fill="#ffca28" d="m96.592 72.85l-8.513-52.674a2.06 2.06 0 0 0-1.399-1.613a2.05 2.05 0 0 0-2.074.504L30.916 72.85l29.708 16.66a6.16 6.16 0 0 0 6.003 0z" />
                  <path
                    fill="#fff"
                    fill-opacity=".2"
                    d="M88.08 20.176a2.06 2.06 0 0 0-1.4-1.612a2.05 2.05 0 0 0-2.074.503L73.949 29.75l-8.38-15.953a2.053 2.053 0 0 0-3.632 0l-4.581 8.722L45.862 1.083A2.05 2.05 0 0 0 43.706.03a2.05 2.05 0 0 0-1.682 1.71L30.916 72.85h-.036l.035.042l.293.144L84.59 19.59a2.053 2.053 0 0 1 3.479 1.108L96.51 72.9l.082-.051l-8.512-52.675ZM31.012 72.753l11.016-70.51A2.05 2.05 0 0 1 43.71.532a2.05 2.05 0 0 1 2.157 1.054L57.36 23.024l4.582-8.723a2.053 2.053 0 0 1 3.633 0l8.21 15.614z"
                  />
                  <path fill="#a52714" d="M66.627 89.007a6.16 6.16 0 0 1-6.003 0L30.986 72.395l-.072.456l29.709 16.655a6.16 6.16 0 0 0 6.003 0l29.966-16.655l-.078-.472l-29.888 16.63Z" opacity=".2" />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Menggunakan Firebase</h3>
              <p className="mt-4 text-base text-gray-600">Firebase adalah platform pengembangan aplikasi seluler dan web yang dibuat oleh Firebase dan kemudian diakuisisi oleh Google pada tahun 2014.</p>
            </div>

            <div>
              <div className="relative flex items-center justify-center mx-auto">
                <svg className="text-yellow-100" width="78" height="78" viewBox="0 0 78 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute text-yellow-500 w-9 h-9" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 2a8.002 8.002 0 0 1 7.934 6.965l2.25 3.539c.148.233.118.58-.225.728L17 14.07V17a2 2 0 0 1-2 2h-1.999L13 22H4v-3.694c0-1.18-.436-2.297-1.244-3.305A8 8 0 0 1 9 2m12.154 16.102l-1.665-1.11A8.959 8.959 0 0 0 21 12a8.958 8.958 0 0 0-1.51-4.993l1.664-1.11A10.948 10.948 0 0 1 23 12c0 2.258-.68 4.356-1.846 6.102"
                  />
                </svg>
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">Kebebasan Memberikan Komentar</h3>
              <p className="mt-4 text-base text-gray-600">Pengguna dapat memberikan komentar dan saran yang berguna untuk dosen yang dipilih.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Fitur;
