"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ByteDaemon from './ByteDaemon';

export default function Terminal() {
  const router = useRouter();
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  const [currentPath, setCurrentPath] = useState('/home/guest');
  const [isByteMode, setIsByteMode] = useState(false);
  const [history, setHistory] = useState([
    { type: 'text', content: <p style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-pixel)' }}>redteamX OS [Version 10.0.19045.3693]</p> },
    { type: 'text', content: <p>(c) PDEU Collective. All rights reversed.</p> },
    { type: 'text', content: <br /> },
    { type: 'text', content: <p>Access granted. Type <span style={{ color: 'var(--accent-red)' }}>help</span> for a list of executable commands. You can also type page names directly (e.g. <span style={{ color: 'var(--accent-red)' }}>about</span>) to navigate.</p> }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputMode, setInputMode] = useState(''); // '' or 'contact' or 'addinfo'
  const [addInfoState, setAddInfoState] = useState({ step: 0, title: '', content: '', password: '' });

  const vfs = {
    '/home/guest': {
      type: 'dir',
      contents: {
        'about.txt': { type: 'file', content: 'redteamX is the premier cybersecurity community at PDEU.\nWe hack, we learn, we defend.\nType "about" to go to the About page.' },
        'operations.sh': { type: 'file', content: 'echo "Redirecting to Operations..."', executable: true },
        'secure_zone': { type: 'dir', contents: {} },
        'contact.exe': { type: 'file', content: 'Run this executable to send a message to HQ.', executable: true },
        'byte.sh': { type: 'file', content: 'Execute this to interact with BYTE-DÆMON.', executable: true }
      }
    },
    '/home/guest/secure_zone': {
      type: 'dir',
      contents: {
        'flag.txt': { type: 'file', content: 'pdeu{w3lc0m3_t0_th3_r3s1st4nc3}' },
        'team_manifest.json': { type: 'file', content: '{\n  "President": "Alex Neo",\n  "VP": "Sarah Kerrigan",\n  "TechLead": "JD Cipher"\n}' }
      }
    }
  };

  const resolvePath = (path) => {
    if (!path || path === '~') return '/home/guest';
    if (path === '/') return '/';
    if (path.startsWith('/')) return vfs[path] ? path : null;
    
    if (path === '..') {
      if (currentPath === '/home/guest') return '/home';
      if (currentPath === '/home') return '/';
      if (currentPath === '/') return '/';
      const parts = currentPath.split('/');
      parts.pop();
      return parts.join('/') || '/';
    }

    const newPath = currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
    return vfs[newPath] ? newPath : null;
  };

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmdString) => {
    const args = cmdString.trim().split(' ').filter(arg => arg !== '');
    const cmd = args.length > 0 ? args[0].toLowerCase() : '';
    
    const displayPath = currentPath.replace('/home/guest', '~');
    
    // Echo the command
    const newHistory = [...history, {
      type: 'command',
      path: displayPath,
      command: cmdString
    }];

    // Direct page navigation
    const pages = ['about', 'team', 'cache', 'operations'];
    if (pages.includes(cmd)) {
      newHistory.push({ type: 'text', content: <p style={{ color: '#ffbd2e' }}>Initiating jump to /{cmd}...</p> });
      setHistory(newHistory);
      setTimeout(() => router.push(`/${cmd}`), 800);
      return;
    }

    let responseContent = '';
    let responseStyle = { color: '#fff', marginBottom: '0.5rem' };

    const currentDirObj = vfs[currentPath];

    if (inputMode === 'contact') {
      setInputMode('');
      fetch('https://formspree.io/f/xvgzgzyz', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ message: cmdString, user: 'guest_terminal' })
      }).catch(() => {});
      responseContent = <><span style={{ color: '#27c93f' }}>[SUCCESS]</span> Transmission acknowledged. The collective will review your signal.</>;
    } else if (inputMode === 'addinfo') {
      if (addInfoState.step === 1) {
        setAddInfoState({ ...addInfoState, title: cmdString, step: 2 });
        responseContent = <><span style={{ color: '#ffbd2e' }}>Enter Content:</span></>;
      } else if (addInfoState.step === 2) {
        setAddInfoState({ ...addInfoState, content: cmdString, step: 3 });
        responseContent = <><span style={{ color: '#ffbd2e' }}>Enter Password:</span></>;
      } else if (addInfoState.step === 3) {
        setInputMode('');
        const title = addInfoState.title;
        const content = addInfoState.content;
        const password = cmdString; // from this input
        fetch('/api/info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, password, author: 'admin' })
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setHistory(prev => [...prev, { type: 'text', content: <div style={{color: '#ff5f56'}}>[ERROR] {data.error}</div> }]);
          } else {
             setHistory(prev => [...prev, { type: 'text', content: <div style={{color: '#27c93f'}}>[SUCCESS] Information cached successfully.</div> }]);
          }
        }).catch(() => {
          setHistory(prev => [...prev, { type: 'text', content: <div style={{color: '#ff5f56'}}>[ERROR] Network failure.</div> }]);
        });
        
        responseContent = <span style={{ color: '#4b83fb' }}>Processing transmission...</span>;
      }
    } else {
      switch(cmd) {
        case 'addinfo':
          responseContent = <><span style={{ color: '#ffbd2e' }}>Enter Info Title:</span></>;
          setInputMode('addinfo');
          setAddInfoState({ step: 1, title: '', content: '', password: '' });
          break;
        case 'help':
          responseContent = (
            <>
              Available commands: <br/>
              - <span style={{ color: 'var(--accent-red)' }}>ls [dir]</span>: List directory contents<br/>
              - <span style={{ color: 'var(--accent-red)' }}>cd [dir]</span>: Change directory<br/>
              - <span style={{ color: 'var(--accent-red)' }}>cat [file]</span>: Read file contents<br/>
              - <span style={{ color: 'var(--accent-red)' }}>pwd</span>: Print working directory<br/>
              - <span style={{ color: 'var(--accent-red)' }}>whoami</span>: Print effective user<br/>
              - <span style={{ color: 'var(--accent-red)' }}>clear</span>: Clear terminal<br/>
              - <span style={{ color: 'var(--accent-red)' }}>./[file]</span>: Execute file<br/>
              <br/>
              <i>Navigation Commands:</i><br/>
              Type <b>about</b>, <b>operations</b>, <b>team</b>, or <b>cache</b> to navigate the site.
            </>
          );
          break;
        case 'ls':
          let targetLsPath = currentPath;
          if (args[1]) {
             const resolved = resolvePath(args[1]);
             if (!resolved) {
               responseContent = `ls: cannot access '${args[1]}': No such file or directory`;
               break;
             }
             targetLsPath = resolved;
          }

          const lsDir = vfs[targetLsPath];
          if (!lsDir || lsDir.type !== 'dir') {
            responseContent = `ls: cannot access '${args[1] || ''}': Not a directory`;
          } else {
            const files = Object.keys(lsDir.contents).map(name => {
              const item = lsDir.contents[name];
              if (item.type === 'dir') return <span key={name} style={{ color: '#4b83fb', fontWeight: 'bold', marginRight: '10px' }}>{name}/</span>;
              if (item.executable) return <span key={name} style={{ color: '#27c93f', fontWeight: 'bold', marginRight: '10px' }}>{name}*</span>;
              return <span key={name} style={{ marginRight: '10px' }}>{name}</span>;
            });
            responseContent = <div>{files}</div>;
          }
          break;
        case 'cd':
          const targetCd = args[1] || '~';
          const resolvedCd = resolvePath(targetCd);
          if (!resolvedCd) {
            responseContent = `cd: ${targetCd}: No such file or directory`;
          } else if (!vfs[resolvedCd] || vfs[resolvedCd].type !== 'dir') {
             if (resolvedCd === '/' || resolvedCd === '/home') {
               setCurrentPath(resolvedCd);
             } else {
               responseContent = `cd: ${targetCd}: Not a directory`;
             }
          } else {
            setCurrentPath(resolvedCd);
          }
          break;
        case 'pwd':
          responseContent = currentPath;
          break;
        case 'whoami':
          responseContent = 'guest';
          break;
        case 'cat':
          if (!args[1]) {
            responseContent = 'cat: missing operand';
          } else {
            const targetFile = args[1];
            if (currentDirObj && currentDirObj.contents[targetFile] && currentDirObj.contents[targetFile].type === 'file') {
               responseContent = currentDirObj.contents[targetFile].content;
            } else {
               responseContent = `cat: ${targetFile}: No such file or directory`;
            }
          }
          break;
        case './operations.sh':
        case 'bash':
          if (cmd === 'bash' && args[1] !== 'operations.sh') {
            responseContent = `bash: ${args[1] || ''}: No such file or directory`;
            break;
          }
          if (currentPath === '/home/guest') {
            responseContent = 'Executing operations... Redirecting.';
            setTimeout(() => { router.push('/operations'); }, 800);
          } else {
            responseContent = `bash: operations.sh: No such file or directory`;
          }
          break;
        case './contact.exe':
          if (currentPath === '/home/guest') {
            responseContent = <><span style={{ color: '#ffbd2e' }}>Initiating secure comms channel...</span><br/>Type your message and press ENTER to transmit to HQ:</>;
            setInputMode('contact');
          } else {
            responseContent = `./contact.exe: No such file or directory`;
          }
          break;
        case 'clear':
          setHistory([]);
          return;
        case './byte.sh':
        case 'byte.sh':
        case 'byte':
          setIsByteMode(true);
          setHistory([]);
          return;
        case '':
          break;
        default:
          responseStyle.color = '#ff5f56';
          responseContent = `bash: ${cmd}: command not found`;
      }
    }

    if (responseContent || cmd === '') {
      newHistory.push({ type: 'text', content: <div style={responseStyle}>{responseContent}</div> });
    }
    
    setHistory(newHistory);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  const targetHeight = isByteMode ? '550px' : '380px';
  const targetWidth = isByteMode ? '900px' : '800px';

  return (
    <div 
      className="terminal-window fade-in-up-delay"
      style={{
        transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        height: targetHeight,
        maxWidth: targetWidth,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="terminal-header" onClick={() => (isByteMode ? null : inputRef.current?.focus())}>
        <div className="t-btn red" onClick={() => isByteMode && setIsByteMode(false)} style={isByteMode ? { cursor: 'pointer' } : {}}></div>
        <div className="t-btn yellow"></div>
        <div className="t-btn green"></div>
        <div className="t-title" style={{ fontFamily: 'var(--font-pixel)', letterSpacing: '0.05em' }}>
          {isByteMode ? 'BYTE // UNIT-01' : <>guest@redteamX:<span style={{ color: '#4b83fb' }}>~</span></>}
        </div>
      </div>
      {isByteMode ? (
        <div style={{ flex: 1, position: 'relative' }}>
          <ByteDaemon onExit={() => setIsByteMode(false)} />
        </div>
      ) : (
        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()} style={{ background: '#0a0a0a', padding: '1.5rem', fontFamily: 'var(--font-pixel)', fontSize: '1.1rem', flex: 1, height: 'auto', overflowY: 'auto' }}>
          <div className="term-history">
          {history.map((item, i) => (
            <div key={i} style={{ marginBottom: item.type === 'command' ? '0.4rem' : '0.8rem', lineHeight: '1.6' }}>
              {item.type === 'command' ? (
                <p>
                  <span style={{ color: '#27c93f', fontWeight: 'bold' }}>guest@redteamX</span>:
                  <span style={{ color: '#4b83fb', fontWeight: 'bold', marginLeft: '5px' }}>{item.path}</span>
                  <span className="prompt" style={{ color: '#ff2020', margin: '0 5px' }}>$</span> {item.command}
                </p>
              ) : (
                <div style={{ color: '#d0d0d0' }}>{item.content}</div>
              )}
            </div>
          ))}
        </div>
        <div className="term-input-line" style={{ marginTop: '0.8rem' }}>
          {!inputMode && (
            <>
              <span style={{ color: '#27c93f', fontWeight: 'bold', fontFamily: 'var(--font-pixel)' }}>guest@redteamX</span>:
              <span style={{ color: '#4b83fb', fontWeight: 'bold', fontFamily: 'var(--font-pixel)', marginLeft: '5px' }}>{currentPath.replace('/home/guest', '~')}</span>
              <span className="prompt" style={{ color: '#ff2020', margin: '0 5px', fontFamily: 'var(--font-pixel)' }}>$</span>
            </>
          )}
          <input
            type="text"
            ref={inputRef}
            className="term-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
            placeholder={inputMode === 'addinfo' ? '' : inputMode === 'contact' ? 'Enter message...' : ''}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
            style={{ fontSize: '1.1rem', fontFamily: 'var(--font-pixel)', background: 'transparent', color: '#fff', letterSpacing: '0.05em' }}
          />
        </div>
      </div>
      )}
    </div>
  );
}
