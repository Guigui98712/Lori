// JavaScript conectado com sucesso!
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const errorMessageDiv = document.getElementById('error-message');
  const telefoneInput = document.getElementById('telefone');

  // Função para formatar o telefone enquanto o usuário digita
  function formatarTelefone(input) {
    // Remove todos os caracteres que não são números
    let telefone = input.value.replace(/\D/g, '');

    // Aplica a formatação do telefone: (XX) XXXXX-XXXX
    if (telefone.length > 10) {
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (telefone.length > 6) {
      telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (telefone.length > 2) {
      telefone = telefone.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }

    // Atualiza o valor do campo de telefone
    input.value = telefone;
  }

  // Evento de input para formatar o telefone
  telefoneInput.addEventListener('input', () => {
    formatarTelefone(telefoneInput);
  });

  // Evento de envio do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação dos campos
    if (!name) {
      showErrorMessage('Preencha o campo Nome', document.getElementById('name'));
      return;
    }

    if (!telefone) {
      showErrorMessage('Preencha o campo Telefone', document.getElementById('telefone'));
      return;
    }

    if (!assunto) {
      showErrorMessage('Escolha um assunto', document.getElementById('assunto'));
      return;
    }

    if (!mensagem) {
      showErrorMessage('Preencha o campo Mensagem', document.getElementById('mensagem'));
      return;
    }

    // Remove caracteres não numéricos do telefone
    const cleanPhone = telefone.replace(/\D/g, '');

    // Número da empresa (substitua pelo número correto)
    const companyPhoneNumber = '5516992788614';

    // Mensagem formatada para o WhatsApp
    const whatsappMessage = `Olá, meu nome é ${name}. Meu telefone é ${telefone}. O assunto é: ${assunto}. Aqui está minha mensagem: ${mensagem}`;

    // Gera o link do WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=${companyPhoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;

    // Redireciona para o WhatsApp
    window.open(whatsappLink, '_blank');
  });

  // Função para exibir mensagens de erro
  function showErrorMessage(message, field) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    errorMessageDiv.style.opacity = 1;

    const fieldRect = field.getBoundingClientRect();
    const fieldWidth = fieldRect.width;
    const fieldLeft = fieldRect.left + window.scrollX;
    const fieldTop = fieldRect.top + window.scrollY;

    errorMessageDiv.style.left = `${fieldLeft + (fieldWidth / 2) - (errorMessageDiv.offsetWidth / 2)}px`;
    errorMessageDiv.style.top = `${fieldTop + fieldRect.height + 5}px`;

    setTimeout(() => {
      errorMessageDiv.style.opacity = 0;
      setTimeout(() => {
        errorMessageDiv.style.display = 'none';
      }, 300);
    }, 3000);
  }
});

// Script do Modal para exibir currículos
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-socia');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalTitle = document.getElementById('modal-title');
  const modalCurriculo = document.getElementById('modal-curriculo');
  const closeModal = modal.querySelector('.close');

  const curriculos = {
    clarissa: {
      img: '/img/Clarissa.png',
      name: 'Clarissa Ribeiro de Faria',
      title: 'Advogada',
      curriculo: `
        <p>Graduada pela Faculdade de Direito de Franca em 2018;</p>
        <p>Inscrita na OAB/MG 198.809;</p>
        <p>Pós-Graduada em Direito Trabalhista e Previdenciário pela mesma instituição (FDF);</p>
        <p>Pós-Graduanda em Direito do Ordenamento, Urbanismo e do Ambiente pela Faculdade de Direito da Universidade de Coimbra.</p>
      `
    },
    sara: {
      img: '/img/sara.JPG',
      name: 'Sarah Maria Borges Lopes',
      title: 'Advogada',
      curriculo: `
        <p>Graduada pela Universidade de Uberaba em 2022;</p>
        <p>Inscrita na OAB/MG220.120;</p>
        <p>Pós-Graduada em Direito do Agronegócio pelo Instituto Líbano.</p>
      `
    }
  };

  document.querySelectorAll('.foto-socia').forEach(foto => {
    foto.addEventListener('click', (event) => {
      event.preventDefault();

      const socia = event.currentTarget.getAttribute('data-socia');
      const data = curriculos[socia];

      modalImg.src = data.img;
      modalName.textContent = data.name;
      modalTitle.textContent = data.title;
      modalCurriculo.innerHTML = data.curriculo;

      modal.style.display = 'flex';
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});




// Função de redução da barra de navegação
var navbarShrink = function () {
  const navbarCollapsible = document.body.querySelector('#navPrincipal'); // Certifique-se de que o id corresponde ao do seu HTML
  if (!navbarCollapsible) {
      return;
  }
  // Verifica a posição de rolagem
  if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
  } else {
      navbarCollapsible.classList.add('navbar-shrink');
  }
};

// Reduz a barra de navegação ao carregar a página
navbarShrink();

// Reduz a barra de navegação quando a página é rolada
document.addEventListener('scroll', navbarShrink);

// Ativa o bootstrap ScrollSpy no elemento de navegação principal
const mainNav = document.body.querySelector('#navPrincipal'); // Alterado para o id correto
if (mainNav) {
  new bootstrap.ScrollSpy(document.body, {
      target: '#navPrincipal', // Alterado para o id correto
      rootMargin: '0px 0px -40%',
  });
}

// Recolhe a barra de navegação responsiva quando o alternador estiver visível
const navbarToggler = document.body.querySelector('.navbar-toggler');
const responsiveNavItems = [].slice.call(
  document.querySelectorAll('#navbarResponsive .nav-link')
);
responsiveNavItems.map(function (responsiveNavItem) {
  responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
      }
  });
});

// Ativa o plugin SimpleLightbox para itens do portfólio
new SimpleLightbox({
  elements: '#portfolio a.portfolio-box'
});




//Áreas de Atuação

function showDetail(areaId) {
  console.log(`Mostrando detalhes para: ${areaId}`); // Debugging

  // Esconde todos os detalhes
  const detalhes = document.querySelectorAll(".detalhamento");
  detalhes.forEach((detalhe) => detalhe.classList.remove("active"));

  // Mostra o detalhe correspondente
  const selectedDetail = document.getElementById(areaId);
  if (selectedDetail) {
    selectedDetail.classList.add("active");
    console.log(`Detalhe encontrado: ${areaId}`); // Debugging
  } else {
    console.error(`Detalhe não encontrado para: ${areaId}`); // Debugging
  }
}
