
import './App.css'

import { useState, useEffect } from 'react';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    
    // Carrega todos os usuários individuais que já existem no localStorage ao iniciar a página
    const [resultado, setResultado] = useState(() => {
        const usuariosCarregados = [];
        
        for (let i = 0; i < localStorage.length; i++) {
            const chave = localStorage.key(i);
            
            // Filtra para pegar apenas as chaves que começam com 'usuario_'
            if (chave.startsWith('usuario_')) {
                const dadosTexto = localStorage.getItem(chave);
                try {
                    usuariosCarregados.push(JSON.parse(dadosTexto));
                } catch (e) {
                    console.error("Erro ao ler dado do localStorage", e);
                }
            }
        }
        return usuariosCarregados;
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const emailFormatado = email.trim().toLowerCase();

        // 1. Verifica se o e-mail já existe no estado atual do React
        const existe = resultado.some(u => u.email?.trim().toLowerCase() === emailFormatado);

        if (existe) {
            alert('Este e-mail já está cadastrado!');
            return; 
        }

        // 2. Cria o novo objeto do usuário
        const novoUsuario = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            age: age
        };

        // 3. Salva individualmente no localStorage com uma chave única (ex: usuario_171829384)
        // Usamos JSON.stringify porque o localStorage só aceita texto
        localStorage.setItem(`project-react-2_usuario_${novoUsuario.id}`, JSON.stringify(novoUsuario));

        // 4. Atualiza a lista na tela adicionando o novo usuário
        setResultado((listaAtual) => [...listaAtual, novoUsuario]);

        // Limpa os inputs do formulário
        setName('');
        setEmail('');
        setAge('');
    };

    return (
        <>
            <h1>Cadastro de Usuários</h1>
            <form onSubmit={onSubmit} className='hi'>
                <div className='oi'>
                    <input
                        className='p'
                        type="text"
                        placeholder='digite seu nome aqui'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='oi'>
                    <input
                        type="email"
                        className='p'
                        placeholder='digite seu email aqui'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
                    <button type='submit'>Cadastrar</button>
                </div>
            </form>
            
            <ol>
                {resultado.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.email} - {item.age}
                    </li>
                ))}
            </ol>

            <footer>
                <p>&copy; 2026 Arthur. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}
export default App;