import { LoginPage } from './login.po';
import { browser, by, element, WebDriver, ElementFinder } from 'protractor';
import { url } from 'inspector';

describe('Login', () => {
  let page: LoginPage;
  page = new LoginPage();
  page.navigateTo();
  browser.sleep(5000);


  it('A pagina de Login deve ser mostrada.', () => {
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
  });

  it('A página deve conter os campos de Email e de Senha e o botão de Entrar para efetuar o Login', () => {
    expect(page.getParagraphText()).toContain('Email' && 'Senha' && 'ENTRAR');
  });

  it('A página deve conter links para Esqueci minha Senha e para Manter Conectado', () => {
    expect(page.getParagraphText()).toContain('Esqueci minha senha' && 'Manter conectado');
  });

  it('A página deve conter a opção Cadastrar-se como Professor', () => {
    const professor = element(by.id('Professor'));
    expect(professor.getText()).toBe('Cadastrar-se como Professor');
  });

  it('A página deve conter a opção Cadastrar-se como Aluno', () => {
    const aluno = element(by.id('Aluno'));
    expect(aluno.getText()).toBe('Cadastrar-se como Aluno');
  });

});
