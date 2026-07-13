
import './App.css'
import { useState, useEffect } from 'react';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [resultado, setResultado] = useState([]);
    
    // Uma única chave centralizada para todo o projeto
    const CHAVE_LOCAL_STORAGE = 'project_react_2_lista_usuarios';

    // 1. CARREGA OS DADOS APENAS UMA VEZ AO ABRIR A PÁGINA
    useEffect(() => {
        try {
            const dadosTexto = localStorage.getItem(CHAVE_LOCAL_STORAGE);
            if (dadosTexto) {
                const usuariosCarregados = JSON.parse(dadosTexto);
                if (Array.isArray(usuariosCarregados)) {
                    setResultado(usuariosCarregados);
                }
            }
        } catch (e) {
            console.error("Erro ao carregar dados iniciais:", e);
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const emailFormatado = email.trim().toLowerCase();
        const existe = resultado.some(u => u.email?.trim().toLowerCase() === emailFormatado);

        if (existe) {
            alert('Este e-mail já está cadastrado!');
            return; 
        }
        
        const novoUsuario = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            age: age
        };

        // Cria a nova lista atualizada
        const novaLista = [...resultado, novoUsuario];

        // 2. SALVA A LISTA ATUALIZADA COMPLETA NO LOCALSTORAGE
        try {
            localStorage.setItem(CHAVE_LOCAL_STORAGE, JSON.stringify(novaLista));
            setResultado(novaLista); // Atualiza o estado da tela
        } catch (e) {
            console.error("Erro ao salvar no localStorage:", e);
            alert("Não foi possível salvar os dados no navegador.");
        }

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