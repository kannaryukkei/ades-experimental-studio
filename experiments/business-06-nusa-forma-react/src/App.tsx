import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy,
  Layers3, Menu, MoveUpRight, Ruler, X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const media = {
  hero: "https://images.unsplash.com/photo-1774200981075-a728eaaa3824?auto=format&fit=crop&w=2400&q=82",
  kitchen: "https://images.unsplash.com/photo-1752254873720-833814859969?auto=format&fit=crop&w=1600&q=80",
  concrete: "https://images.unsplash.com/photo-1774516534141-fd68a4713366?auto=format&fit=crop&w=1600&q=80",
  living: "https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?auto=format&fit=crop&w=1600&q=80",
  material: "https://images.unsplash.com/photo-1757023177496-131ded651c01?auto=format&fit=crop&w=1600&q=80",
};

const projects = [
  {
    id: "residential",
    number: "01",
    category: "Hunian",
    type: "RESIDENTIAL / SPATIAL STUDY",
    name: "Rumah Teduh",
    description: "Ruang bersama yang mengalir tanpa kehilangan sudut-sudut yang terasa personal.",
    image: media.kitchen,
    alt: "Referensi ruang makan dan dapur terbuka dengan material kayu hangat",
    position: "center",
    brief: "Area memasak, makan, dan duduk perlu terasa terhubung tanpa membuat seluruh aktivitas bertumpuk di satu ruang.",
    response: "Zoning terbuka dengan batas visual ringan. Perbedaan tekstur, penyimpanan, dan arah pandang membantu tiap aktivitas tetap terbaca.",
    considerations: ["Alur antar aktivitas", "Penyimpanan terintegrasi", "Cahaya dan sirkulasi"],
    materials: ["Oak tone", "Linen", "Warm stone"],
  },
  {
    id: "commercial",
    number: "02",
    category: "Komersial",
    type: "SMALL COMMERCIAL / CONCEPT",
    name: "Kedai Sela",
    description: "Alur layanan yang lebih ringkas, dengan suasana yang mengundang untuk tinggal.",
    image: media.concrete,
    alt: "Referensi interior kontemporer dengan dinding beton dan komposisi cahaya",
    position: "center",
    brief: "Area duduk dan jalur layanan perlu terbaca pada ruang komersial yang kompak, tanpa membuat pergerakan pengunjung dan operasional saling mengganggu.",
    response: "Pisahkan jalur operasional dan area pengunjung. Material yang konsisten menjaga karakter ruang tanpa menambah terlalu banyak elemen.",
    considerations: ["Jalur layanan", "Area tunggu", "Pencahayaan fokus"],
    materials: ["Concrete tone", "Dark timber", "Warm metal"],
  },
  {
    id: "residential",
    number: "03",
    category: "Hunian",
    type: "RESIDENTIAL / MATERIAL STUDY",
    name: "Ruang Rona",
    description: "Lapisan tekstur, cahaya dan furnitur yang menyatukan ritme keseharian.",
    image: media.living,
    alt: "Referensi ruang keluarga dengan aksen kayu dan cahaya alami",
    position: "center",
    brief: "Ruang keluarga membutuhkan area simpan dan area santai yang terasa lega, tanpa membuat bidang dinding dipenuhi furnitur terpisah.",
    response: "Jadikan satu bidang penyimpanan sebagai jangkar visual. Palet dan tekstur menjaga ritme tanpa menambah banyak objek.",
    considerations: ["Storage vertikal", "Tekstur natural", "Cahaya lembut"],
    materials: ["Natural oak", "Textured fabric", "Muted clay"],
  },
];

