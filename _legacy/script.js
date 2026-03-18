document.addEventListener('DOMContentLoaded', () => {

  // 0. Loading Screen (Matrix Glitch) - Run on every page load
  const loader = document.getElementById('loader');
  
  // Matrix Background Generation
  const matrixContainer = document.getElementById('matrix-container');
  if (matrixContainer) {
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    for (let i = 0; i < 50; i++) {
      const span = document.createElement('span');
      span.innerText = chars.charAt(Math.floor(Math.random() * chars.length));
      span.style.position = 'absolute';
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.fontSize = `${Math.random() * 20 + 10}px`;
      span.style.opacity = Math.random();
      span.style.animation = `pulse ${Math.random() * 2 + 1}s infinite`;
      matrixContainer.appendChild(span);
    }
  }

  // Simulate load time, then fade out
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 1800); // reduced to 1.8 seconds for multi-page fluidity

  // 0.5 Custom Cursor & Background Spotlight
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  const interactiveBg = document.querySelector('.interactive-bg');
  
  document.addEventListener('mousemove', (e) => {
    if (cursor && follower) {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    if (interactiveBg) {
      interactiveBg.style.setProperty('--cursor-x', `${e.clientX}px`);
      interactiveBg.style.setProperty('--cursor-y', `${e.clientY}px`);
    }
  });

  // Add hover effect to interactive elements
  const interactives = document.querySelectorAll('a, .flip-card, .t-btn, input');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('hover-state');
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('hover-state');
    });
  });

  // 0.6 Virtual File System & Terminal Logic
  const termInput = document.getElementById('term-input');
  const termHistory = document.getElementById('term-history');
  const termPrefix = document.getElementById('term-prefix') || { innerText: '' }; // Added prefix dynamic
  
  // Virtual File System State
  let currentPath = '/home/guest';
  const vfs = {
    '/home/guest': {
      type: 'dir',
      contents: {
        'about.txt': { type: 'file', content: 'redteamX is the premier cybersecurity community at PDEU.\nWe hack, we learn, we defend.\nType "cd secure_zone" to find out more.' },
        'operations.sh': { type: 'file', content: 'echo "Redirecting to Operations..."', executable: true, url: 'operations.html' },
        'secure_zone': { type: 'dir', contents: {} },
        'contact.exe': { type: 'file', content: 'Run this executable to send a message to HQ.', executable: true }
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

  // Helper function to resolve paths
  const resolvePath = (path) => {
    if (!path || path === '~') return '/home/guest';
    if (path === '/') return '/'; // We restrict to /home/guest for simplicity but allow / to exist empty
    if (path.startsWith('/')) return vfs[path] ? path : null;
    
    // Handle ..
    if (path === '..') {
      if (currentPath === '/home/guest') return '/home';
      if (currentPath === '/home') return '/';
      if (currentPath === '/') return '/';
      const parts = currentPath.split('/');
      parts.pop();
      return parts.join('/') || '/';
    }

    // Relative path
    const newPath = currentPath === '/' ? `/${path}` : `${currentPath}/${path}`;
    return vfs[newPath] ? newPath : null;
  };

  if (termInput && termHistory) {
    termInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const inputString = this.value.trim();
        const args = inputString.split(' ').filter(arg => arg !== '');
        const cmd = args.length > 0 ? args[0].toLowerCase() : '';
        
        // Echo command
        const echoLine = document.createElement('p');
        const displayPath = currentPath.replace('/home/guest', '~');
        echoLine.innerHTML = `<span style="color:#27c93f">guest@redteamX</span>:<span style="color:#4b83fb">${displayPath}</span><span class="prompt">$</span> ${inputString}`;
        termHistory.appendChild(echoLine);
        
        // Handle commands
        const res = document.createElement('div');
        res.style.color = '#fff';
        res.style.marginBottom = '0.5rem';

        const currentDirObj = vfs[currentPath];
        
        switch(cmd) {
          case 'help':
            res.innerHTML = `Available commands: <br/>
              - <span style="color:var(--accent-red)">ls [dir]</span>: List directory contents<br/>
              - <span style="color:var(--accent-red)">cd [dir]</span>: Change directory<br/>
              - <span style="color:var(--accent-red)">cat [file]</span>: Read file contents<br/>
              - <span style="color:var(--accent-red)">pwd</span>: Print working directory<br/>
              - <span style="color:var(--accent-red)">whoami</span>: Print effective user<br/>
              - <span style="color:var(--accent-red)">clear</span>: Clear terminal<br/>
              - <span style="color:var(--accent-red)">./[file]</span>: Execute file`;
            break;

          case 'ls':
            let targetLsPath = currentPath;
            if (args[1]) {
               const resolved = resolvePath(args[1]);
               if (!resolved) {
                 res.innerText = `ls: cannot access '${args[1]}': No such file or directory`;
                 break;
               }
               targetLsPath = resolved;
            }

            const lsDir = vfs[targetLsPath];
            if (!lsDir || lsDir.type !== 'dir') {
              res.innerText = `ls: cannot access '${args[1] || ''}': Not a directory`;
            } else {
              const files = Object.keys(lsDir.contents).map(name => {
                const item = lsDir.contents[name];
                if (item.type === 'dir') return `<span style="color:#4b83fb; font-weight:bold">${name}/</span>`;
                if (item.executable) return `<span style="color:#27c93f; font-weight:bold">${name}*</span>`;
                return name;
              });
              res.innerHTML = files.join('  ');
            }
            break;

          case 'cd':
            const targetCd = args[1] || '~';
            const resolvedCd = resolvePath(targetCd);
            if (!resolvedCd) {
              res.innerText = `cd: ${targetCd}: No such file or directory`;
            } else if (!vfs[resolvedCd] || vfs[resolvedCd].type !== 'dir') {
               // Hardcoded root/home empty overrides
               if (resolvedCd === '/' || resolvedCd === '/home') {
                 currentPath = resolvedCd;
               } else {
                 res.innerText = `cd: ${targetCd}: Not a directory`;
               }
            } else {
              currentPath = resolvedCd;
            }
            break;

          case 'pwd':
            res.innerText = currentPath;
            break;

          case 'whoami':
            res.innerText = 'guest';
            break;

          case 'cat':
            if (!args[1]) {
              res.innerText = 'cat: missing operand';
            } else {
              const targetFile = args[1];
              if (currentDirObj && currentDirObj.contents[targetFile] && currentDirObj.contents[targetFile].type === 'file') {
                 res.innerText = currentDirObj.contents[targetFile].content;
                 res.classList.add('typewriter-text');
              } else {
                 res.innerText = `cat: ${targetFile}: No such file or directory`;
              }
            }
            break;

          case './operations.sh':
          case 'bash':
            if (cmd === 'bash' && args[1] !== 'operations.sh') {
              res.innerText = `bash: ${args[1] || ''}: No such file or directory`;
              break;
            }
            if (currentPath === '/home/guest') {
              res.innerText = 'Executing operations... Redirecting.';
              setTimeout(() => { window.location.href = 'operations.html'; }, 800);
            } else {
              res.innerText = `bash: operations.sh: No such file or directory`;
            }
            break;

          case './contact.exe':
            if (currentPath === '/home/guest') {
              res.innerHTML = `<span style="color:#ffbd2e">Initiating secure comms channel...</span><br/>Type your message and press ENTER to transmit to HQ:`;
              termInput.placeholder = "Enter message...";
              termInput.dataset.mode = "contact";
            } else {
              res.innerText = `./contact.exe: No such file or directory`;
            }
            break;

          case 'clear':
            termHistory.innerHTML = '';
            this.value = '';
            // Update prompt prefix
            if(termPrefix) termPrefix.innerHTML = `guest@redteamX:<span style="color:#4b83fb">${currentPath.replace('/home/guest', '~')}</span>`;
            return;

          case '':
            break;

          default:
            // Handle Contact Mode Submission
            if (termInput.dataset.mode === "contact") {
               termInput.dataset.mode = "";
               termInput.placeholder = "";
               
               // Simulate Formspree/Backend POST request
               fetch('https://formspree.io/f/xvgzgzyz', { // Example mock endpoint
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ message: inputString, user: 'guest_terminal' })
               }).catch(e => console.log('Mock fetch block')); // Catch block for demo environments

               res.innerHTML = `<span style="color:#27c93f">[SUCCESS]</span> Transmission acknowledged. The collective will review your signal.`;
            } else {
               res.style.color = '#ff5f56';
               res.innerText = `bash: ${cmd}: command not found`;
            }
        }
        
        if(inputString !== '' || res.innerHTML !== '') termHistory.appendChild(res);
        
        this.value = '';
        
        // Update prompt prefix visually if it exists
        const prefixDisplay = document.getElementById('term-prefix-text');
        if(prefixDisplay) prefixDisplay.innerHTML = `${currentPath.replace('/home/guest', '~')}`;

        // Scroll to bottom of terminal
        const termBody = document.getElementById('term-body');
        termBody.scrollTop = termBody.scrollHeight;
      }
    });
  }

  // 1. Intersection Observer for Reveal Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, unobserve to keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));


  // 2. Navbar Hide/Show on Scroll
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Scrolling down
      navbar.classList.add('hidden');
    } else {
      // Scrolling up
      navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

});
