const projects = [
  {
    date: 'Ago · 2026',
    name: 'Java Básico — Programação Modular',
    description: 'Repositório de estudos e exercícios em Java com leitura de dados, listas, estruturas de decisão, laços e resolução de problemas. A prévia mostra um exercício real do repositório e sua execução representada em terminal.',
    tech: ['Java', 'Listas', 'Lógica', 'VS Code', 'Git'],
    repo: 'https://github.com/BernardoRibeiro7/ProgMod_JavaBasico',
    image: 'public/projects/java-basico.png',
    alt: 'Prévia do projeto Java Básico com código e terminal',
    caption: 'Exercício TresNumeros.java e visualização de execução',
    accent: '#59dfc2'
  },
  {
    date: 'Set · 2026',
    name: 'Login PUC — DIAW',
    description: 'Aplicação web acadêmica de autenticação com interface de login, cadastro e recuperação de senha, integrada a Spring Security, Thymeleaf, JPA e H2.',
    tech: ['Java 21', 'Spring Boot', 'Thymeleaf', 'Spring Security', 'JPA', 'H2'],
    repo: 'https://github.com/BernardoRibeiro7/LoginPuc-Diaw',
    image: 'public/projects/login-puc.png',
    alt: 'Tela real de login do projeto Login PUC, identificado como Lumen',
    caption: 'Tela de login construída no projeto Login PUC / Lumen',
    accent: '#8cb4ff'
  },
  {
    date: 'Set · 2026',
    name: 'Laboratório de Programação Modular',
    description: 'Atividade prática com classes Java, regras de negócio e testes. O projeto trabalha modelagem de produto, margem, impostos e valor de venda com versionamento no GitHub.',
    tech: ['Java', 'POO', 'Testes', 'Git', 'GitHub'],
    repo: 'https://github.com/BernardoRibeiro7/LAP1_PM_N2',
    image: 'public/projects/lab-programacao.png',
    alt: 'Prévia do laboratório de Programação Modular com classe Produto e saída de terminal',
    caption: 'Classe Produto.java e exemplo de cálculo de venda',
    accent: '#b9ff66'
  },
  {
    date: 'Out · 2026',
    name: 'Portfólio Profissional',
    description: 'Este próprio site: portfólio responsivo com apresentação bilíngue, timeline dinâmica, experiências, tema claro/escuro, modal de projetos, validação de formulário e função serverless pronta para a Vercel.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Vercel Functions'],
    repo: 'https://github.com/BernardoRibeiro7/portfolio-profissional',
    image: 'public/projects/portfolio.png',
    alt: 'Captura de tela do portfólio profissional de Bernardo Machado',
    caption: 'Captura da versão final do próprio portfólio',
    accent: '#f0c86a'
  }
];

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function renderProjects() {
  const root = document.querySelector('#project-timeline');
  const count = document.querySelector('#project-count');
  if (!root) return;
  if (count) count.textContent = String(projects.length).padStart(2, '0');

  root.innerHTML = projects.map((project, index) => `
    <article class="timeline-item reveal" style="--project-accent:${project.accent}">
      <span class="timeline-marker" aria-hidden="true"></span>
      <div class="project-copy">
        <div class="project-header">
          <span class="project-date">${project.date}</span>
          <span class="project-number">${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</span>
        </div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-tech" aria-label="Tecnologias utilizadas">
          ${project.tech.map(item => `<span>${item}</span>`).join('')}
        </div>
        <div class="project-actions">
          <a class="project-button primary-link" href="${project.repo}" target="_blank" rel="noreferrer" aria-label="Abrir repositório do projeto ${project.name} no GitHub">
            Ver repositório
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
          </a>
          <button class="project-button preview-button" type="button" data-project-index="${index}">
            Ampliar prévia
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4M11 8v6M8 11h6"/></svg>
          </button>
        </div>
      </div>
      <button class="project-media preview-button" type="button" data-project-index="${index}" aria-label="Ampliar prévia do projeto ${escapeAttribute(project.name)}">
        <img src="${project.image}" alt="${escapeAttribute(project.alt)}" loading="lazy" width="1200" height="750">
      </button>
    </article>
  `).join('');
}

function setupLanguageTabs() {
  const tabs = [...document.querySelectorAll('.lang-tab')];
  if (!tabs.length) return;

  function activate(tab) {
    const lang = tab.dataset.lang;
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('.lang-panel').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === lang);
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(index + delta + tabs.length) % tabs.length];
      activate(next);
      next.focus();
    });
  });
}