const services = [
  {
    number: "01",
    kicker: "START WITH THE SPACE",
    title: "Konsultasi & perencanaan",
    copy: "Mulai dari fungsi dan alur, bukan langsung memilih gaya visual. Kita petakan apa yang dibutuhkan ruang dan keputusan mana yang paling penting.",
    deliverables: ["Ringkasan kebutuhan ruang", "Alur aktivitas dan zoning awal", "Prioritas serta batas lingkup pekerjaan"],
    boundary: "Paling berguna saat brief masih belum terstruktur.",
    icon: <Ruler aria-hidden="true" />,
  },
  {
    number: "02",
    kicker: "TURN IDE INTO DECISIONS",
    title: "Desain & dokumentasi",
    copy: "Terjemahkan brief menjadi arah visual dan keputusan desain yang bisa dibaca, ditinjau, lalu dikembangkan.",
    deliverables: ["Arah visual dan palet material", "Pengembangan layout dan desain", "Gambar/detail sesuai lingkup yang disepakati"],
    boundary: "Jenis dan kedalaman dokumen ditentukan bersama di awal.",
    icon: <Layers3 aria-hidden="true" />,
  },
  {
    number: "03",
    kicker: "MADE FOR THE DIMENSION",
    title: "Furnitur custom",
    copy: "Rancang elemen yang merespons ukuran ruang, kebutuhan penyimpanan, ergonomi, dan kebiasaan penggunanya.",
    deliverables: ["Pemetaan fungsi dan dimensi", "Arah bentuk, material, dan hardware", "Detail rancangan serta spesifikasi"],
    boundary: "Produksi dan pemasangan dibahas sebagai lingkup terpisah.",
    icon: <MoveUpRight aria-hidden="true" />,
  },
];

const stages = [
  {
    number: "01",
    phase: "LISTEN / MAP",
    title: "Memahami konteks",
    copy: "Kondisi ruang, aktivitas, batas fisik, dan kebutuhan pengguna dibaca sebelum arah visual dipilih.",
    output: "Ringkasan kebutuhan + peta prioritas",
    involvement: "Menyediakan cerita penggunaan ruang, ukuran awal, foto, atau denah bila tersedia.",
  },
  {
    number: "02",
    phase: "FRAME / ALIGN",
    title: "Merumuskan arah",
    copy: "Temuan disusun menjadi prioritas, zoning, referensi visual, dan batas keputusan yang perlu disepakati.",
    output: "Arah konsep + keputusan lingkup",
    involvement: "Meninjau alternatif dan menyepakati arah yang akan dikembangkan.",
  },
  {
    number: "03",
    phase: "DESIGN / DETAIL",
    title: "Mengembangkan desain",
    copy: "Layout, proporsi, material, pencahayaan, dan detail dibangun saling berkaitan—bukan dipilih secara terpisah.",
    output: "Paket desain sesuai lingkup",
    involvement: "Memberi umpan balik pada checkpoint yang sudah ditetapkan.",
  },
  {
    number: "04",
    phase: "REVIEW / HANDOVER",
    title: "Menutup keputusan",
    copy: "Dokumen ditinjau, catatan terbuka dijelaskan, dan kebutuhan koordinasi berikutnya dipisahkan secara eksplisit.",
    output: "Rangkuman keputusan + dokumen handover",
    involvement: "Mengonfirmasi dokumen dan menyepakati langkah lanjutan bila diperlukan.",
  },
];

const faqs = [
  {
    category: "Kebutuhan",
    question: "Apa yang perlu disiapkan sebelum konsultasi pertama?",
    answer: "Mulai dari jenis ruang, lokasi, ukuran perkiraan, kondisi saat ini, aktivitas yang berlangsung, dan hal yang paling ingin diperbaiki. Foto atau denah membantu, tetapi tidak harus sempurna.",
  },
  {
    category: "Kebutuhan",
    question: "Bisa mulai meski belum punya denah?",
    answer: "Bisa. Ceritakan kondisi dan ukuran perkiraan terlebih dahulu. Denah, pengukuran ulang, atau survei dapat dibicarakan sebagai bagian lingkup jika memang dibutuhkan.",
  },
  {
    category: "Dokumen",
    question: "Apa yang termasuk dalam paket desain?",
    answer: "Jenis output mengikuti kebutuhan dan lingkup yang disepakati. Arah konsep, layout, visualisasi, gambar kerja, dan detail teknis bukan satu daftar otomatis untuk semua proyek.",
  },
  {
    category: "Dokumen",
    question: "Apakah visualisasi sama persis dengan hasil terbangun?",
    answer: "Tidak selalu. Visualisasi membantu menjelaskan arah desain. Kondisi lapangan, ketersediaan material, metode pelaksanaan, dan keputusan saat pengerjaan dapat memengaruhi hasil akhir.",
  },
  {
    category: "Pelaksanaan",
    question: "Apakah desain sudah termasuk kontraktor dan pembangunan?",
    answer: "Tidak otomatis. Desain, dokumentasi, pengadaan furnitur, koordinasi pelaksanaan, dan pekerjaan konstruksi memiliki tanggung jawab serta kebutuhan biaya yang berbeda.",
  },
  {
    category: "Pelaksanaan",
    question: "Bisa hanya memesan furnitur custom?",
    answer: "Bisa dibahas sebagai kebutuhan tersendiri. Dimensi, fungsi, material, hardware, detail rancangan, proses produksi, dan pemasangan perlu ditentukan sesuai lingkupnya.",
  },
  {
    category: "Demonstrasi",
    question: "Apakah studi ruang di halaman ini proyek klien?",
    answer: "Bukan. Nusa Forma adalah brand demonstrasi fiktif. Nama studi, narasi, dan komposisinya dibuat untuk menunjukkan pendekatan desain; foto merupakan referensi Unsplash, bukan dokumentasi proyek.",
  },
  {
    category: "Demonstrasi",
    question: "Apakah isian inquiry dikirim ke studio?",
    answer: "Tidak pada demonstrasi ini. Form hanya menyusun ringkasan kebutuhan di browser agar bisa disalin. Tidak ada pengiriman, penyimpanan, atau backend yang terhubung.",
  },
];

