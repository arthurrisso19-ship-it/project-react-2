import { useState } from 'react';
import './App.css';

const CHAVE_PROJETO = 'project_react_2_lista_usuarios_final';

export default function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    // Estado inicial lendo do localStorage
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

    // FUNÇÃO PARA CADASTRAR USUÁRIO
    const handleCadastrar = (e) => {
        e.preventDefault(); // Evita recarregar a página se usar form

        if (!name || !email || !age) {
            console.log("Preencha todos os campos!");
            return;
        }

        const emailFormatado = email.trim().toLowerCase();
        const existe = resultado.some(u => u.email?.trim().toLowerCase() === emailFormatado);

        if (existe) {
            console.log('Este e-mail já está cadastrado!');
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
            console.log("Usuário salvo no navegador com sucesso!");
        } catch (err) {
            console.error(err);
        }

        setName('');
        setEmail('');
        setAge('');
    };

    // FUNÇÃO PARA REMOVER UM USUÁRIO ESPECÍFICO PELO ID
    const handleRemover = (idParaRemover) => {
        // Filtra mantendo apenas os usuários com ID diferente do selecionado
        const novaLista = resultado.filter(usuario => usuario.id !== idParaRemover);
        
        // Atualiza o estado e salva de volta no localStorage
        setResultado(novaLista);
        window.localStorage.setItem(CHAVE_PROJETO, JSON.stringify(novaLista));
        console.log(`Usuário com ID ${idParaRemover} removido com sucesso!`);
    };

    return (
        <>
            <h1>Cadastro de Usuários</h1>
            <div className='hi'>
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
                    {/* Vinculado à função de cadastro */}
                    <button type='button' onClick={handleCadastrar}>Cadastrar</button>
                </div>
            </div>
            
            <ol>
                {resultado.map((item) => (
                    // IDs no HTML não devem ser repetidos, por isso usei o item.id dinâmico
                    <li id={`user-${item.id}`} key={item.id}>
                        {item.name} - {item.email} - {item.age}
                        {/* Botão de remover fica individual dentro de cada linha da lista */}
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
