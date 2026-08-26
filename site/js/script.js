document.addEventListener('DOMContentLoaded',function(){
  const header = document.querySelector('.site-header');
  const navToggle=document.getElementById('nav-toggle');
  const siteNav=document.getElementById('site-nav');

  if(header){
    let lastScrollY = window.scrollY;
    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        header.classList.add('hidden');
        header.classList.remove('visible');
      } else {
        header.classList.remove('hidden');
        header.classList.add('visible');
      }
      lastScrollY = currentScrollY;
    };

    updateHeaderVisibility();
    window.addEventListener('scroll', updateHeaderVisibility, { passive: true });
  }

  if(navToggle&&siteNav){
    const updateToggleState = () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.textContent = expanded ? '✕' : '☰';
    };

    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
      updateToggleState();
    });
    // close nav when a link is clicked (mobile)
    siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      updateToggleState();
    }));
    updateToggleState();
  }

  const form=document.getElementById('contact-form');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.name.value.trim();
    const email=form.email.value.trim();
    const message=form.message.value.trim();
    const result=document.getElementById('form-result');
    if(!name||!email||!message){result.textContent='Please fill all fields.';result.style.color='red';return}
    result.textContent='Thanks — your message was sent (demo).';result.style.color='green';form.reset();
  })}
  // Newsletter demo handler
  const newsletter = document.getElementById('newsletter-form');
  if(newsletter){
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletter.email.value.trim();
      const out = document.getElementById('newsletter-result');
      if(!email){ out.textContent = 'Enter a valid email.'; out.style.color='red'; return }
      out.textContent = 'Subscribed (demo).'; out.style.color='green'; newsletter.reset();
    });
  }
});