document.addEventListener('DOMContentLoaded', () => {
    const cameraMovements = {
        "Static": "Statis",
        "Pan Left": "Geser Kiri",
        "Pan Right": "Geser Kanan",
        "Tilt Up": "Miring ke Atas",
        "Tilt Down": "Miring ke Bawah",
        "Dolly In": "Maju",
        "Dolly Out": "Mundur",
        "Zoom In": "Perbesar",
        "Zoom Out": "Perkecil",
        "Tracking Shot": "Tembakan Pelacakan",
        "Crane Up": "Angkat Derek",
        "Crane Down": "Turunkan Derek",
        "Handheld": "Genggam",
        "Aerial Shot": "Tembakan Udara",
        "Dutch Angle": "Sudut Belanda",
        "3D Rotation": "Rotasi 3D",
        "Boom Up": "Boom ke Atas",
        "Boom Down": "Boom ke Bawah",
        "Truck Left": "Geser Truk ke Kiri",
        "Truck Right": "Geser Truk ke Kanan",
        "Pedestal Up": "Angkat Alas",
        "Pedestal Down": "Turunkan Alas",
        "Arc Shot": "Tembakan Busur"
    };

    const cameraSelect = document.getElementById('gerakan-kamera');
    for (const [english, indonesian] of Object.entries(cameraMovements)) {
        const option = document.createElement('option');
        option.value = english;
        option.textContent = `${english} (${indonesian})`;
        cameraSelect.appendChild(option);
    }
    cameraSelect.value = 'Tracking Shot';

    document.getElementById('generate-prompt').addEventListener('click', generatePrompt);
    document.getElementById('change-style').addEventListener('click', changeStyle);
    document.getElementById('change-title').addEventListener('click', changeTitle);
    document.getElementById('reset-form').addEventListener('click', resetForm);
    document.getElementById('copy-indonesia').addEventListener('click', () => copyToClipboard('output-indonesia'));
    document.getElementById('copy-inggris').addEventListener('click', () => copyToClipboard('output-inggris', true));
});

function generatePrompt() {
    const judul = document.getElementById('judul-scene').value;
    const deskripsi = document.getElementById('deskripsi-karakter').value;
    const suara = document.getElementById('detail-suara').value;
    const aksi = document.getElementById('aksi-karakter').value;
    const ekspresi = document.getElementById('ekspresi-karakter').value;
    const latar = document.getElementById('latar-tempat-waktu').value;
    const kamera = document.getElementById('gerakan-kamera').value;
    const visual = document.getElementById('detail-visual').value;
    const suasana = document.getElementById('suasana').value;
    const lingkungan = document.getElementById('suara-lingkungan').value;
    const dialog = document.getElementById('dialog-karakter').value;
    const negatif = document.getElementById('negative-prompt').value;

    const promptIndonesia = `[JUDUL SCENE: ${judul}]
[DESKRIPSI KARAKTER INTI]
${deskripsi}
[DETAIL SUARA KARAKTER]
${suara}
[AKSI KARAKTER]
${aksi}
[EKSPRESI KARAKTER]
${ekspresi}
[LATAR TEMPAT & WAKTU]
${latar}
[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: ${kamera}.
${visual}
[SUASANA KESELURUHAN]
${suasana}
[SUARA LINGKUNGAN (AMBIENCE)]
${lingkungan}
[DIALOG KARAKTER]
${dialog}
[NEGATIVE PROMPT]
${negatif}`;

    document.getElementById('output-indonesia').value = promptIndonesia;

    // Dummy translation, replace with a real translation API if needed
    const promptInggris = `[SCENE TITLE: ${judul}]
[CORE CHARACTER DESCRIPTION]
${deskripsi}
[CHARACTER VOICE DETAILS]
${suara}
[CHARACTER ACTION]
${aksi}
[CHARACTER EXPRESSION]
${ekspresi}
[SETTING & TIME]
${latar}
[ADDITIONAL VISUAL DETAILS]
Camera Movement: ${kamera}.
${visual}
[OVERALL ATMOSPHERE]
${suasana}
[ENVIRONMENTAL SOUND (AMBIENCE)]
${lingkungan}
[CHARACTER DIALOGUE]
${dialog}
[NEGATIVE PROMPT]
${negatif}`;

    // A simple replacement for demonstration. A real implementation might need a translation library or API.
    const finalInggris = promptInggris
        .replace(/Seorang vlogger pria muda muda/g, "A young male vlogger")
        .replace(/asal Maluku berusia 27 tahun/g, "from Maluku, 27 years old")
        .replace(/tubuh kekar, tinggi 164cm, bentuk badan proporsional/g, "sturdy body, 164cm tall, proportional build")
        .replace(/warna kulit: sawo matang cerah/g, "skin color: light brown")
        .replace(/Rambut: lurus, hitam kecokelatan, belah samping/g, "Hair: straight, brownish-black, side-parted")
        .replace(/Wajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural/g, "Face: oval face, naturally thick eyebrows, large black eyes, friendly smile, rosy cheeks, natural lips")
        .replace(/mengenakan jaket hoddie warna loreng dan celana panjang hitam robek di lutut, membawa ransel kecil/g, "wearing a camouflage-patterned hoodie jacket and black ripped jeans, carrying a small backpack")
        .replace(/Dia berbicara dengan suara pria muda yang hangat dan penuh semangat/g, "He speaks with a warm and enthusiastic young male voice")
        .replace(/Nada: Young Male/g, "Tone: Young Male")
        .replace(/Timbre: bersahabat dan enerjik/g, "Timbre: friendly and energetic")
        .replace(/logat Indonesia dengan sentuhan khas Maluku halus, berbicara murni dalam Bahasa Indonesia/g, "Indonesian accent with a subtle Maluku touch, speaks purely in Indonesian")
        .replace(/tempo sedang-cepat, gaya bicara lincah dan ekspresif/g, "medium-fast tempo, lively and expressive speaking style")
        .replace(/Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video/g, "All dialogue must be in Indonesian with natural and clear pronunciation. Ensure this character's voice is consistent throughout the video")
        .replace(/berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang/g, "walking around the night bus terminal, observing the activities of passengers and vendors")
        .replace(/Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera/g, "The character shows an expression of awe and enthusiasm, often smiling while glancing at the camera")
        .replace(/latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala/g, "setting: at an intercity bus terminal at night, there are street vendors along the departure lane, several buses are lined up with their lights on")
        .replace(/Waktu: malam hari, hujan rintik-rintik/g, "Time: night, light drizzle")
        .replace(/Gerakan Kamera: /g, "Camera Movement: ")
        .replace(/Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah/g, "Lighting: natural from streetlights and bus lights, light reflection on the wet asphalt")
        .replace(/Gaya Video\/Art Style: cinematic realistis/g, "Video/Art Style: cinematic realism")
        .replace(/Kualitas Visual: Resolusi 4K/g, "Visual Quality: 4K Resolution")
        .replace(/Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan/g, "A busy, crowded atmosphere, with a sense of a lively and dynamic night journey despite the rain")
        .replace(/SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang/g, "SOUND: sound of bus engines starting, announcements from loudspeakers, light rain, and faint conversations between passengers and vendors")
        .replace(/Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah/g, "Avoid: on-screen text, subtitles, text in the video, fonts, logos, distortion, artifacts, anomalies, double faces, deformed limbs, abnormal hands, extra people, distracting objects, low quality, blur, glitch, robotic voice, broken audio");
    
    document.getElementById('output-inggris').innerHTML = finalInggris;
}