const materialPalettes = [
  {
    id: "natural",
    number: "01 / 03",
    name: "Natural warmth",
    title: "Kayu terang, tekstur lembut.",
    description: "Arah hangat yang mengandalkan serat kayu, tekstil bertekstur, dan permukaan batu bernuansa lembut. Cocok sebagai studi awal untuk ruang yang ingin terasa tenang tanpa kehilangan kedalaman.",
    image: media.living,
    alt: "Referensi ruang keluarga dengan kayu terang, tekstur lembut, dan cahaya alami",
    chips: [
      { label: "Oak", color: "#b18a61" },
      { label: "Linen", color: "#ded5c2" },
      { label: "Warm stone", color: "#a9a395" },
    ],
  },
  {
    id: "mineral",
    number: "02 / 03",
    name: "Mineral balance",
    title: "Batu matte, garis yang tenang.",
    description: "Permukaan mineral dan bidang yang lebih tegas membangun kontras yang tertata. Tekstur dijaga tetap terasa, sementara warna menjadi latar bagi bentuk dan cahaya.",
    image: media.material,
    alt: "Referensi interior dengan batu alam, kayu, dan perapian",
    chips: [
      { label: "Stone", color: "#8d8b82" },
      { label: "Charcoal", color: "#3b403b" },
      { label: "Dark oak", color: "#604832" },
    ],
  },
  {
    id: "earth",
    number: "03 / 03",
    name: "Earth in layers",
    title: "Warna tanah, lapisan yang hidup.",
    description: "Aksen terracotta dan serat alami memberi titik hangat. Kuncinya menjaga proporsi warna agar aksen terasa hadir tanpa mengambil alih seluruh ruang.",
    image: media.kitchen,
    alt: "Referensi ruang makan dan dapur terbuka dengan kayu hangat",
    chips: [
      { label: "Clay", color: "#a65b40" },
      { label: "Walnut", color: "#725139" },
      { label: "Woven", color: "#c5ad8d" },
    ],
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
        setScrolled(window.scrollY > 24);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="header-inner">
        <a href="#top" className="wordmark" onClick={closeMenu}>
          <span className="wordmark-name">nusa<span>forma</span></span>
          <span className="wordmark-sub">STUDIO / INTERIOR & RUANG</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className={open ? "nav-links is-open" : "nav-links"} aria-label="Navigasi utama">
          <a href="#studio" onClick={closeMenu}>Studio</a>
          <a href="#layanan" onClick={closeMenu}>Layanan</a>
          <a href="#karya" onClick={closeMenu}>Studi ruang</a>
          <a href="#proses" onClick={closeMenu}>Proses</a>
          <a className="nav-cta" href="#inquiry" onClick={closeMenu}>Mulai percakapan <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
      </div>
      <div className="reading-track" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    </header>
  );
}

