import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// ==========================================
// 1. DATABASE BAHASA & TEKS (KAMUS LENGKAP + TAMBAHAN SUBS)
// ==========================================
const resources = {
  ID: {
    // Navigasi
    dashboard: "DASHBOARD",
    jobs: "DAFTAR PEKERJAAN",
    customers: "DATABASE KLIEN",
    finance: "KEUANGAN",
    profile: "PENGATURAN",
    logout: "KELUAR SISTEM",
    copy_sheets: "SALIN DATA KE EXCEL",
    loading: "MEMUAT SISTEM LAVO...",
    
    // Dashboard Stats
    actions_today: "TINDAKAN PERLU DICEK",
    actions_sub: "Daftar prioritas operasional hari ini",
    late_ok: "AMAN (TIDAK ADA TELAT)",
    late_warn: "PERINGATAN: ADA JOB TELAT",
    unpaid_ok: "KEUANGAN AMAN (LUNAS)",
    unpaid_warn: "ADA TAGIHAN BELUM LUNAS",
    loyal: "PELANGGAN SETIA (LOYAL)",
    top_svc: "TOP 3 LAYANAN TERLARIS",
    health_biz: "KESEHATAN BISNIS",
    net_profit: "PROFIT BERSIH (CASH FLOW)",
    paid_rev: "PEMASUKAN (SUDAH BAYAR)",
    receivable: "PIUTANG (BELUM BAYAR)",
    total_exp: "TOTAL PENGELUARAN",
    
    // Job Tracker
    tracker_title: "DAFTAR PEKERJAAN AKTIF",
    new_job: "+ BUAT ORDER BARU",
    search_job: "Cari Nama / No. HP / Kode Ticket...",
    no_jobs: "Belum ada pekerjaan yang tercatat saat ini.",
    
    // Status Labels
    st_wait: "MENUNGGU",
    st_proc: "DIPROSES",
    st_done: "SELESAI",
    st_cancel: "BATAL",
    pay_unpaid: "BELUM BAYAR",
    pay_dp: "DP / PANJAR",
    pay_paid: "LUNAS",
    
    // Customers
    cust_title: "DATABASE PELANGGAN",
    new_cust: "+ TAMBAH KLIEN BARU",
    search_cust: "Cari nama pelanggan...",
    col_name: "NAMA LENGKAP",
    col_wa: "NOMOR WHATSAPP",
    col_order: "TOTAL ORDER",
    col_spent: "TOTAL BELANJA (LIFETIME)",
    col_status: "STATUS MEMBER",
    verified: "TERVERIFIKASI",
    edit: "UBAH",
    delete: "HAPUS",
    
    // Finance
    finance_cost: "PENGELUARAN BULAN INI",
    finance_cat: "POS PENGELUARAN TERBESAR",
    add_cost: "+ CATAT PENGELUARAN",
    col_date: "TANGGAL",
    col_need: "KEPERLUAN",
    col_cat: "KATEGORI",
    col_nom: "NOMINAL (Rp)",
    no_cost: "Belum ada data pengeluaran tercatat.",

    // Profile & Settings
    prof_title: "PROFIL & PENGATURAN TOKO",
    prof_sub: "Kelola informasi bisnis dan layanan Anda.",
    lang_label: "Bahasa Aplikasi",
    lang_btn: "GANTI KE BAHASA INGGRIS",
    brand_nm: "NAMA BRAND / USAHA",
    addr_nm: "ALAMAT LENGKAP TOKO",
    save_btn: "SIMPAN SEMUA PERUBAHAN",
    
    // Services
    svc_title: "DAFTAR HARGA LAYANAN (OTOMATIS)",
    svc_desc: "Tambahkan layanan di bawah ini agar muncul otomatis saat membuat order baru. (Unlimited)",
    svc_name_ph: "Nama Layanan (Cth: Cuci Komplit)",
    svc_price_ph: "Harga (Rp)",
    svc_unit_ph: "Satuan (Kg/Pcs)",
    add_svc: "TAMBAH LAYANAN KE DAFTAR",
    
    // Subscription & Legal (DITAMBAHKAN SESUAI REQUEST)
    subs_section: "STATUS LANGGANAN & LISENSI",
    subs_active_until: "Paket Aktif Sampai:",
    subs_input_label: "Punya Kode Lisensi? Masukkan di sini:",
    subs_btn: "AKTIFKAN PAKET",
    unsub_btn: "BERHENTI LANGGANAN (UNSUBSCRIBE)", 
    unsub_confirm: "Yakin ingin berhenti? Fitur premium akan hilang setelah masa aktif habis.", 
    unsub_success: "Perpanjangan otomatis telah dimatikan.",
    legal_section: "LEGAL & PRIVASI",
    legal_terms: "Syarat & Ketentuan",
    legal_privacy: "Kebijakan Privasi",
    legal_eula: "Perjanjian Lisensi (EULA)",
    
    // Modals
    input_order: "INPUT ORDER PELANGGAN BARU",
    select_cust: "-- Pilih Pelanggan Dari Database --",
    select_svc: "-- Pilih Layanan Otomatis --",
    manual_mode: "Klik untuk Input Manual",
    auto_mode: "Klik untuk Pilih dari Daftar",
    manual_label: "Ketik Nama Layanan Manual...",
    qty: "Jumlah (Qty)",
    total: "Total Tagihan (Rp)",
    pic: "Nama Staff (PIC)",
    deadline: "Tenggat Waktu Selesai",
    save_order: "SIMPAN ORDER SEKARANG",
    
    input_cust: "REGISTRASI PELANGGAN BARU",
    ph_name: "Nama Lengkap",
    ph_wa: "WhatsApp (08xx...)",
    ph_note: "Catatan (Alergi/Request)",
    save_cust: "SIMPAN DATA PELANGGAN",
    
    input_cost: "CATAT BIAYA OPERASIONAL",
    ph_item: "Nama Barang / Jasa",
    save_cost: "SIMPAN PENGELUARAN",
    
    ticket: "NOMOR TIKET #",
    invoice_wa: "KIRIM INVOICE WA",
    chat_wa: "CHAT PELANGGAN",
    delete_job: "HAPUS ORDER (PERMANEN)",
    close: "TUTUP"
  },
  EN: {
    dashboard: "DASHBOARD", jobs: "JOB TRACKER", customers: "CUSTOMERS", finance: "FINANCE", profile: "SETTINGS",
    logout: "LOGOUT", copy_sheets: "EXPORT DATA", loading: "LOADING SYSTEM...",
    actions_today: "ACTIONS NEEDED", actions_sub: "Priority tasks",
    late_ok: "NO LATE JOBS", late_warn: "LATE JOBS DETECTED",
    unpaid_ok: "ALL PAID", unpaid_warn: "UNPAID INVOICES",
    loyal: "LOYAL CLIENTS", top_svc: "TOP SERVICES",
    health_biz: "BUSINESS HEALTH", net_profit: "NET PROFIT", paid_rev: "REVENUE",
    receivable: "RECEIVABLES", total_exp: "TOTAL EXPENSES",
    tracker_title: "ACTIVE JOBS", new_job: "+ NEW ORDER", search_job: "Search...",
    no_jobs: "No jobs found.", st_wait: "WAITING", st_proc: "PROCESSING",
    st_done: "COMPLETED", st_cancel: "CANCELLED", pay_unpaid: "UNPAID",
    pay_dp: "DEPOSIT", pay_paid: "PAID", cust_title: "CLIENT DATABASE",
    new_cust: "+ ADD CLIENT", search_cust: "Search client...", col_name: "NAME",
    col_wa: "WHATSAPP", col_order: "ORDERS", col_spent: "SPENT", col_status: "STATUS",
    verified: "VERIFIED", edit: "EDIT", delete: "DELETE",
    finance_cost: "MONTHLY COST", finance_cat: "TOP CATEGORY", add_cost: "+ EXPENSE",
    col_date: "DATE", col_need: "ITEM", col_cat: "CATEGORY", col_nom: "AMOUNT",
    no_cost: "No data.", 
    prof_title: "BUSINESS PROFILE", prof_sub: "Manage your business info and services.",
    lang_label: "App Language", lang_btn: "SWITCH TO INDONESIAN",
    brand_nm: "BRAND NAME", addr_nm: "ADDRESS", save_btn: "SAVE CHANGES",
    svc_title: "SERVICE PRICING", svc_desc: "Manage automated services.",
    svc_name_ph: "Service Name", svc_price_ph: "Price", svc_unit_ph: "Unit",
    add_svc: "ADD SERVICE", 
    subs_section: "SUBSCRIPTION & LICENSE",
    subs_active_until: "Plan Active Until:",
    subs_input_label: "Have a License Key? Enter here:",
    subs_btn: "ACTIVATE PLAN",
    unsub_btn: "UNSUBSCRIBE (CANCEL AUTO-RENEWAL)", unsub_confirm: "Are you sure?", unsub_success: "Auto-renewal cancelled.",
    legal_section: "LEGAL & PRIVACY",
    legal_terms: "Terms & Conditions",
    legal_privacy: "Privacy Policy",
    legal_eula: "End User License Agreement (EULA)",
    input_order: "NEW ORDER", select_cust: "-- Select Customer --",
    select_svc: "-- Select Service --", manual_mode: "Manual Input", auto_mode: "Auto Select",
    manual_label: "Service Name", qty: "Qty", total: "Total", pic: "Staff PIC",
    deadline: "Deadline", save_order: "SAVE ORDER", input_cust: "NEW CLIENT",
    ph_name: "Name", ph_wa: "WhatsApp", ph_note: "Notes", save_cust: "SAVE CLIENT",
    input_cost: "RECORD EXPENSE", ph_item: "Item", save_cost: "SAVE EXPENSE",
    ticket: "TICKET #", invoice_wa: "SEND INVOICE", chat_wa: "CHAT CLIENT",
    delete_job: "DELETE JOB", close: "CLOSE"
  }
}

