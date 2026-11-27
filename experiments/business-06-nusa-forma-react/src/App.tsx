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
  },
];

const services = [
  {
    number: "01",
    title: "Konsultasi & perencanaan",
    copy: "Membaca konteks, aktivitas, ukuran, dan prioritas sebelum keputusan desain dibuat.",
    icon: <Ruler aria-hidden="true" />,
  },
  {
    number: "02",
    title: "Desain & dokumentasi",
    copy: "Mengembangkan konsep, gambar kerja, pilihan material, dan visualisasi yang terarah.",
    icon: <Layers3 aria-hidden="true" />,
  },
  {
    number: "03",
    title: "Furnitur custom",
    copy: "Rancangan furnitur yang merespons dimensi ruang, kebutuhan penyimpanan, dan kebiasaan.",
    icon: <MoveUpRight aria-hidden="true" />,
  },
];

const stages = [
  ["01", "Memahami", "Membaca konteks ruang, kebiasaan, batas dan kebutuhan utama."],
  ["02", "Merumuskan", "Menyusun prioritas, arah visual dan keputusan yang perlu disepakati."],
  ["03", "Mengembangkan", "Menerjemahkan arah menjadi konsep, detail dan dokumentasi."],
  ["04", "Menyepakati", "Menjelaskan lingkup lanjutan, koordinasi dan tanggung jawab."],
];

const faqs = [
  {
    question: "Apakah Nusa Forma menangani pembangunan?",
    answer: "Desain, dokumentasi, pengadaan furnitur, dan koordinasi pelaksanaan merupakan lingkup berbeda. Kebutuhan pelaksanaan perlu dibahas dan disepakati secara terpisah; desain tidak otomatis mencakup pekerjaan konstruksi.",
  },
  {
    question: "Informasi apa yang perlu disiapkan sebelum konsultasi?",
    answer: "Cukup mulai dari jenis ruang, lokasi, ukuran perkiraan, kondisi saat ini, kebutuhan utama, dan kisaran anggaran bila sudah tersedia. Foto atau denah akan membantu, tetapi tidak harus lengkap pada percakapan pertama.",
  },
  {
    question: "Apakah visual di halaman ini merupakan proyek yang sudah dibangun?",
    answer: "Tidak. Halaman ini adalah demonstrasi fiktif. Foto yang digunakan merupakan referensi visual Unsplash, bukan dokumentasi proyek Nusa Forma, bukan hasil kerja klien, dan bukan bukti hasil terbangun.",
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
        <a href="#top" className="wordmark" aria-label="Nusa Forma Studio — kembali ke atas" onClick={closeMenu}>
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
        <span className="gallery-count"><strong>{String(visible.length).padStart(2, "0")}</strong> STUDI</span>
        <div className="filter-list">
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
        {visible.map((project) => (
          <motion.article
            layout
            key={project.number}
            className={`project-card project-${project.number}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <a className="project-image" href="#inquiry" aria-label={`Siapkan kebutuhan ruang terinspirasi dari ${project.name}`}>
              <img src={project.image} alt={project.alt} loading="lazy" decoding="async" style={{ objectPosition: project.position }} />
              <span className="image-index">{project.number}</span>
              <span className="project-open" aria-hidden="true"><ArrowUpRight /></span>
            </a>
            <div className="project-meta"><span>{project.type}</span><span>{project.category.toUpperCase()}</span></div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </motion.article>
        ))}
      </div>
      <p className="visual-disclosure">Visual demonstrasi / foto referensi Unsplash. Bukan proyek klien, hasil terbangun, atau dokumentasi pekerjaan Nusa Forma.</p>
    </div>
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
  const reduceMotion = useReducedMotion();

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
              <h2 id="projects-title">Ide yang berangkat<br />dari <em>kebutuhan nyata.</em></h2>
            </div>
            <p className="section-side-copy">Tiga studi ruang demonstrasi. Setiap satu dimulai dari aktivitas, konteks, dan cara ruang perlu bekerja.</p>
          </Reveal>
          <ProjectGallery />
        </section>

        <section className="services-section" id="layanan" aria-labelledby="services-title">
          <div className="wrap">
            <Reveal className="section-heading light-heading">
              <div>
                <p className="eyebrow">WHAT WE DO / 03</p>
                <h2 id="services-title">Ruang punya banyak lapisan.<br /><em>Lingkup kerja harus jelas.</em></h2>
              </div>
              <p className="section-side-copy">Desain, dokumentasi, produksi furnitur, dan koordinasi pelaksanaan bukan satu paket otomatis.</p>
            </Reveal>
            <div className="service-list">
              {services.map((service, index) => (
                <Reveal className="service-row" key={service.number} delay={index * 0.05}>
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <a href="#inquiry" aria-label={`Tanyakan tentang ${service.title}`}><ArrowUpRight aria-hidden="true" /></a>
                </Reveal>
              ))}
            </div>
            <p className="service-footnote">Koordinasi pelaksanaan dapat dibahas sebagai lingkup terpisah setelah kebutuhan, tanggung jawab, dan pihak terkait jelas.</p>
          </div>
        </section>

        <section className="material-section wrap" aria-labelledby="material-title">
          <div className="material-image">
            <img src={media.living} alt="Referensi ruang dengan kombinasi kayu hangat, cahaya alami, dan tekstur lembut" loading="lazy" decoding="async" />
            <span className="material-caption">MATERIAL STUDY / 04</span>
          </div>
          <div className="material-copy">
            <Reveal>
              <p className="eyebrow">OUR APPROACH / 04</p>
              <h2 id="material-title">Detail yang baik dimulai dari <em>pertanyaan tepat.</em></h2>
              <p>Material tidak dipilih hanya karena tampilannya. Cahaya, intensitas penggunaan, perawatan, ukuran, dan konteks menentukan apakah sebuah keputusan benar-benar tepat.</p>
              <a href="#proses" className="text-link">Lihat bagaimana proses dibangun <ArrowRight size={15} aria-hidden="true" /></a>
            </Reveal>
            <div className="material-swatches" aria-label="Palet material konseptual">
              <span className="swatch swatch-stone" title="Batu" />
              <span className="swatch swatch-oak" title="Kayu" />
              <span className="swatch swatch-clay" title="Tanah" />
              <span className="swatch swatch-linen" title="Linen" />
              <span className="swatch-caption">STONE / OAK / EARTH / LINEN</span>
            </div>
          </div>
        </section>

        <section className="process-section" id="proses" aria-labelledby="process-title">
          <div className="wrap">
            <Reveal className="section-heading">
              <div>
                <p className="eyebrow">HOW IT TAKES SHAPE / 05</p>
                <h2 id="process-title">Jelas dari awal,<br /><em>bertahap dalam proses.</em></h2>
              </div>
              <p className="section-side-copy">Ruang yang baik lahir dari urutan keputusan yang bisa dipahami dan disepakati bersama.</p>
            </Reveal>
            <div className="process-grid">
              {stages.map(([number, title, copy], index) => (
                <Reveal className="process-card" key={number} delay={index * 0.06}>
                  <span className="process-number">{number}</span>
                  <span className="process-rule" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className="process-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section wrap" aria-labelledby="faq-title">
          <Reveal className="faq-heading">
            <p className="eyebrow">BEFORE WE BEGIN / 06</p>
            <h2 id="faq-title">Hal yang baik<br />untuk <em>dibicarakan.</em></h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question} name="nusa-faq">
                <summary><span>0{index + 1}</span><strong>{faq.question}</strong><i aria-hidden="true" /></summary>
                <div className="faq-answer"><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
        </section>

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