function ProjectGallery() {
  const [filter, setFilter] = useState("Semua");
  const categories = ["Semua", "Hunian", "Komersial"];
  const visible = projects.filter((project) => filter === "Semua" || project.category === filter);

  return (
    <div className="gallery-wrap">
      <div className="gallery-controls" role="group" aria-label="Filter studi ruang">
        <div className="gallery-counter">
          <span className="gallery-count"><strong>{String(visible.length).padStart(2, "0")}</strong> STUDI TERPILIH</span>
          <span className="gallery-caption">CONCEPT INDEX / 2026</span>
        </div>
        <div className="filter-list" aria-label="Filter kategori studi">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={filter === category ? "filter-button is-active" : "filter-button"}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {visible.map((project, index) => (
          <motion.article
            layout
            key={project.number}
            className={index === 0 ? "project-card story-feature" : "project-card story-support"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-visual">
              <img src={project.image} alt={project.alt} loading="lazy" decoding="async" style={{ objectPosition: project.position }} />
              <span className="image-index">{project.number}</span>
              <span className="project-category">{project.category} / {project.type.split(" / ")[1]}</span>
            </div>

            <div className="project-story-copy">
              <div className="project-meta"><span>{project.type}</span><span>STUDY {project.number}</span></div>
              <h3>{project.name}</h3>
              <p className="project-deck">{project.description}</p>

              <div className="project-brief">
                <span className="micro-label">THE DESIGN QUESTION</span>
                <p>{project.brief}</p>
              </div>

              <details className="project-more">
                <summary>
                  <span>Baca arah desain</span>
                  <ArrowDown size={15} aria-hidden="true" />
                </summary>
                <div className="project-detail">
                  <span className="micro-label">SPATIAL RESPONSE</span>
                  <p>{project.response}</p>
                  <span className="micro-label">POINTS TO CONSIDER</span>
                  <ul className="project-considerations">
                    {project.considerations.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-materials">
                    {project.materials.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </details>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="visual-disclosure">
        <span className="disclosure-mark">NOTE / 01</span>
        <p>Studi di atas adalah konsep demonstrasi, bukan proyek yang sudah dibangun. Foto merupakan referensi visual Unsplash dan tidak menggambarkan hasil kerja Nusa Forma.</p>
      </div>
    </div>
  );
}

function MaterialPalette() {
  const [activePalette, setActivePalette] = useState("natural");
  const active = materialPalettes.find((palette) => palette.id === activePalette) ?? materialPalettes[0];

  return (
    <section className="material-section" aria-labelledby="material-title">
      <div className="wrap material-layout">
        <div className="material-visual">
          <img key={active.id} src={active.image} alt={active.alt} loading="lazy" decoding="async" />
          <span className="material-index">{active.number}</span>
          <span className="material-caption">MATERIAL DIRECTION / CONCEPTUAL</span>
        </div>
        <div className="material-copy">
          <Reveal>
            <p className="eyebrow">MATERIAL / DECISION LAB</p>
            <h2 id="material-title">Material punya karakter. <em>Ruang punya kebutuhan.</em></h2>
            <p className="material-intro">Palet bukan sekadar kumpulan warna. Ia perlu menjawab intensitas penggunaan, cahaya, perawatan, proporsi, dan suasana yang ingin dibangun.</p>
          </Reveal>

          <div className="material-picker" role="group" aria-label="Pilih arah palet material">
            {materialPalettes.map((palette) => (
              <button
                type="button"
                key={palette.id}
                className={activePalette === palette.id ? "material-option is-active" : "material-option"}
                aria-pressed={activePalette === palette.id}
                onClick={() => setActivePalette(palette.id)}
              >
                <span className="material-option-number">{palette.number}</span>
                <span>{palette.name}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="palette-detail" aria-live="polite">
            <span className="micro-label">CURRENT DIRECTION / {active.number}</span>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <div className="palette-swatches">
              {active.chips.map((chip) => (
                <span className="palette-chip" key={chip.label}>
                  <i style={{ backgroundColor: chip.color }} aria-hidden="true" />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
          <p className="material-disclosure">Palet dan gambar merupakan eksplorasi konsep, bukan daftar material yang dijamin tersedia atau spesifikasi final proyek.</p>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const categories = ["Semua", "Kebutuhan", "Dokumen", "Pelaksanaan", "Demonstrasi"];
  const [category, setCategory] = useState("Semua");
  const visibleFaqs = faqs.filter((faq) => category === "Semua" || faq.category === category);

  return (
    <section className="faq-section wrap" aria-labelledby="faq-title">
      <Reveal className="faq-heading">
        <p className="eyebrow">SCOPE DESK / 06</p>
        <h2 id="faq-title">Hal kecil yang perlu <em>jelas sejak awal.</em></h2>
        <p className="faq-intro">Ruang lingkup yang terang membuat keputusan desain lebih mudah ditinjau—dan ekspektasi lebih mudah dijaga.</p>
        <div className="faq-index-note">
          <span>08</span>
          <p>PERTANYAAN PRAKTIS<br />DIBAGI MENURUT TOPIK</p>
        </div>
      </Reveal>
      <div className="faq-workspace">
        <div className="faq-filter" role="group" aria-label="Filter pertanyaan">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "faq-filter-button is-active" : "faq-filter-button"}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="faq-list" aria-live="polite">
          {visibleFaqs.map((faq) => (
            <details className="faq-item" key={faq.question} name="nusa-faq">
              <summary>
                <span className="faq-number">{String(faqs.indexOf(faq) + 1).padStart(2, "0")}</span>
                <span className="faq-question-copy">
                  <span className="faq-category">{faq.category}</span>
                  <strong>{faq.question}</strong>
                </span>
                <i aria-hidden="true" />
              </summary>
              <div className="faq-answer"><p>{faq.answer}</p></div>
            </details>
          ))}
          {visibleFaqs.length === 0 && <p className="faq-empty">Tidak ada pertanyaan pada kategori ini.</p>}
        </div>
        <p className="faq-footnote">Masih ada konteks yang berbeda? Catat dulu kebutuhannya di bagian inquiry—tanpa harus sudah punya semua jawabannya.</p>
      </div>
    </section>
  );
}

function InquiryComposer() {
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const makeSummary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const type = String(data.get("type") ?? "");
    const location = String(data.get("location") ?? "").trim();
    const size = String(data.get("size") ?? "").trim();
    const budget = String(data.get("budget") ?? "Belum ditentukan");
    const needs = String(data.get("needs") ?? "").trim();

    const value = [
      "NUSA FORMA STUDIO — RINGKASAN KEBUTUHAN (DEMO)",
      `Jenis ruang: ${type}`,
      `Lokasi: ${location}`,
      `Ukuran perkiraan: ${size}`,
      `Kisaran anggaran: ${budget}`,
      `Kebutuhan utama: ${needs}`,
      "",
      "Catatan: Ringkasan dibuat lokal di browser. Tidak ada data yang dikirim atau disimpan.",
    ].join("\n");

    setSummary(value);
    setStatus("Ringkasan berhasil disusun di browser. Belum ada data yang dikirim atau disimpan.");
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const copySummary = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Ringkasan disalin ke clipboard.");
    } catch {
      resultRef.current?.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      if (resultRef.current) {
        range.selectNodeContents(resultRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setStatus("Clipboard tidak tersedia. Ringkasan dipilih; gunakan Ctrl/Cmd+C untuk menyalin.");
    }
  };

  const invalidate = () => {
    if (summary) {
      setSummary("");
      setStatus("Isian berubah. Susun ulang ringkasan sebelum menyalin.");
    }
  };

  return (
    <div className="inquiry-layout">
      <div className="inquiry-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> MULAI DARI KONTEKS</p>
        <h2 id="inquiry-title">Ceritakan ruang yang ingin <em>berubah.</em></h2>
        <p>Belum perlu punya semua jawaban. Mulai dari fungsi, kondisi, dan hal yang paling ingin diperbaiki.</p>
        <div className="inquiry-note"><span>01</span><p>Ringkasan ini hanya membantu menata kebutuhan awal. Ini bukan formulir pengiriman konsultasi.</p></div>
      </div>
      <div className="inquiry-panel">
        <form className="inquiry-form" onSubmit={makeSummary} onChange={invalidate}>
          <label>
            <span>Jenis ruang <b>*</b></span>
            <select name="type" required defaultValue="">
              <option value="" disabled>Pilih jenis ruang</option>
              <option>Hunian / rumah tinggal</option>
              <option>Ruang komersial</option>
              <option>Furnitur custom</option>
              <option>Lainnya / belum pasti</option>
            </select>
          </label>
          <label>
            <span>Lokasi proyek <b>*</b></span>
            <input name="location" type="text" placeholder="Kota / area" required autoComplete="address-level2" />
          </label>
          <div className="form-row">
            <label>
              <span>Ukuran perkiraan <b>*</b></span>
              <input name="size" type="text" placeholder="Contoh: 72 m²" required />
            </label>
            <label>
              <span>Kisaran anggaran</span>
              <select name="budget" defaultValue="">
                <option value="">Belum ditentukan</option>
                <option>Di bawah Rp50 juta</option>
                <option>Rp50–100 juta</option>
                <option>Rp100–250 juta</option>
                <option>Di atas Rp250 juta</option>
              </select>
            </label>
          </div>
          <label>
            <span>Kebutuhan utama <b>*</b></span>
            <textarea name="needs" rows={3} placeholder="Apa yang ingin terasa lebih baik dari ruang tersebut?" required />
          </label>
          <button className="button button-forest form-submit" type="submit">Susun ringkasan <ArrowUpRight size={16} aria-hidden="true" /></button>
        </form>

        <div className="summary-area" aria-live="polite">
          {summary ? (
            <div className="summary-result" tabIndex={-1} ref={resultRef}>
              <div className="summary-heading"><span>RINGKASAN SIAP</span><Check size={16} aria-hidden="true" /></div>
              <pre>{summary}</pre>
              <button type="button" className="copy-button" onClick={copySummary}><Copy size={15} aria-hidden="true" /> Salin ringkasan</button>
            </div>
          ) : (
            <p className="summary-placeholder">Ringkasan kebutuhan akan muncul di sini setelah isian dilengkapi.</p>
          )}
          <p className="form-status" role="status">{status}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <a href="#main" className="skip-link">Lewati ke konten</a>
      <div className="demo-note"><span>ADES / BUSINESS-06</span><span>DEMO BRAND · VISUAL KONSEPTUAL</span></div>
      <Header />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media">
            <img src={media.hero} alt="Ruang keluarga hangat dengan sofa netral, kabinet kayu, dan cahaya alami" fetchPriority="high" loading="eager" decoding="async" />
            <div className="hero-image-overlay" />
            <div className="hero-image-caption"><span>RUANG / CAHAYA / MATERIAL</span><span>VISUAL REFERENSI</span></div>
          </div>
          <div className="hero-content wrap">
            <Reveal className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> INTERIOR DESIGN / SPATIAL THINKING</p>
              <h1 id="hero-title">Ruang yang memahami <em>cara hidup.</em></h1>
              <p className="hero-lede">Kami memulai dari hal yang paling dekat: bagaimana ruang digunakan, apa yang perlu bekerja lebih baik, dan keputusan apa yang membuatnya terasa tepat.</p>
              <div className="hero-actions">
                <a href="#inquiry" className="button button-cream">Ceritakan kebutuhan <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a href="#studio" className="text-link text-link-light">Lihat pendekatan <ArrowDownRight size={15} aria-hidden="true" /></a>
              </div>
            </Reveal>
            <div className="hero-bottomline"><span>DESAIN INTERIOR · FURNITUR CUSTOM · RUANG KOMERSIAL</span><a href="#studio">GULIR UNTUK MENJELAJAHI <ArrowDown size={13} aria-hidden="true" /></a></div>
          </div>
          <span className="hero-vertical-label" aria-hidden="true">NUSA FORMA / STUDIO</span>
        </section>

        <section className="intro-band" id="studio" aria-labelledby="intro-title">
          <div className="wrap intro-grid">
            <Reveal><p className="eyebrow">CARA KAMI MELIHAT RUANG <span className="intro-number">01 / 04</span></p></Reveal>
            <Reveal delay={0.08}>
              <h2 id="intro-title">Desain bukan hanya tentang apa yang terlihat. Ia juga tentang <em>alur, kebiasaan, detail,</em> dan rasa nyaman yang terbentuk setiap hari.</h2>
              <p className="intro-footnote">Satu ruang, banyak keputusan. Kami membantu menata prioritas agar setiap keputusan punya alasan.</p>
            </Reveal>
          </div>
        </section>

        <section className="section projects-section wrap" id="karya" aria-labelledby="projects-title">
          <Reveal className="section-heading">
            <div>
              <p className="eyebrow">SELECTED CONCEPTS / 02</p>
              <h2 id="projects-title">Bukan hanya tampilan.<br /><em>Setiap ruang punya pertanyaan.</em></h2>
            </div>
            <p className="section-side-copy">Baca brief, respons spasial, dan pertimbangan di balik tiap studi. Ketiganya adalah eksplorasi konseptual, bukan klaim proyek terbangun.</p>
          </Reveal>
          <ProjectGallery />
        </section>

        <section className="services-section" id="layanan" aria-labelledby="services-title">
          <div className="wrap">
            <Reveal className="section-heading light-heading">
              <div>
                <p className="eyebrow">SERVICE ARCHITECTURE / 03</p>
                <h2 id="services-title">Mulai dari kebutuhan.<br /><em>Berhenti di lingkup yang jelas.</em></h2>
              </div>
              <p className="section-side-copy">Pilih titik masuk yang sesuai. Output, kedalaman dokumen, dan tanggung jawab ditetapkan sebelum pekerjaan dimulai.</p>
            </Reveal>
            <div className="service-grid">
              {services.map((service, index) => (
                <Reveal className={index === 1 ? "service-card service-card-light" : "service-card"} key={service.number} delay={index * 0.05}>
                  <div className="service-card-top">
                    <span className="service-number">{service.number}</span>
                    <span className="service-icon">{service.icon}</span>
                  </div>
                  <p className="service-kicker">{service.kicker}</p>
                  <h3>{service.title}</h3>
                  <p className="service-copy">{service.copy}</p>
                  <div className="service-output">
                    <span className="micro-label">POTENSI OUTPUT</span>
                    <ul>
                      {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <p className="service-boundary">{service.boundary}</p>
                  <a href="#inquiry" className="service-link">Bahas lingkup ini <ArrowUpRight size={15} aria-hidden="true" /></a>
                </Reveal>
              ))}
            </div>
            <p className="service-footnote">Produksi furnitur, kontraktor, pengadaan material, dan pekerjaan konstruksi tidak otomatis termasuk dalam lingkup desain.</p>
          </div>
        </section>

        <MaterialPalette />

        <section className="process-section" id="proses" aria-labelledby="process-title">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow">PROJECT LOGIC / 05</p>
                <h2 id="process-title">Empat checkpoint.<br /><em>Tidak ada keputusan lompat.</em></h2>
              </div>
              <p className="section-side-copy">Setiap tahap punya tujuan, keluaran, dan hal yang perlu disepakati sebelum berpindah ke tahap berikutnya.</p>
            </Reveal>
            <div className="process-track">
              {stages.map((stage, index) => (
                <Reveal className="process-step" key={stage.number} delay={index * 0.04}>
                  <div className="process-step-index">
                    <span>{stage.number}</span>
                    <i aria-hidden="true" />
                  </div>
                  <div className="process-step-main">
                    <span className="process-phase">{stage.phase}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.copy}</p>
                  </div>
                  <div className="process-checkpoint">
                    <span className="micro-label">CHECKPOINT / OUTPUT</span>
                    <strong>{stage.output}</strong>
                    <p><b>Peran klien</b> — {stage.involvement}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />

        <section className="inquiry-section" id="inquiry" aria-labelledby="inquiry-title">
          <div className="wrap"><InquiryComposer /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-main">
          <div>
            <a href="#top" className="wordmark footer-wordmark"><span className="wordmark-name">nusa<span>forma</span></span><span className="wordmark-sub">STUDIO / INTERIOR & RUANG</span></a>
            <p>Ruang yang dirancang dengan memahami<br />cara hidup di dalamnya.</p>
          </div>
          <div className="footer-nav">
            <span className="eyebrow">JELAJAHI</span>
            <a href="#studio">Studio</a><a href="#layanan">Layanan</a><a href="#karya">Studi ruang</a><a href="#proses">Proses</a>
          </div>
          <div className="footer-note">
            <span className="eyebrow">CATATAN DEMONSTRASI</span>
            <p>Nusa Forma adalah brand fiktif. Foto dan studi ruang merupakan visual referensi, bukan portofolio proyek klien.</p>
            <a href="#inquiry">Susun kebutuhan ruang <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© NUSA FORMA / ADES BUSINESS-06</span>
          <span>FOTO REFERENSI: CLAY BANKS · BILLY JO CATBAGAN · NEON WANG · PUSCAS ADRYAN / UNSPLASH</span>
          <a href="#top">Kembali ke atas ↑</a>
        </div>
      </footer>

      <div className="floating-index" aria-hidden="true"><span>NF</span><span>SPACE, MADE CONSIDERED.</span></div>
    </>
  );
}

export default App;
