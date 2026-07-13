import { useState } from 'react';
import './App.css'

// Chave imutável globalizada
const CHAVE_PROJETO = 'project_react_2_lista_usuarios_final';

export default function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    // Busca o dado usando JS puro no instante zero da execução
    const [resultado, setResultado] = useState(() => {
        try {
            const salvos = window.localStorage.getItem(CHAVE_PROJETO);
            if (salvos) {
                const convertidos = JSON.parse(salvos);
                if (Array.isArray(convertidos)) return convertidos;
            }
        } catch (err) {
            console.error("Falha nativa de leitura:", err);
        }
        return [];
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const emailFormatado = email.trim().toLowerCase();
        const existe = resultado.some(u => u.email?.trim().toLowerCase() === emailFormatado);

        if (existe) {
            alert('Este e-mail já está cadastrado!');
            return; 
        }
        
        const novoUsuario = {
            id: Number(Date.now()),
            name: name.trim(),
            email: email.trim(),
            age: age
        };

        const novaLista = [...resultado, novoUsuario];

        // GRAVAÇÃO FORÇADA DIRETAMENTE NA JANELA DO NAVEGADOR
        try {
            window.localStorage.setItem(CHAVE_PROJETO, JSON.stringify(novaLista));
            // Sincroniza o estado do React APENAS depois que o navegador confirmou o salvamento
            setResultado(novaLista);
        } catch (err) {
            alert("O navegador impediu a gravação de dados locais.");
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