function resetForm() {
    document.getElementById('judul-scene').value = 'Terminal bus malam';
    document.getElementById('deskripsi-karakter').value = `Seorang vlogger pria muda asal Maluku berusia 27 tahun.
Perawakan/Bentuk Tubuh: tubuh kekar, tinggi 164cm, bentuk badan proporsional.
warna kulit: sawo matang cerah.
Rambut: lurus, hitam kecokelatan, belah samping.
Wajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural.
Pakaian: mengenakan jaket hoddie warna loreng dan celana panjang hitam robek di lutut, membawa ransel kecil.`;
    document.getElementById('detail-suara').value = `Dia berbicara dengan suara pria muda yang hangat dan penuh semangat.
Nada: Young Male.
Timbre: bersahabat dan enerjik.
Aksen/Logat: logat Indonesia dengan sentuhan khas Maluku halus, berbicara murni dalam Bahasa Indonesia.
Cara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.
PENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.`;
    document.getElementById('aksi-karakter').value = 'berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.';
    document.getElementById('ekspresi-karakter').value = 'Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.';
    document.getElementById('latar-tempat-waktu').value = `latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.
Waktu: malam hari, hujan rintik-rintik.`;
    document.getElementById('gerakan-kamera').value = 'Tracking Shot';
    document.getElementById('detail-visual').value = `Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.
Gaya Video/Art Style: cinematic realistis.
Kualitas Visual: Resolusi 4K.`;
    document.getElementById('suasana').value = 'Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.';
    document.getElementById('suara-lingkungan').value = 'SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.';
    document.getElementById('dialog-karakter').value = `DIALOG dalam Bahasa Indonesia: Karakter berkata: Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai.`;
    document.getElementById('negative-prompt').value = `Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah.`;
    document.getElementById('output-indonesia').value = '';
    document.getElementById('output-inggris').innerHTML = '';
}

async function copyToClipboard(elementId, isDiv = false) {
    const element = document.getElementById(elementId);
    const textToCopy = isDiv ? element.innerText : element.value;
    if (!textToCopy) {
        alert('Tidak ada teks untuk disalin!');
        return;
    }
    try {
        await navigator.clipboard.writeText(textToCopy);
        alert('Prompt berhasil disalin!');
    } catch (err) {
        console.error('Gagal menyalin: ', err);
        alert('Gagal menyalin prompt.');
    }
}

function changeStyle() {
    const color1 = prompt("Masukkan warna primer (contoh: #ff0000):");
    const color2 = prompt("Masukkan warna sekunder (contoh: #00ff00):");
    const color3 = prompt("Masukkan warna background (contoh: #f0f0f0):");

    if (color1 && color2 && color3) {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', color1);
        root.style.setProperty('--secondary-color', color2);
        root.style.setProperty('--background-color', color3);
        root.style.setProperty('--button-bg', color1);
        root.style.setProperty('--button-hover-bg', color2);
    }
}

function changeTitle() {
    const newTitle = prompt("Masukkan judul baru:");
    if (newTitle) {
        document.getElementById('main-title').textContent = newTitle;
    }
} 
