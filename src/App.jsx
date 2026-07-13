import { useState, useEffect } from 'react';
import './App.css'
function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [resultado, setResultado] = useState([]);
    const PREFIXO = 'project-react-2_usuario_';
    
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const usuariosCarregados = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const chave = localStorage.key(i);
                
                if (chave && chave.startsWith(PREFIXO)) {
                    const dadosTexto = localStorage.getItem(chave);
                    try {
                        if (dadosTexto) {
                            usuariosCarregados.push(JSON.parse(dadosTexto));
                        }
                    } catch (e) {
                        console.error("Erro ao ler dado do localStorage", e);
                    }
                }
            } 
            
            setResultado(usuariosCarregados);
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

        localStorage.setItem(`${PREFIXO}${novoUsuario.id}`, JSON.stringify(novoUsuario));
        setResultado((listaAtual) => [...listaAtual, novoUsuario]);

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