function setupTheme() {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  let saved = null;

  try {
    saved = localStorage.getItem('portfolio-theme');
  } catch {
    saved = null;
  }

  if (saved === 'light' || saved === 'dark') {
    root.dataset.theme = saved;
  } else if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    root.dataset.theme = 'light';
  } else {
    root.dataset.theme = 'dark';
  }

  button?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {
      // O tema continua funcionando mesmo quando o armazenamento local está indisponível.
    }
  });
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });
}

function setupScrollSpy() {
  const links = [...document.querySelectorAll('.main-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-25% 0px -62% 0px', threshold: [0, .1, .35] });

  sections.forEach(section => observer.observe(section));
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px -30px' });
  items.forEach(item => observer.observe(item));
}

function setupScrollUI() {
  const progress = document.querySelector('.scroll-progress span');
  const back = document.querySelector('.back-to-top');

  function update() {
    const scrollTop = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
    if (progress) progress.style.width = `${percent}%`;
    back?.classList.toggle('visible', scrollTop > 650);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
}

function setupProjectModal() {
  const modal = document.querySelector('#project-modal');
  const image = document.querySelector('#modal-image');
  const title = document.querySelector('#modal-title');
  const caption = document.querySelector('#modal-caption');
  const repo = document.querySelector('#modal-repo');
  if (!modal || !image || !title || !caption || !repo) return;

  let lastTrigger = null;

  function openModal(index, trigger) {
    const project = projects[index];
    if (!project) return;
    lastTrigger = trigger || null;
    title.textContent = project.name;
    caption.textContent = project.caption;
    image.src = project.image;
    image.alt = project.alt;
    repo.href = project.repo;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  }

  document.querySelectorAll('[data-project-index]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(Number(trigger.dataset.projectIndex), trigger));
  });
  modal.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function setupCopyEmail() {
  const button = document.querySelector('[data-copy]');
  if (!button) return;
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast('E-mail copiado para a área de transferência.');
      button.querySelector('span')?.replaceChildren(document.createTextNode('E-mail copiado'));
      setTimeout(() => button.querySelector('span')?.replaceChildren(document.createTextNode('Copiar e-mail')), 1800);
    } catch {
      showToast(value);
    }
  });
}

function validateField(field) {
  const error = document.querySelector(`[data-error-for="${field.name}"]`);
  let message = '';
  if (field.validity.valueMissing) message = 'Campo obrigatório.';
  else if (field.validity.typeMismatch) message = 'Informe um e-mail válido.';
  else if (field.validity.tooShort) message = `Use pelo menos ${field.minLength} caracteres.`;

  field.setAttribute('aria-invalid', String(Boolean(message)));
  if (error) error.textContent = message;
  return !message;
}

function openMailFallback(data) {
  const subject = encodeURIComponent(`Contato pelo portfólio - ${data.name}`);
  const body = encodeURIComponent(`Nome: ${data.name}\nE-mail: ${data.email}\n\n${data.message}`);
  window.location.href = `mailto:ribeiromachadobernardo@gmail.com?subject=${subject}&body=${body}`;
}

function setupContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = document.querySelector('#form-status');
  const submit = form.querySelector('.form-submit');
  const fields = [...form.querySelectorAll('input[required], textarea[required]')];
  const message = form.querySelector('#message');
  const count = form.querySelector('.char-count strong');

  function updateCount() {
    if (message && count) count.textContent = String(message.value.length);
  }

  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });
  message?.addEventListener('input', updateCount);
  updateCount();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      status.className = 'form-status error';
      status.textContent = 'Revise os campos destacados antes de enviar.';
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    submit.classList.add('loading');
    submit.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Enviando mensagem...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        form.reset();
        updateCount();
        status.className = 'form-status success';
        status.textContent = 'Mensagem enviada com sucesso.';
        showToast('Mensagem enviada com sucesso.');
      } else if (result.code === 'CONFIG_REQUIRED' || response.status === 503) {
        status.className = 'form-status success';
        status.textContent = 'Envio direto ainda não configurado. Abrindo seu aplicativo de e-mail...';
        setTimeout(() => openMailFallback(data), 500);
      } else {
        throw new Error(result.error || 'Falha no envio.');
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Não foi possível enviar diretamente. Abrindo seu aplicativo de e-mail...';
      setTimeout(() => openMailFallback(data), 700);
    } finally {
      submit.classList.remove('loading');
      submit.disabled = false;
    }
  });
}

renderProjects();
setupTheme();
setupLanguageTabs();
setupMenu();
setupScrollSpy();
setupReveal();
setupScrollUI();
setupProjectModal();
setupCopyEmail();
setupContactForm();