// ==========================================
// 2. LANDING PAGE (GLOWING DESIGN RESTORED)
// ==========================================
const LandingPage = ({ onLeadSubmit }) => {
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '' });
  const myWhatsApp = "6285784845203"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    onLeadSubmit(leadForm);
    setLeadForm({ name: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-blue-100 scroll-smooth text-slate-800">
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 p-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">
          <div className="text-white animate-in slide-in-from-left duration-1000">
            <h1 className="text-9xl font-black italic tracking-tighter mb-4 uppercase leading-none drop-shadow-lg">Lavo.</h1>
            <p className="text-3xl font-bold opacity-95 leading-tight mb-8 italic uppercase tracking-tight">
              Satu-satunya Platform <span className="text-blue-200 underline decoration-blue-300 decoration-4 underline-offset-4">Anti-Chaos</span> Untuk Bisnis Jasa UMKM.
            </p>
            <p className="text-lg font-medium opacity-80 mb-10 max-w-md">
              Kelola cucian, lacak staf, pantau piutang, dan kirim invoice WhatsApp otomatis dalam satu genggaman tangan.
            </p>
            <div className="flex gap-4">
              <a href="#pricing" className="bg-white text-blue-600 px-10 py-5 rounded-[30px] font-black uppercase italic tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Lihat Paket
              </a>
              <a href={`https://wa.me/${myWhatsApp}`} target="_blank" className="bg-blue-700 text-white px-10 py-5 rounded-[30px] font-black uppercase italic tracking-widest text-xs border border-blue-500 hover:bg-blue-800 transition-all flex items-center gap-2 shadow-xl">
                <span>Chat Admin</span> <span className="text-green-400 animate-pulse">●</span>
              </a>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl p-12 rounded-[70px] shadow-2xl border-4 border-blue-100 scale-105 animate-in zoom-in duration-700">
             <h2 className="text-2xl font-black text-slate-800 italic uppercase mb-10 text-center tracking-tighter">Login Pemilik Bisnis</h2>
             <Auth 
               supabaseClient={supabase} 
               appearance={{ 
                 theme: ThemeSupa, 
                 variables: { 
                   default: { 
                     colors: { brand: '#2563eb', brandAccent: '#1d4ed8', inputBackground: 'white', inputText: 'black' },
                     radii: { borderRadiusButton: '20px', inputBorderRadius: '20px' }
                   } 
                 } 
               }} 
               providers={[]} 
             />
             <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
               Belum punya akun? Klik Sign Up di atas
             </p>
          </div>
        </div>
      </div>

      {/* PRICING SECTION */}
      <div id="pricing" className="max-w-7xl mx-auto py-40 px-8">
        <div className="text-center mb-24">
          <h2 className="text-6xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">HARGA PAKET SUKSES</h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic underline decoration-blue-500 decoration-4 underline-offset-8">
            Semua paket termasuk Free Trial 14 Hari
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* PACKAGE 1: STANDARD */}
          <div className="bg-white p-14 rounded-[70px] border-2 border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-slate-800 italic uppercase mb-2 tracking-tighter">🔹 STANDARD</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Fokus pada Operasional Dasar</p>
            </div>
            <div className="mb-12">
              <span className="text-blue-600 font-black text-6xl tracking-tighter italic">300rb</span>
              <span className="text-slate-400 font-bold ml-2 italic text-lg">/bulan</span>
            </div>
            <ul className="space-y-6 mb-14 text-slate-600 font-bold text-sm">
              <li className="flex items-center gap-4">✅ <span>Semua Core Fitur (Jobs & Klien)</span></li>
              <li className="flex items-center gap-4">✅ <span>Unlimited Data Pelanggan</span></li>
              <li className="flex items-center gap-4">✅ <span>Update Umum Berkala</span></li>
              <li className="flex items-center gap-4">✅ <span>Akses 1-2 User (Staf)</span></li>
            </ul>
            <div className="pt-10 border-t border-slate-50">
              <p className="text-[11px] text-slate-300 font-black uppercase italic mb-8">📌 Biaya Setup: Rp 1jt (Sekali bayar)</p>
              <a href="#contact" className="block text-center bg-slate-900 text-white py-6 rounded-3xl font-black uppercase italic tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl">
                Pilih Paket Standard
              </a>
            </div>
          </div>

          {/* PACKAGE 2: PRO (REKOMENDASI) */}
          <div className="bg-white p-16 rounded-[70px] border-4 border-blue-600 shadow-2xl relative scale-105 z-20">
            <div className="absolute top-10 right-[-40px] bg-blue-600 text-white py-2 px-16 rotate-45 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg italic">
              REKOMENDASI
            </div>
            <div className="mb-10">
              <h3 className="text-3xl font-black text-slate-800 italic uppercase mb-2 tracking-tighter">🔹 PRO</h3>
              <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest">Optimasi Bisnis Tingkat Tinggi</p>
            </div>
            <div className="mb-12">
              <span className="text-blue-600 font-black text-7xl tracking-tighter italic">500rb</span>
              <span className="text-slate-400 font-bold ml-2 italic text-lg">/bulan</span>
            </div>
            <ul className="space-y-6 mb-14 text-slate-700 font-bold text-sm">
              <li className="flex items-center gap-4 text-blue-600 font-black italic">🔥 <span>Operational Alerts (Action List)</span></li>
              <li className="flex items-center gap-4 text-blue-600 font-black italic">🔥 <span>Insight Dashboard (Repeat Buyer)</span></li>
              <li className="flex items-center gap-4">✅ <span>Job Timeline & Analytics</span></li>
              <li className="flex items-center gap-4">✅ <span>Akses 3-5 User (Staf)</span></li>
              <li className="flex items-center gap-4">✅ <span>Priority Support VIP</span></li>
            </ul>
            <div className="pt-10 border-t border-slate-50">
              <p className="text-[11px] text-slate-300 font-black uppercase italic mb-8">📌 Biaya Setup: Rp 1jt (Sekali bayar)</p>
              <a href="#contact" className="block text-center bg-blue-600 text-white py-6 rounded-3xl font-black uppercase italic tracking-widest text-xs shadow-2xl shadow-blue-300 hover:bg-blue-700 transition-all">
                Sikat Paket PRO
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE */}
      <div id="contact" className="bg-slate-900 py-40 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="text-white">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-8">Gratis Konsultasi</h2>
            <p className="text-slate-400 font-bold leading-relaxed mb-12 italic text-lg">
              Tinggalkan data kamu, kami akan membantu setup digitalisasi operasional bisnis kamu secara personal.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black">@</div>
                <p className="font-bold text-lg">lavo.automation@gmail.com</p>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black">WA</div>
                <p className="font-bold text-lg">+62 0857-8484-5203</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-14 rounded-[60px] space-y-5 shadow-2xl shadow-black/50">
            <h4 className="text-xl font-black italic uppercase text-slate-800 mb-4 tracking-tighter">Dapatkan Free Trial 14 Hari</h4>
            <input required type="text" placeholder="Nama Lengkap" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-inner" />
            <input required type="email" placeholder="Email Aktif" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-inner" />
            <input required type="text" placeholder="No. WhatsApp (08xx)" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-6 font-bold outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-inner" />
            <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[30px] font-black uppercase italic tracking-widest text-sm shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all">Kirim Data & Aktivasi</button>
          </form>
        </div>
      </div>
      
      <footer className="py-24 text-center bg-white border-t border-slate-100">
        <h4 className="text-3xl font-black text-blue-600 italic tracking-tighter uppercase mb-4">Lavo.</h4>
        <p className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.4em] mb-8">Empowering UMKM Indonesia</p>
        <p className="text-slate-300 font-bold text-[9px] uppercase tracking-widest">© 2026 Abednego Dave. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

