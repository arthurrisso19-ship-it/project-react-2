import { useState } from 'react';
import './App.css';

const CHAVE_PROJETO = 'project_react_2_lista_usuarios_final';

export default function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);

    // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameregex = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    const [resultado, setResultado] = useState(() => {
        try {
            const salvos = window.localStorage.getItem(CHAVE_PROJETO);
            if (salvos) {
                const convertidos = JSON.parse(salvos);
                if (Array.isArray(convertidos)) return convertidos;
            }
        } catch (err) {
            console.error("Falha na leitura:", err);
        }
        return [];
    });

    // Controla a digitação do e-mail e valida em tempo real
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === '') {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(emailRegex.test(value.trim()));
        }
    };
       const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (value === '') {
            setIsNameValid(true);
        } else {
            setIsNameValid(nameregex.test(value.trim()));
        }
    };

    // FUNÇÃO PARA CADASTRAR USUÁRIO
    const handleCadastrar = (e) => {

        e.preventDefault(); // Impede o envio do formulário se houver erros

        // 1. Verifica campos vazios (Adicionado o 'return' que faltava aqui)
        if (!name.trim() || !email.trim() || !age.trim()) {
            alert(`Por favor, preencha todos os campos!`);
            return; 
        }
        const nomevalido = nameregex.test(name);
        if (!nomevalido) {
            setIsNameValid(false)
            alert('Cadastro barrado: O nome deve conter no mínimo 2 letras e no máximo 30 letras!');
            return;
        }


        // 2. Valida o formato do e-mail com o Regex antes de cadastrar
        const emailValido = emailRegex.test(email);
        if (!emailValido) {
            setIsEmailValid(false);
            alert('Cadastro barrado: E-mail inválido!');
            return; // Bloqueia o cadastro aqui
        }
        
        const emailFormatado = email.trim().toLowerCase();
        const existe = resultado.some(u => u.email?.trim().toLowerCase() === emailFormatado);

        if (existe) {
            alert('Este e-mail já está cadastrado!');
            return;
        }

        const novoUsuario = {
            id: Number(Date.now()), // Gera um ID único numérico
            name: name.trim(),
            email: email.trim(),
            age: age
        };

        const novaLista = [...resultado, novoUsuario];

        try {
            window.localStorage.setItem(CHAVE_PROJETO, JSON.stringify(novaLista));
            setResultado(novaLista);
            alert(`Cadastro concluído com sucesso!`);
        } catch (err) {
            console.error(err);
        }

        setName('');
        setEmail('');
        setAge('');
        setIsNameValid(true);
        setIsEmailValid(true);
    };

    // FUNÇÃO PARA REMOVER UM USUÁRIO ESPECÍFICO PELO ID
    const handleRemover = (idParaRemover) => {
        const novaLista = resultado.filter(usuario => usuario.id !== idParaRemover);
        setResultado(novaLista);
        window.localStorage.setItem(CHAVE_PROJETO, JSON.stringify(novaLista));
        alert(`Usuário com ID ${idParaRemover} removido com sucesso!`);
    };
      const botaoDesabilitado = !name.trim() || !email.trim() || !age.trim() || !isNameValid || !isEmailValid;
    return (
        <>
            <h1>Cadastro de Usuários</h1>
            {/* Transformado a div externa em <form> para gerenciar melhor o comportamento do botão */}
            <form onSubmit={handleCadastrar} className='hi'>
                <div className='oi'>
                    <input
                        className='p'
                        type="text"
                        placeholder='digite seu nome aqui'
                        value={name}

                        onChange={handleNameChange}
                        required
                    />
                    {!isNameValid && <p id='ooo' style={{ color: 'red', fontSize: '14px', margin: '5px 0 0 0' }}>Por favor, insira um nome com mais caracteres.</p>}
                    
                </div>
                <div className='oi'>
                    <input
                    id='ema'
                        type="text" 
                        className='p'
                        placeholder='digite seu email aqui'
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                     {!isEmailValid && <p style={{ color: 'red', fontSize: '14px', margin: '5px 0 0 0' }}>Por favor, insira um endereço de email válido.</p>}
                    
                    
                  
                </div>
                <div className='oi'>
                    <input
                        type="number"
                        className='p'
                        placeholder='digite sua idade aqui'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>

                <div className='but'>
                    {/* Mudado o tipo para 'submit' para acionar o onSubmit do formulário */}
                    <button type='submit' disabled={botaoDesabilitado}>Cadastrar</button> 
                </div>
            </form>
            
            <ol>
                {resultado.map((item) => (
                    <li id={`user-${item.id}`} key={item.id}>
                        {item.name} - {item.email} - {item.age} anos
                        <button 
                            type='button' 
                            className='button-remover'
                            onClick={() => handleRemover(item.id)}
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ol>

            <footer>
                <p>&copy; 2026 Arthur. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}
