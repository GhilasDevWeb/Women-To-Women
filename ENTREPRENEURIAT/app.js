// ====== helpers ======
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ====== Apply saved prefs on load ======
function applySavedPreferences(){
  const dark = localStorage.getItem('wfw_dark') === '1';
  if(dark) document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');

  const lang = localStorage.getItem('wfw_lang') || 'en';
  document.documentElement.lang = lang;
  if(lang === 'ar'){
    document.body.classList.add('arabic');
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.body.classList.remove('arabic');
    document.documentElement.setAttribute('dir', 'ltr');
  }
}
applySavedPreferences();

// ====== Dark mode toggle ======
$('#darkModeToggle')?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('wfw_dark', isDark ? '1' : '0');
});

// ====== Language toggle (EN <-> AR) ======
$('#langToggle')?.addEventListener('click', () => {
  const current = document.documentElement.lang || 'en';
  const next = current === 'en' ? 'ar' : 'en';
  document.documentElement.lang = next;
  if(next === 'ar'){
    document.body.classList.add('arabic');
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.body.classList.remove('arabic');
    document.documentElement.setAttribute('dir', 'ltr');
  }
  localStorage.setItem('wfw_lang', next);
  // optional: reload to let server-side templates or direction-sensitive CSS take effect
  // location.reload();
});

// ====== Mobile menu toggle ======
$('#mobileToggle')?.addEventListener('click', ()=>{
  $('#mobileMenu')?.classList.toggle('hidden');
});

// ====== Footer year automatic (for different ids) ======
['year','year2','year3','year_about','year_contact','year_portfolio'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.textContent = new Date().getFullYear();
});

// ====== Contact form demo handler (keeps existing behavior) ======
$$('#contactForm, #contactFormPage').forEach(f=>{
  f.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Thanks — we received your message.');
    e.target.reset();
  });
});

// ====== Debug helper (optional) ======
// Uncomment to log clicks (useful when debugging)
// document.addEventListener('click', e => console.log('click target:', e.target));