// ==========================================
// 3. MAIN APP COMPONENT (DASHBOARD & OPERASIONAL)
// ==========================================
export default function App() {
  const [session, setSession] = useState(null)
  const [view, setView] = useState('dashboard') 
  const [customers, setCustomers] = useState([])
  const [jobs, setJobs] = useState([])
  const [expenses, setExpenses] = useState([])
  
  // SAFE DEFAULT STATE untuk mencegah BLANK & Error saat array kosong
  const [profile, setProfile] = useState({ 
    business_name: 'Lavo.', 
    address: '', 
    language: 'ID', 
    services: [], // Default array kosong
    subscription_tier: 'free_trial',
    subscription_end_date: new Date().toISOString(),
    auto_renew: true // Tambahan untuk Unsubscribe
  })
  
  const [licenseKey, setLicenseKey] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [jobSearchTerm, setJobSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState(null)
  
  // STATE KHUSUS: TOGGLE MANUAL ORDER & TAMBAH LAYANAN
  const [isManualService, setIsManualService] = useState(false)
  const [newService, setNewService] = useState({ name: '', price: '', unit: '' })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => 2026 + i)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  // MODAL STATES
  const [showCustModal, setShowCustModal] = useState(false)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showExpModal, setShowExpModal] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false) 
  const [editCustData, setEditCustData] = useState(null)
  const [showLegal, setShowLegal] = useState(null) // Tambahan untuk Legal Modal

  // FORM STATES
  const [custForm, setCustForm] = useState({ name: '', contact: '', notes: '' })
  
  const [jobForm, setJobForm] = useState({ 
      customer_id: '', 
      service_name: '', 
      qty: 1, 
      price: 0, 
      deadline: '', 
      payment_status: 'Belum', 
      status: 'Menunggu', 
      pic: 'Owner' 
  })
  
  const [expForm, setExpForm] = useState({ 
      expense_name: '', 
      amount: 0, 
      category: 'Operasional', 
      date: new Date().toISOString().split('T')[0] 
  })

  // --- SUBSCRIPTION LOGIC ---
  const todayDate = new Date();
  const subEndDate = new Date(profile.subscription_end_date);
  const daysLeft = Math.ceil((subEndDate - todayDate) / (1000 * 60 * 60 * 24));
  const isExpired = daysLeft < 0;
  
  // Badge Function
  const getBadgeInfo = () => {
    const tier = (profile.subscription_tier || 'free_trial').toUpperCase();
    let color = "bg-yellow-400 text-slate-900"; // Default Trial
    if(tier === 'STANDARD') color = "bg-blue-600 text-white";
    if(tier === 'PRO') color = "bg-slate-900 text-white border border-yellow-400";
    
    if(isExpired) return { text: `EXPIRED (${tier})`, color: "bg-red-600 text-white" };
    return { text: `${tier} • ${daysLeft} HARI`, color: color };
  }

  // --- FETCH DATA (LOAD DARI DB) ---
  const fetchData = async () => {
    try {
      const { data: cData } = await supabase.from('customers').select('*').order('name', { ascending: true })
      const { data: jData } = await supabase.from('jobs').select('*, customers(*)').order('deadline', { ascending: true })
      const { data: eData } = await supabase.from('expenses').select('*').order('date', { ascending: false })
      const { data: pData } = await supabase.from('profiles').select('*').maybeSingle()
      
      if (cData) setCustomers(cData)
      if (jData) setJobs(jData)
      if (eData) setExpenses(eData)
      
      // FIX KRUSIAL: Pastikan Services Array tidak null
      if (pData) {
          setProfile(prev => ({ 
              ...prev, 
              ...pData, 
              services: Array.isArray(pData.services) ? pData.services : [],
              // Default trial jika null
              subscription_tier: pData.subscription_tier || 'free_trial',
              subscription_end_date: pData.subscription_end_date || new Date(Date.now() + 14*24*60*60*1000).toISOString(),
              auto_renew: pData.auto_renew ?? true
          }))
      }
    } catch (e) { console.error("Fetch Error:", e) }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); if (session) fetchData(); setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); if (session) fetchData()
    })
    return () => subscription.unsubscribe()
  }, [])

  // --- LOGIC HELPERS ---
  const t = (key) => {
      const lang = profile?.language || 'ID';
      return resources[lang] ? (resources[lang][key] || key) : key; 
  }

  const getTopServices = () => {
    if (!jobs || jobs.length === 0) return [];
    const stats = jobs.reduce((acc, curr) => {
      const svc = curr.service_name || 'Unknown';
      acc[svc] = acc[svc] || { count: 0 };
      acc[svc].count += 1;
      return acc;
    }, {});
    return Object.entries(stats).sort((a, b) => b[1].count - a[1].count).slice(0, 3);
  };

  const formatDateIndo = (dateStr) => {
      if(!dateStr) return "-";
      try { const d = new Date(dateStr); return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }); } catch (e) { return dateStr; }
  }

  // --- FILTERING & SEARCH ---
  const today = new Date().toISOString().split('T')[0];
  const filteredJobs = (jobs || []).filter(j => {
    const d = new Date(j.deadline);
    const dateMatch = (d.getMonth() + 1) === Number(selectedMonth) && d.getFullYear() === Number(selectedYear);
    const s = jobSearchTerm.toLowerCase();
    const searchMatch = !s || 
        (j.customers?.name || '').toLowerCase().includes(s) || 
        (j.id || '').toLowerCase().includes(s) || 
        (j.service_name || '').toLowerCase().includes(s);
    return dateMatch && searchMatch;
  })
  
  const filteredExpenses = (expenses || []).filter(e => {
    const d = new Date(e.date);
    return (d.getMonth() + 1) === Number(selectedMonth) && d.getFullYear() === Number(selectedYear);
  })

  // --- METRIKS DASHBOARD ---
  const listLate = filteredJobs.filter(j => j.deadline < today && j.status !== 'Selesai' && j.status !== 'Batal');
  const listUnpaid = filteredJobs.filter(j => j.status === 'Selesai' && j.payment_status !== 'Lunas');
  const totalTasks = listLate.length + listUnpaid.length;
  
  const revenueLunas = filteredJobs.filter(j => j.payment_status === 'Lunas').reduce((acc, curr) => acc + Number(curr.price), 0);
  const totalPiutang = filteredJobs.filter(j => j.payment_status !== 'Lunas').reduce((acc, curr) => acc + Number(curr.price), 0);
  const totalExp = filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const netProfit = revenueLunas - totalExp;
  
  const loyalCustomersCount = Object.values((jobs || []).reduce((acc, curr) => { 
      if(curr.customer_id) acc[curr.customer_id] = (acc[curr.customer_id] || 0) + 1; 
      return acc; 
  }, {})).filter(count => count > 1).length;

  const getTopCategory = () => {
      if (filteredExpenses.length === 0) return "-";
      const catStats = filteredExpenses.reduce((acc, curr) => { 
          acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount); 
          return acc; 
      }, {});
      return Object.keys(catStats).length > 0 
          ? Object.keys(catStats).reduce((a, b) => catStats[a] > catStats[b] ? a : b)
          : "-";
  }

  // ==========================================
  // 4. ACTION HANDLERS (FUNGSI TOMBOL)
  // ==========================================

  const handleLeadSubmit = async (d) => { await supabase.from('leads').insert([d]); alert("Data Terkirim!"); }
  const handleAddCust = async (e) => { 
      e.preventDefault(); 
      if (editCustData) { await supabase.from('customers').update(custForm).eq('id', editCustData.id) } 
      else { await supabase.from('customers').insert([{ ...custForm, owner_id: session.user.id }]) } 
      setShowCustModal(false); fetchData(); 
  }
  const handleDeleteCust = async (id) => { if (window.confirm("Yakin hapus pelanggan?")) { await supabase.from('customers').delete().eq('id', id); fetchData(); } }

  // --- SAVE PROFILE SERVICE (FIX PERSISTENCE) ---
  const saveProfile = async (e) => { 
      e.preventDefault(); 
      const updates = {
          id: session.user.id,
          business_name: profile.business_name,
          address: profile.address,
          language: profile.language,
          services: profile.services || [], // Array ini wajib dikirim agar tidak hilang
          updated_at: new Date()
      };
      
      const { error } = await supabase.from('profiles').upsert(updates);
      
      if(error) {
          alert(`Gagal Simpan: ${error.message}.`);
      } else { 
          alert("Profil & Layanan Berhasil Disimpan!"); 
          fetchData(); 
      }
  }

  // --- ACTIVATE LICENSE (MENGGUNAKAN RPC) ---
  const handleActivateLicense = async (e) => {
      e.preventDefault();
      setLoading(true);
      const { data, error } = await supabase.rpc('redeem_license_key', { user_input_key: licenseKey, user_id: session.user.id });
      setLoading(false);
      
      if(error) alert("Error: " + error.message);
      else if(data === 'INVALID') alert("Kode Lisensi Tidak Valid!");
      else {
          alert("Paket Berhasil Diaktifkan!");
          setLicenseKey('');
          fetchData();
      }
  }

  // --- UNSUBSCRIBE HANDLER (BARU) ---
  const handleUnsubscribe = async () => {
      if(window.confirm(t('unsub_confirm'))) {
          const { error } = await supabase.from('profiles').update({ auto_renew: false }).eq('id', session.user.id);
          if(error) alert("Gagal unsubscribe: " + error.message);
          else {
              setProfile(prev => ({...prev, auto_renew: false}));
              alert(t('unsub_success') || "Berhenti langganan sukses.");
          }
      }
  }

  // --- ADD SERVICE TO LIST (FIX UNLIMITED) ---
  const addServiceToList = (e) => {
      e.preventDefault();
      if(!newService.name || !newService.price) return;
      const updatedServices = [...(profile.services || []), newService];
      setProfile({ ...profile, services: updatedServices }); 
      setNewService({ name: '', price: '', unit: '' }); 
  }

  const removeService = (index) => {
      const updatedServices = profile.services.filter((_, i) => i !== index);
      setProfile({ ...profile, services: updatedServices });
  }

  // --- SAVE NEW ORDER (FIX ERROR QTY) ---
  const handleSaveOrder = async (e) => {
      e.preventDefault();
      if (isExpired) return alert("Paket Berakhir. Harap perpanjang di menu Pengaturan.");
      if(!jobForm.customer_id) return alert("Pilih pelanggan dulu!");
      if(!jobForm.service_name) return alert("Isi nama layanan!");

      const { error } = await supabase.from('jobs').insert([{ ...jobForm, owner_id: session.user.id }]);
      if (error) { 
          alert(`GAGAL SIMPAN: ${error.message}`); 
      } else {
          alert("Order Berhasil Dibuat!");
          fetchData(); setShowJobModal(false);
          setJobForm({ ...jobForm, service_name: '', price: 0, qty: 1 });
      }
  }

  const handleQuickUpdate = async (id, field, value) => {
      setJobs(currentJobs => currentJobs.map(j => j.id === id ? { ...j, [field]: value } : j));
      const { error } = await supabase.from('jobs').update({ [field]: value }).eq('id', id);
      if (error) { alert("Gagal update. Cek koneksi."); fetchData(); }
  }

  const deleteJob = async (id) => { if(window.confirm("Hapus permanen?")) { await supabase.from('jobs').delete().eq('id', id); fetchData(); } }

  const sendInvoice = (job) => {
      const phone = job.customers?.contact ? job.customers.contact.replace(/^0/, '62') : '';
      let msg = job.status === 'Selesai' 
        ? `Halo ${job.customers?.name}, order *${job.service_name}* sudah SELESAI. Total: Rp ${Number(job.price).toLocaleString()}.`
        : `Halo ${job.customers?.name}, order *${job.service_name}* status: ${job.status}. Terima kasih.`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  if (loading) return <div className="flex h-screen items-center justify-center text-blue-600 font-black animate-pulse text-xl italic uppercase">{t('loading')}</div>
  if (!session) return <LandingPage onLeadSubmit={handleLeadSubmit} />

  // ==========================================
  // 5. RENDER UI
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 text-slate-800 pb-20">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm font-black">
        <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic uppercase cursor-pointer" onClick={() => setView('dashboard')}>{profile.business_name}</h1>
            
            {/* BADGE DI SEBELAH NAMA BRAND */}
            <div className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${getBadgeInfo().color}`}>
                {getBadgeInfo().text}
            </div>

            <div className="hidden lg:flex bg-slate-100 p-1 rounded-2xl font-black ml-4">
                {['dashboard', 'jobs', 'customers', 'finance', 'profile'].map((v) => (
                    <button key={v} onClick={() => setView(v)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>{t(v)}</button>
                ))}
            </div>
        </div>
        <div className="flex gap-4 font-black"><button onClick={() => { let tsv = "Item\tNominal\tStatus\n"; filteredJobs.forEach(j => tsv += `${j.service_name}\t${j.price}\t${j.status}\n`); navigator.clipboard.writeText(tsv); alert("Tersalin!"); }} className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase shadow-sm italic">{t('copy_sheets')}</button><button onClick={() => supabase.auth.signOut()} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-2xl font-bold text-[10px] uppercase italic">{t('logout')}</button></div>
      </nav>

      {/* FILTER PERIODE */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center gap-4 sticky top-[73px] z-40 font-black italic uppercase"><p className="text-[10px] text-slate-400 tracking-widest">PERIODE:</p><select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-slate-50 border-none rounded-xl text-xs font-bold p-2 outline-none">{months.map((m, i) => (<option key={i} value={i+1}>{m}</option>))}</select><select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-slate-50 border-none rounded-xl text-xs font-bold p-2 outline-none cursor-pointer">{years.map(y => <option key={y} value={y}>{y}</option>)}</select></div>

      <main className="p-8 md:p-12 max-w-7xl mx-auto">
        
        {/* VIEW: DASHBOARD */}
        {view === 'dashboard' && (
          <div className="animate-in fade-in duration-700 font-black italic uppercase">
            <div className="mb-10 flex gap-4 overflow-x-auto pb-4 items-center">
              <button onClick={() => setShowActionModal(true)} className={`px-8 py-5 rounded-[32px] font-black text-[10px] uppercase flex-shrink-0 border shadow-lg transition-all ${totalTasks > 0 ? 'bg-red-600 text-white animate-bounce' : 'bg-green-600 text-white'}`}>🚀 {totalTasks} {t('actions_today')}</button>
              <div className={`px-8 py-5 rounded-[32px] font-black text-[10px] uppercase flex-shrink-0 border ${listLate.length > 0 ? 'bg-red-100 text-red-600 animate-pulse border-red-200' : 'bg-green-50 text-green-600 border-green-100'}`}>✅ {listLate.length > 0 ? `${listLate.length} ${t('late_warn')}` : t('late_ok')}</div>
              <div className="bg-purple-50 text-purple-600 px-8 py-5 rounded-[32px] font-black text-[10px] uppercase flex-shrink-0 border border-purple-100 italic tracking-tighter">💎 {loyalCustomersCount} {t('loyal')}</div>
              <div className="flex gap-2 items-center ml-4 font-black text-[10px] text-slate-400">🔥 {t('top_svc')}: {getTopServices().map(([name, stat], i) => (<span key={name} className="bg-white border px-2 py-1 rounded text-slate-600">{i+1}. {name}</span>))}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-black italic">
              <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl col-span-2 relative overflow-hidden group"><p className="font-bold text-xs uppercase opacity-70 tracking-widest text-slate-400 italic">{t('net_profit')}</p><h3 className={`text-5xl font-black mt-2 tracking-tighter ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>Rp {netProfit.toLocaleString()}</h3><div className="absolute -right-4 -bottom-4 text-white/5 text-9xl font-black italic opacity-10">{profile.business_name.substring(0,4)}</div></div>
              <div className="bg-blue-600 p-8 rounded-[40px] text-white shadow-lg font-black italic"><p className="text-xs uppercase opacity-70 tracking-widest">{t('paid_rev')}</p><h3 className="text-3xl mt-2 tracking-tighter">Rp {revenueLunas.toLocaleString()}</h3></div>
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm font-black italic"><p className="text-slate-400 text-xs uppercase tracking-widest">{t('receivable')}</p><h3 className="text-3xl text-orange-500 mt-2 tracking-tighter">Rp {totalPiutang.toLocaleString()}</h3></div>
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm col-start-3 lg:col-start-4 font-black italic"><p className="text-slate-400 text-xs uppercase tracking-widest">{t('total_exp')}</p><h3 className="text-3xl text-red-500 mt-2 tracking-tighter">Rp {totalExp.toLocaleString()}</h3></div>
            </div>
          </div>
        )}

        {/* VIEW: JOB TRACKER */}
        {view === 'jobs' && (
          <div className="animate-in fade-in duration-500 font-black italic uppercase">
            <div className="flex justify-between items-center mb-10 font-black">
                <h2 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">{t('tracker_title')}</h2>
                <div className="flex gap-4">
                    <input type="text" placeholder={t('search_job')} value={jobSearchTerm} onChange={e => setJobSearchTerm(e.target.value)} className="bg-white border-2 border-slate-100 px-6 py-3 rounded-[24px] text-xs font-black shadow-sm outline-none focus:ring-4 focus:ring-blue-50 transition-all w-64" />
                    <button onClick={() => { setShowJobModal(true); setIsManualService(false); }} className="bg-blue-600 text-white px-8 py-4 rounded-[24px] font-black text-xs uppercase shadow-xl">{t('new_job')}</button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 font-black">
              {filteredJobs.length === 0 ? <p className="text-center py-20 italic text-slate-400 font-black uppercase">{t('no_jobs')}</p> : 
              filteredJobs.map(j => {
                const isLate = j.deadline < today && j.status !== 'Selesai' && j.status !== 'Batal';
                return (
                <div key={j.id} onClick={() => setSelectedJob(j)} className={`bg-white px-6 py-4 rounded-[20px] border border-slate-100 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between group relative overflow-hidden ${isLate ? 'border-l-4 border-l-red-500' : ''}`}>
                    {isLate && <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] px-2 py-1 font-black rounded-br-lg">TELAT / OVERDUE</div>}
                    <div className="flex items-center gap-6 w-1/3">
                       <span className={`w-3 h-3 rounded-full ${j.status === 'Selesai' ? 'bg-green-500' : j.status === 'Batal' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                       <div><h4 className="text-lg text-slate-800 leading-none">{j.service_name}</h4><p className="text-[10px] text-slate-400 mt-1">{j.customers?.name} | #{j.id.substring(0,6)}</p></div>
                    </div>
                    <div className="flex gap-4 w-1/3 justify-center" onClick={e => e.stopPropagation()}>
                        <select value={j.status} onChange={(e) => handleQuickUpdate(j.id, 'status', e.target.value)} className={`text-[10px] p-2 rounded-lg border-none outline-none cursor-pointer font-black ${j.status === 'Selesai' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}`}><option value="Menunggu">{t('st_wait')}</option><option value="Proses">{t('st_proc')}</option><option value="Selesai">{t('st_done')}</option><option value="Batal">{t('st_cancel')}</option></select>
                        <select value={j.payment_status} onChange={(e) => handleQuickUpdate(j.id, 'payment_status', e.target.value)} className={`text-[10px] p-2 rounded-lg border-none outline-none cursor-pointer font-black ${j.payment_status === 'Lunas' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}><option value="Belum">{t('pay_unpaid')}</option><option value="DP">{t('pay_dp')}</option><option value="Lunas">{t('pay_paid')}</option></select>
                    </div>
                    <div className="flex items-center gap-8 w-1/3 justify-end">
                       <div className="text-right"><p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">{formatDateIndo(j.deadline)}</p><p className="text-slate-800 text-lg">Rp {Number(j.price).toLocaleString()}</p></div>
                       <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[9px] shadow-lg group-hover:bg-blue-600 transition-all">{t('edit')}</button>
                    </div>
                </div>
              )})}
            </div>
          </div>
        )}

        {/* VIEW: CUSTOMERS */}
        {view === 'customers' && (
           <div className="animate-in fade-in font-black italic uppercase">
              <div className="flex justify-between items-center mb-10 gap-4"><h2 className="text-3xl text-slate-800 tracking-tighter font-black">{t('cust_title')}</h2><div className="flex gap-4"><input type="text" placeholder={t('search_cust')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-white border rounded-[20px] px-8 py-5 font-bold shadow-sm font-black" /><button onClick={() => setShowCustModal(true)} className="bg-blue-600 text-white px-8 py-5 rounded-[24px] font-bold text-xs uppercase shadow-xl">{t('new_cust')}</button></div></div>
              <div className="bg-white rounded-[50px] border shadow-sm overflow-x-auto font-black"><table className="w-full text-left whitespace-nowrap"><thead className="bg-slate-50 border-b text-slate-300 text-[10px] font-black uppercase tracking-widest"><tr className="border-b"><th className="px-10 py-6">{t('col_name')}</th><th className="px-10 py-6">{t('col_wa')}</th><th className="px-10 py-6 text-center">{t('col_order')}</th><th className="px-10 py-6">{t('col_spent')}</th><th className="px-10 py-6">{t('col_status')}</th></tr></thead><tbody className="divide-y">{customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(c => {
                  const cJobs = (jobs || []).filter(j => j.customer_id === c.id);
                  const totalSpent = cJobs.filter(j => j.payment_status === 'Lunas').reduce((acc, curr) => acc + Number(curr.price), 0);
                  return ( <tr key={c.id} className="hover:bg-slate-50 transition-all group/row"><td className="px-10 py-6"><div className="text-slate-800 text-xl font-black">{c.name}<p className="text-[10px] text-slate-300">{c.notes || '-'}</p></div></td><td className="px-10 py-6 text-slate-500">{c.contact}</td><td className="px-10 py-6 text-center text-xl">{cJobs.length}x</td><td className="px-10 py-6 text-blue-600 text-xl">Rp {totalSpent.toLocaleString()}</td><td className="px-10 py-6 flex gap-2"><button onClick={() => { setEditCustData(c); setCustForm(c); setShowCustModal(true); }} className="bg-slate-200 px-4 py-2 rounded-xl text-[9px] hover:bg-blue-600 hover:text-white transition-all">{t('edit')}</button><button onClick={() => handleDeleteCust(c.id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[9px] hover:bg-red-600 hover:text-white transition-all">{t('delete')}</button></td></tr> )
                })}</tbody></table></div>
           </div>
        )}

        {/* VIEW: FINANCE */}
        {view === 'finance' && (
          <div className="animate-in fade-in duration-500 font-black italic uppercase">
            <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6"><div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm italic font-black"><p className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 italic tracking-tighter">{t('finance_cost')}</p><h4 className="text-3xl text-red-500 tracking-tighter">Rp {totalExp.toLocaleString()}</h4></div><div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm italic font-black"><p className="text-slate-400 text-[10px] uppercase tracking-widest mb-2 italic tracking-tighter">{t('finance_cat')}</p><h4 className="text-3xl text-slate-800 tracking-tighter uppercase">{getTopCategory()}</h4></div><button onClick={() => setShowExpModal(true)} className="bg-red-500 text-white p-8 rounded-[40px] font-black shadow-xl shadow-red-200 active:scale-95 transition-all text-xl italic uppercase tracking-widest">{t('add_cost')}</button></div>
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm font-black"><table className="w-full text-left"><thead className="bg-slate-50 text-slate-400 text-[10px]"><tr className="border-b"><th className="px-12 py-8">{t('col_date')}</th><th className="px-12 py-8">{t('col_need')}</th><th className="px-12 py-8">{t('col_cat')}</th><th className="px-12 py-8">{t('col_nom')}</th></tr></thead><tbody className="divide-y">{filteredExpenses.length === 0 ? <tr><td colSpan="4" className="p-10 text-center text-slate-300">{t('no_cost')}</td></tr> : filteredExpenses.map(e => <tr key={e.id} className="hover:bg-slate-50"><td className="px-12 py-8 text-slate-400 text-sm">{e.date}</td><td className="px-12 py-8 text-slate-800 text-lg">{e.expense_name}</td><td className="px-12 py-8 text-slate-400 text-xs">{e.category}</td><td className="px-12 py-8 text-red-500 text-lg">- Rp {Number(e.amount).toLocaleString()}</td></tr>)}</tbody></table></div>
          </div>
        )}

        {/* VIEW: PROFILE & SETTINGS (NEW LAYOUT) */}
        {view === 'profile' && (
          <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-10 font-black italic uppercase">
             
             {/* 1. INFORMASI BISNIS */}
             <div className="bg-white p-12 rounded-[50px] border shadow-xl">
                 <h3 className="text-xl mb-2 flex justify-between items-center">🏢 {t('prof_title')}</h3>
                 <p className="text-slate-400 text-xs mb-8 normal-case">{t('prof_sub')}</p>
                 <form onSubmit={saveProfile} className="space-y-6">
                     <div><label className="text-[10px] text-slate-400 block mb-2">{t('brand_nm')}</label><input type="text" value={profile.business_name} onChange={(e) => setProfile({...profile, business_name: e.target.value})} className="w-full bg-slate-50 border-none rounded-[24px] p-6 text-lg" /></div>
                     <div><label className="text-[10px] text-slate-400 block mb-2">{t('addr_nm')}</label><input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="w-full bg-slate-50 border-none rounded-[24px] p-6 text-lg" /></div>
                     <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[30px] shadow-2xl">{t('save_btn')}</button>
                 </form>
             </div>
             
             {/* 2. ATUR LAYANAN */}
             <div className="bg-white p-12 rounded-[50px] border shadow-xl">
                 <h3 className="text-xl mb-2">🛠️ {t('svc_title')}</h3><p className="text-slate-400 text-xs mb-8 normal-case">{t('svc_desc')}</p>
                 <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {profile.services?.map((s, i) => (
                        <div key={i} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="flex-1 text-slate-800 text-lg">{s.name}</p>
                            <p className="text-blue-600 text-lg">Rp {Number(s.price).toLocaleString()} / <span className="text-sm text-slate-400">{s.unit}</span></p>
                            <button onClick={() => removeService(i)} className="text-red-500 text-[10px] hover:underline">HAPUS</button>
                        </div>
                    ))}
                 </div>
                 <form onSubmit={addServiceToList} className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-slate-100">
                    <input required placeholder={t('svc_name_ph')} value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} className="flex-1 bg-slate-100 p-4 rounded-2xl" /><input required type="number" placeholder={t('svc_price_ph')} value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} className="w-32 bg-slate-100 p-4 rounded-2xl" /><input required placeholder={t('svc_unit_ph')} value={newService.unit} onChange={e => setNewService({...newService, unit: e.target.value})} className="w-24 bg-slate-100 p-4 rounded-2xl" /><button type="submit" className="bg-slate-900 text-white px-8 rounded-2xl text-[10px]">{t('add_svc')}</button>
                </form>
                {/* TOMBOL SIMPAN KHUSUS JIKA LUPA SCROLL KE ATAS */}
                 <button onClick={saveProfile} className="mt-4 w-full bg-blue-600 text-white py-4 rounded-[24px] text-xs shadow-lg uppercase tracking-widest">Simpan Layanan</button>
             </div>

             {/* 3. PENGATURAN & LANGGANAN */}
             <div className="bg-slate-900 text-white p-12 rounded-[50px] border shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-50"></div>
                 <h3 className="text-xl mb-8 relative z-10">💎 {t('subs_section')}</h3>
                 
                 {/* Status Langganan */}
                 <div className="flex justify-between items-end relative z-10 mb-10">
                    <div>
                        <p className="text-slate-400 text-xs tracking-widest mb-1">{t('subs_active_until')}</p>
                        <h2 className="text-3xl text-white mb-2">{formatDateIndo(profile.subscription_end_date)}</h2>
                        <p className={`text-xs px-3 py-1 rounded inline-block ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}>{isExpired ? "EXPIRED" : "ACTIVE"}</p>
                    </div>
                 </div>

                 {/* Input Kode Lisensi */}
                 <form onSubmit={handleActivateLicense} className="relative z-10 mb-10">
                     <p className="text-slate-400 text-xs mb-2">{t('subs_input_label')}</p>
                     <div className="flex gap-4">
                         <input value={licenseKey} onChange={e => setLicenseKey(e.target.value)} placeholder="LAVO-XXXX-XXXX" className="flex-1 bg-slate-800 border-none rounded-2xl p-4 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500" />
                         <button type="submit" disabled={loading} className="bg-blue-600 text-white px-8 rounded-2xl text-[10px] hover:bg-blue-500 transition-all">{loading ? "..." : t('subs_btn')}</button>
                     </div>
                 </form>

                 {/* TOMBOL UNSUBSCRIBE (FITUR BARU) */}
                 {profile.auto_renew && (
                    <div className="relative z-10 pt-4 border-t border-slate-700">
                        <button onClick={handleUnsubscribe} className="text-red-400 text-xs hover:text-red-300 underline font-bold tracking-widest">
                            {t('unsub_btn')}
                        </button>
                    </div>
                 )}

                 {/* Settings Lain */}
                 <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-700 relative z-10">
                     <div>
                         <p className="text-slate-400 text-xs mb-2">{t('lang_label')}</p>
                         <button onClick={() => setProfile({...profile, language: profile.language === 'ID' ? 'EN' : 'ID'})} className="bg-slate-800 px-4 py-3 rounded-xl text-xs w-full text-left hover:bg-slate-700">{t('lang_btn')}</button>
                     </div>
                     <div>
                         <p className="text-slate-400 text-xs mb-2">{t('legal_section')}</p>
                         <div className="flex flex-col gap-2">
                             <button onClick={() => setShowLegal('terms')} className="text-left text-xs text-blue-400 hover:text-blue-300">{t('legal_terms')}</button>
                             <button onClick={() => setShowLegal('privacy')} className="text-left text-xs text-blue-400 hover:text-blue-300">{t('legal_privacy')}</button>
                             <button onClick={() => setShowLegal('eula')} className="text-left text-xs text-blue-400 hover:text-blue-300">{t('legal_eula')}</button>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
        )}
      </main>

      {/* DETAIL JOB MODAL */}
      {selectedJob && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4 font-black italic uppercase"><div className="bg-white w-full max-w-lg rounded-[60px] p-12 shadow-2xl relative animate-in zoom-in duration-300"><button onClick={() => setSelectedJob(null)} className="absolute top-10 right-10 text-slate-300 text-4xl">&times;</button><h3 className="text-3xl text-slate-800 mb-2">{selectedJob.service_name}</h3><p className="text-blue-600 text-xs mb-10">TICKET #{selectedJob.id.substring(0,6)}</p><div className="space-y-6 bg-slate-50 p-10 rounded-[40px] mb-10"><div className="flex justify-between"><span>KLIEN</span><span className="text-slate-400">{selectedJob.customers?.name}</span></div><div className="flex justify-between"><span>TOTAL</span><span className="text-blue-600 text-2xl">Rp {Number(selectedJob.price).toLocaleString()}</span></div><div className="flex justify-between text-red-500"><span>DEADLINE</span><span>{formatDateIndo(selectedJob.deadline)}</span></div></div><div className="grid grid-cols-2 gap-4"><button onClick={() => sendInvoice(selectedJob)} className="bg-slate-900 text-white py-5 rounded-[24px] text-[10px] shadow-lg">{t('invoice_wa')}</button><button onClick={() => window.open(`https://wa.me/${selectedJob.customers.contact.replace(/^0/, '62')}`, '_blank')} className="bg-green-500 text-white py-5 rounded-[24px] text-[10px] shadow-lg">{t('chat_wa')}</button></div><button onClick={() => deleteJob(selectedJob.id)} className="w-full mt-6 text-red-400 text-[10px]">{t('delete_job')}</button></div></div>)}

      {/* NEW ORDER MODAL */}
      {showJobModal && (<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-lg z-[100] flex items-center justify-center p-4 font-black italic uppercase"><div className="bg-white w-full max-w-md rounded-[60px] p-14 shadow-2xl relative"><button onClick={() => setShowJobModal(false)} className="absolute top-10 right-10 text-slate-300 text-4xl">&times;</button><h3 className="text-3xl text-slate-800 mb-10 text-center">{t('input_order')}</h3><form onSubmit={handleSaveOrder} className="space-y-5"><select required className="w-full bg-slate-50 border-none rounded-[24px] p-6 text-lg" onChange={e => setJobForm({...jobForm, customer_id: e.target.value})}><option value="">{t('select_cust')}</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
        <div className="flex justify-end"><button type="button" onClick={() => setIsManualService(!isManualService)} className="text-[10px] text-blue-600 underline">{isManualService ? t('auto_mode') : t('manual_mode')}</button></div>
        {!isManualService ? (<select required className="w-full bg-slate-50 border-none rounded-[24px] p-6 text-lg" onChange={e => { const s = profile.services?.find(x => x.name === e.target.value); setJobForm({...jobForm, service_name: e.target.value, price: s ? s.price * jobForm.qty : jobForm.price}); }}><option value="">{t('select_svc')}</option>{profile.services?.map(s => <option key={s.name} value={s.name}>{s.name} (Rp {s.price})</option>)}</select>) : (<input required placeholder={t('manual_label')} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" onChange={e => setJobForm({...jobForm, service_name: e.target.value})} />)}
        <div className="grid grid-cols-2 gap-4"><input required type="number" placeholder={t('qty')} value={jobForm.qty} onChange={e => { const s = profile.services?.find(x => x.name === jobForm.service_name); setJobForm({...jobForm, qty: e.target.value, price: s ? s.price * e.target.value : jobForm.price}); }} className="bg-slate-50 rounded-[24px] p-6 text-lg" /><input required type="number" placeholder={t('total')} value={jobForm.price} onChange={(e) => setJobForm({...jobForm, price: e.target.value})} className="bg-slate-50 rounded-[24px] p-6 text-lg text-blue-600" /></div><input required type="date" value={jobForm.deadline} onChange={(e) => setJobForm({...jobForm, deadline: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[30px] text-xl shadow-2xl">{t('save_order')}</button></form></div></div>)}
      
      {/* OTHER MODALS */}
      {showExpModal && (<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-lg z-[100] flex items-center justify-center p-4 font-black italic uppercase"><div className="bg-white w-full max-w-md rounded-[60px] p-14 shadow-2xl relative"><button onClick={() => setShowExpModal(false)} className="absolute top-10 right-10 text-slate-300 text-4xl">&times;</button><h3 className="text-3xl text-slate-800 mb-10 text-center">{t('add_cost')}</h3><form onSubmit={async (e) => { e.preventDefault(); await supabase.from('expenses').insert([{ ...expForm, owner_id: session.user.id }]); fetchData(); setShowExpModal(false); }} className="space-y-5"><input required type="date" value={expForm.date} onChange={(e) => setExpForm({...expForm, date: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><input required type="text" placeholder={t('col_need')} value={expForm.expense_name} onChange={(e) => setExpForm({...expForm, expense_name: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><input required type="number" placeholder={t('col_nom')} value={expForm.amount} onChange={(e) => setExpForm({...expForm, amount: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><select value={expForm.category} onChange={(e) => setExpForm({...expForm, category: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg"><option value="Operasional">Operasional</option><option value="Gaji">Gaji</option><option value="Sewa">Sewa</option><option value="Marketing">Marketing</option><option value="Lainnya">Lainnya</option></select><button type="submit" className="w-full bg-red-500 text-white py-6 rounded-[30px] text-xl shadow-2xl">{t('save_cost')}</button></form></div></div>)}
      {showCustModal && (<div className="fixed inset-0 bg-slate-900/50 backdrop-blur-lg z-[100] flex items-center justify-center p-4 font-black italic uppercase"><div className="bg-white w-full max-w-md rounded-[60px] p-14 shadow-2xl relative"><button onClick={() => { setShowCustModal(false); setEditCustData(null); }} className="absolute top-10 right-10 text-slate-300 text-4xl">&times;</button><h3 className="text-3xl text-slate-800 mb-10 text-center">{editCustData ? t('edit') : t('new_cust')}</h3><form onSubmit={handleAddCust} className="space-y-5"><input required type="text" placeholder={t('ph_name')} value={custForm.name} onChange={(e) => setCustForm({...custForm, name: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><input required type="text" placeholder={t('ph_wa')} value={custForm.contact} onChange={(e) => setCustForm({...custForm, contact: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg" /><textarea placeholder={t('ph_note')} value={custForm.notes} onChange={(e) => setCustForm({...custForm, notes: e.target.value})} className="w-full bg-slate-50 rounded-[24px] p-6 text-lg h-32" /><button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-[30px] text-xl shadow-2xl">{t('save_cust')}</button></form></div></div>)}
      {showActionModal && (<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-lg z-[100] flex items-center justify-center p-4 font-black italic uppercase"><div className="bg-white w-full max-w-2xl rounded-[60px] p-12 shadow-2xl relative flex flex-col max-h-[90vh]"><button onClick={() => setShowActionModal(false)} className="absolute top-10 right-10 text-slate-300 text-4xl">&times;</button><h3 className="text-3xl text-slate-800 mb-2">{t('actions_today')}</h3><p className="text-slate-400 text-[10px] mb-8 italic">{t('actions_sub')}</p><div className="overflow-y-auto space-y-4 pr-2">{listUnpaid.map(j => (<div key={j.id} className="bg-orange-50 p-6 rounded-[32px] flex justify-between items-center border border-orange-100"><div><p className="text-[9px] text-orange-600 mb-1">💰 {t('pay_unpaid')}</p><h4 className="text-xl text-slate-800">{j.customers?.name}</h4><p className="text-xs text-orange-400 font-bold">{j.service_name} - Rp {Number(j.price).toLocaleString()}</p></div><button onClick={() => sendInvoice(j)} className="bg-orange-600 text-white px-6 py-3 rounded-2xl text-[9px] shadow-lg">TAGIH</button></div>))}{listLate.map(j => (<div key={j.id} className="bg-red-50 p-6 rounded-[32px] flex justify-between items-center border border-red-100"><div><p className="text-[9px] text-red-600 mb-1">⚠️ {t('late_warn')}</p><h4 className="text-xl text-slate-800">{j.customers?.name}</h4><p className="text-xs text-red-400 font-bold">Deadline: {formatDateIndo(j.deadline)}</p></div><button onClick={() => { setView('jobs'); setShowActionModal(false); }} className="bg-red-600 text-white px-6 py-3 rounded-2xl text-[9px]">CEK</button></div>))}</div></div></div>)}
    </div>
  )
}