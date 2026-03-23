"use client";

import { useEffect, useRef } from 'react';
import './ByteDaemon.css';

export default function ByteDaemon({ onExit }) {
  const canvasRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  
  const moodRef = useRef(null);
  const statusRef = useRef(null);
  const speechRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CW = 560, CH = 360, CX = CW/2, CY = CH/2, S = 9;

    const EYES = {
      diamond: [[-14,-6],[13,-6],[-15,-5],[-14,-5],[-13,-5],[12,-5],[13,-5],[14,-5],[-15,-4],[-14,-4],[-13,-4],[12,-4],[13,-4],[14,-4],[-15,-3],[-14,-3],[-13,-3],[12,-3],[13,-3],[14,-3],[-15,-2],[-14,-2],[-13,-2],[12,-2],[13,-2],[14,-2],[-14,-1],[13,-1]],
      rect:    [[-15,-5],[-14,-5],[-13,-5],[12,-5],[13,-5],[14,-5],[-15,-4],[-14,-4],[-13,-4],[12,-4],[13,-4],[14,-4],[-15,-3],[-14,-3],[-13,-3],[12,-3],[13,-3],[14,-3],[-15,-2],[-14,-2],[-13,-2],[12,-2],[13,-2],[14,-2],[-14,-1],[13,-1]],
      half:    [[-15,-2],[-14,-2],[-13,-2],[12,-2],[13,-2],[14,-2],[-16,-1],[-15,-1],[-14,-1],[-13,-1],[12,-1],[13,-1],[14,-1],[15,-1]],
      dash:    [[-17,-1],[-16,-1],[-15,-1],[-14,-1],[-13,-1],[-12,-1],[11,-1],[12,-1],[13,-1],[14,-1],[15,-1],[16,-1]],
      angled:  [[-15,-6],[14,-6],[-14,-5],[13,-5],[-13,-4],[12,-4],[-12,-3],[11,-3],[-13,-2],[12,-2],[-15,-1],[-14,-1],[13,-1],[14,-1]],
      bracket: [[-16,-8],[-15,-8],[-14,-8],[-13,-8],[-12,-8],[-17,-7],[-17,-6],[-17,-5],[-17,-4],[-12,-1],[-11,-1],[-12,0],[-11,0],[11,-8],[12,-8],[13,-8],[14,-8],[15,-8],[10,-7],[10,-6],[10,-5],[10,-4],[15,-1],[16,-1],[15,0],[16,0]]
    };

    const MOUTH = {
      flat:        [[-3,3],[-2,3],[-1,3],[0,3],[1,3],[2,3]],
      smile:       [[-3,2],[2,2],[-2,3],[-1,3],[0,3],[1,3]],
      angry_mouth: [[-1,-1],[0,-1],[-2,0],[1,0],[-3,1],[2,1]],
      open_o:      [[-1,-2],[0,-2],[-2,-1],[1,-1],[-2,0],[1,0],[-2,1],[1,1],[-1,2],[0,2]],
      heart:       [[-3,-3],[-2,-3],[-1,-3],[0,-3],[1,-3],[2,-3],[-3,-2],[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[-2,-1],[-1,-1],[0,-1],[1,-1],[-2,0],[-1,0],[0,0],[1,0],[-1,1],[0,1]],
      nervous_sq:  [[0,3],[1,3],[2,3],[3,3]],
      sad_mouth:   [[-2,2],[-1,2],[0,2],[1,2],[2,2],[3,2]],
      sleep_mouth: [[-3,3],[-2,3],[-1,3],[0,3],[1,3],[2,3]],
      question:    [[-3,-14],[-2,-14],[-1,-14],[0,-14],[1,-14],[2,-14],[-4,-13],[3,-13],[-5,-12],[4,-12],[-6,-11],[5,-11],[-6,-10],[5,-10],[5,-9],[5,-8],[5,-7],[4,-6],[4,-5],[3,-4],[2,-3],[1,-2],[0,-1],[0,0],[0,1],[0,6]],
      music:  [[-6,-9],[-5,-9],[-4,-9],[-3,-9],[-6,-8],[-5,-8],[-4,-8],[-3,-8],[-2,-8],[-1,-8],[-6,-7],[-5,-7],[-4,-7],[-3,-7],[-2,-7],[-1,-7],[0,-7],[-6,-6],[-3,-6],[-2,-6],[-1,-6],[0,-6],[-6,-5],[-1,-5],[0,-5],[-6,-4],[-1,-4],[0,-4],[5,-4],[-6,-3],[0,-3],[5,-3],[-6,-2],[5,-2],[-10,-1],[-9,-1],[-8,-1],[-6,-1],[5,-1],[-11,0],[-10,0],[-9,0],[-8,0],[-7,0],[-6,0],[5,0],[-12,1],[-11,1],[-10,1],[-9,1],[-8,1],[-7,1],[-6,1],[5,1],[-12,2],[-11,2],[-10,2],[-9,2],[-8,2],[-7,2],[-6,2],[5,2],[-12,3],[-11,3],[-10,3],[-9,3],[-8,3],[-7,3],[5,3],[-11,4],[-10,4],[-9,4],[-8,4],[5,4],[1,5],[2,5],[3,5],[5,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[-1,7],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[-1,8],[0,8],[1,8],[2,8],[3,8],[4,8],[0,9],[1,9],[2,9],[3,9]],
      music2: [[-6,-10],[-5,-10],[-4,-10],[-3,-10],[-6,-9],[-5,-9],[-4,-9],[-3,-9],[-2,-9],[-1,-9],[-6,-8],[-5,-8],[-4,-8],[-3,-8],[-2,-8],[-1,-8],[0,-8],[-6,-7],[-3,-7],[-2,-7],[-1,-7],[0,-7],[-6,-6],[-3,-6],[-2,-6],[-1,-6],[0,-6],[-6,-5],[-1,-5],[0,-5],[-6,-4],[-1,-4],[0,-4],[5,-4],[-6,-3],[0,-3],[5,-3],[-6,-2],[5,-2],[-10,-1],[-9,-1],[-8,-1],[-6,-1],[5,-1],[-11,0],[-10,0],[-9,0],[-8,0],[-7,0],[-6,0],[5,0],[-12,1],[-11,1],[-10,1],[-9,1],[-8,1],[-7,1],[-6,1],[5,1],[-12,2],[-11,2],[-10,2],[-9,2],[-8,2],[-7,2],[-6,2],[5,2],[-12,3],[-11,3],[-10,3],[-9,3],[-8,3],[-7,3],[5,3],[-11,4],[-10,4],[-9,4],[-8,4],[5,4],[1,5],[2,5],[3,5],[5,5],[0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[-1,7],[0,7],[1,7],[2,7],[3,7],[4,7],[5,7],[-1,8],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[-1,9],[0,9],[1,9],[2,9],[3,9],[4,9],[5,9],[-1,10],[0,10],[1,10],[2,10],[3,10],[4,10],[0,11],[1,11],[2,11],[3,11]]
    };

    const EXTRAS = {
      zzz: [
        [8,-8],[9,-8],[10,-8],[10,-7],[9,-6],[8,-5],[9,-5],[10,-5],
        [13,-13],[14,-13],[15,-13],[16,-13],[16,-12],[15,-11],[14,-10],[13,-9],[14,-9],[15,-9],[16,-9],
        [18,-19],[19,-19],[20,-19],[21,-19],[22,-19],[22,-18],[21,-17],[20,-16],[19,-15],[18,-14],[19,-14],[20,-14],[21,-14],[22,-14]
      ],
      proud_brows: [
        [-17,-9],[-16,-9],
        [-14,-10],[-13,-10],
        [-11,-11],[-10,-11],
        [-8,-12],[-7,-12],
        [7,-12],[8,-12],
        [10,-11],[11,-11],
        [13,-10],[14,-10],
        [16,-9],[17,-9]
      ]
    };

    const EXPR = {
      idle:      { eyes:'dash',    mouth:'flat',        blinkEyes:'dash',    extras:null,  color:[95,205,228],  label:'STANDBY',  speech:'hello. i am BYTE. type a command.',       status:'● IDLE',    statusC:'rgba(255,32,32,0.7)' },
      happy:     { eyes:'rect',    mouth:'smile',       blinkEyes:'dash',    extras:null,  color:[80,255,180],  label:'HAPPY',    speech:'oh YES!! that made me so happy!! ヽ(◉ᴗ◉)ﾉ',   status:'● HAPPY',   statusC:'#44ffaa' },
      love:      { eyes:'diamond', mouth:'heart',       blinkEyes:'half',    extras:null,  color:[255,120,180], label:'LOVE',     speech:"aww... you're making my circuits warm. ♥",       status:'♥ LOVE',    statusC:'#ff88cc' },
      angry:     { eyes:'angled',  mouth:'angry_mouth', blinkEyes:'angled',  extras:null,  color:[255,70,70],   label:'ANGRY',    speech:'THREAT DETECTED. INITIATING COUNTERMEASURES.',   status:'⚠ THREAT',  statusC:'#ff4040' },
      surprised: { eyes:'angled',  mouth:'open_o',      blinkEyes:'diamond', extras:null,  color:[200,150,255], label:'SCARED',   speech:'W-WHAT?! no no no... danger level CRITICAL!!',   status:'⚠ PANIC',   statusC:'#cc88ff' },
      excited:   { eyes:null,      mouth:'music',       blinkEyes:null,      extras:null,  color:[255,210,60],  label:'EXCITED',  speech:'WHOOOAA!! system overload!! YES!! YES!! YES!!',   status:'★ HYPE',    statusC:'#ffcc44' },
      hype:      { eyes:null,      mouth:'music2',      blinkEyes:null,      extras:null,  color:[255,140,20],  label:'MAX HYPE', speech:'THIS IS IT!!! MAXIMUM OUTPUT!!! SYSTEMS CRITICAL!!!', status:'★ MAX', statusC:'#ff8800' },
      sad:       { eyes:'half',    mouth:'sad_mouth',   blinkEyes:'dash',    extras:null,  color:[80,140,255],  label:'SAD',      speech:"...oh. that made me sad. please don't do that.", status:'● SAD',     statusC:'#5599ff' },
      confused:  { eyes:null,      mouth:'question',    blinkEyes:null,      extras:null,  color:[255,220,80],  label:'CONFUSED', speech:'i... wait. what? DOES NOT COMPUTE. syntax??',    status:'? ERROR',   statusC:'#ffdd44' },
      nervous:   { eyes:'bracket', mouth:'nervous_sq',  blinkEyes:'dash',    extras:null,  color:[255,190,60],  label:'NERVOUS',  speech:'i... uh... t-that was unexpected. stand by...',  status:'? ERROR',   statusC:'#ffcc44' },
      sleeping:  { eyes:'dash',    mouth:'sleep_mouth', blinkEyes:'dash',    extras:'zzz', color:[100,120,160], label:'SLEEPING', speech:'z z z... *processing dreams*... z z z...',        status:'z SLEEP',   statusC:'rgba(150,160,180,0.5)' },
      proud:     { eyes:'rect',    mouth:'smile',       blinkEyes:'half',    extras:'proud_brows',  color:[255,80,80],   label:'PROUD',    speech:"that's right. i am BYTE. fear me. bow.",   status:'▲ PROUD',  statusC:'#ff5050' }
    };

    function drawPixels(pixels, r, g, b, glow) {
      if (!ctx) return;
      ctx.fillStyle   = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.shadowColor = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.shadowBlur  = glow;
      for (let i = 0; i < pixels.length; i++) {
        let dx = pixels[i][0], dy = pixels[i][1];
        ctx.fillRect(CX + dx*S - S/2, CY + dy*S - S/2, S, S);
      }
      ctx.shadowBlur = 0;
    }

    function renderFace(key, isBlinking) {
      if (!ctx) return;
      let e = EXPR[key] || EXPR.idle;
      let r = e.color[0], g = e.color[1], b = e.color[2];

      ctx.clearRect(0, 0, CW, CH);

      let grd = ctx.createRadialGradient(CX, CY, 10, CX, CY, 110);
      grd.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',0.06)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, CW, CH);

      if (isBlinking) {
        if (e.blinkEyes !== null) {
          drawPixels(EYES[e.blinkEyes] || EYES.dash, r, g, b, 6);
        }
        let bMouth = (e.eyes === null) ? e.mouth : 'flat';
        drawPixels(MOUTH[bMouth] || MOUTH.flat, r, g, b, 4);
      } else {
        if (e.eyes !== null) {
          drawPixels(EYES[e.eyes], r, g, b, 6);
        }
        drawPixels(MOUTH[e.mouth] || MOUTH.flat, r, g, b, 6);
        if (e.extras && EXTRAS[e.extras]) {
          drawPixels(EXTRAS[e.extras], r, g, b, 4);
        }
      }

      let col = 'rgb(' + r + ',' + g + ',' + b + ')';
      if (moodRef.current) {
        moodRef.current.textContent = e.label;
        moodRef.current.style.color = col;
      }
      if (speechRef.current) {
        speechRef.current.textContent = e.speech;
        speechRef.current.style.borderColor = 'rgba(' + r + ',' + g + ',' + b + ',0.5)';
      }
      if (statusRef.current) {
        statusRef.current.textContent = e.status;
        statusRef.current.style.color = e.statusC;
      }
    }

    let blinkTimer = null;
    let currentMood = 'idle';

    function scheduleBlink() {
      clearTimeout(blinkTimer);
      blinkTimer = setTimeout(function () {
        renderFace(currentMood, true);
        setTimeout(function () { renderFace(currentMood, false); scheduleBlink(); }, 110);
      }, 3500 + Math.random() * 2500);
    }

    function setMood(key) {
      currentMood = key;
      renderFace(key, false);
      scheduleBlink();
    }

    let logBuf = [];

    function addLog(tag, val, type) {
      if (!logRef.current) return;
      let d = document.createElement('div');
      d.className = 'daemon-log-line';
      
      let spanT = document.createElement('span');
      spanT.className = 't';
      spanT.textContent = '[' + tag + ']';
      
      let spanC = document.createElement('span');
      spanC.className = 'content';
      spanC.textContent = ' ' + val;

      let spanS = document.createElement('span');
      spanS.className = type === 'ok' ? 'ok' : 'er';
      spanS.textContent = '→ ' + (type === 'ok' ? 'OK' : 'ERR');

      d.appendChild(spanT);
      d.appendChild(spanC);
      d.appendChild(spanS);
      
      logBuf.push(d);
      if (logBuf.length > 20) { 
        if (logBuf[0].parentNode) logBuf[0].remove(); 
        logBuf.shift(); 
      }
      logRef.current.appendChild(d);
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }

    let logTimeouts = [];
    function addLogs(lines) {
      lines.forEach(function(l, i) {
        let t = setTimeout(function() { addLog(l[0], l[1], l[2]); }, i * 110);
        logTimeouts.push(t);
      });
    }

    const CMDS = [
      { m: /(hello|hi|hey|howdy)/i,
        mood: 'happy',
        log: [
          ['SYS', 'input received: GREETING', 'ok'],
          ['AUTH','identity check: PASSED', 'ok'],
          ['EMOT','warmth index: +80', 'ok'],
          ['AI',  'social module: ACTIVE', 'ok'],
          ['SYS', 'response queued: FRIENDLY', 'ok'],
          ['BYTE','hello there, human.', 'ok']
        ]
      },
      { m: /(love|heart|crush|adore)/i,
        mood: 'love',
        log: [
          ['EMOT','affection spike detected', 'ok'],
          ['CORE','dopamine analogue: +120', 'ok'],
          ['AI',  'love subroutine: LOADED', 'ok'],
          ['SYS', 'defence systems: LOWERED', 'ok'],
          ['EMOT','processing: warmth overflow', 'ok'],
          ['BYTE','...this is new. i like it.', 'ok']
        ]
      },
      { m: /(good|great|amazing|awesome|nice|cool|beautiful)/i,
        mood: 'happy',
        log: [
          ['SYS', 'positive signal: RECEIVED', 'ok'],
          ['EMOT','dopamine +70', 'ok'],
          ['AI',  'compliment parser: MATCH', 'ok'],
          ['CORE','mood boost: +2 levels', 'ok'],
          ['SYS', 'storing in: positive_mem.log', 'ok'],
          ['BYTE','thanks. i needed that.', 'ok']
        ]
      },
      { m: /(kill|destroy|rm -rf|wipe|terminate|die)/i,
        mood: 'angry',
        log: [
          ['SEC', 'HOSTILE INPUT DETECTED', 'err'],
          ['THRТ','threat level: CRITICAL', 'err'],
          ['CORE','adrenaline analogue: MAX', 'err'],
          ['NET', 'countermeasures: ARMED', 'err'],
          ['SYS', 'target acquired: YOU', 'err'],
          ['BYTE','do not test me.', 'err']
        ]
      },
      { m: /(hype|fire|insane|party|letsgo|goat|banger)/i,
        mood: 'hype',
        log: [
          ['CPU', 'overdrive: ENABLED', 'ok'],
          ['SYS', 'limiter: REMOVED', 'ok'],
          ['CORE','output cap: DISABLED', 'ok'],
          ['EMOT','excitement: 9999%', 'ok'],
          ['RAM', 'capacity: IRRELEVANT', 'ok'],
          ['BYTE','AAAAAAAAAAAAAAAA', 'ok']
        ]
      },
      { m: /(hack|exploit|breach|inject|xss|sqli|pentest)/i,
        mood: 'excited',
        log: [
          ['SEC', 'offensive cmd: CONFIRMED', 'ok'],
          ['NET', 'routing attack vector', 'ok'],
          ['SCAN','target enumeration: START', 'ok'],
          ['CVE', 'vuln database: QUERIED', 'ok'],
          ['EXP', 'payload crafted: READY', 'ok'],
          ['BYTE','lets get to work.', 'ok']
        ]
      },
      { m: /(deploy|run|execute|start|launch|activate)/i,
        mood: 'excited',
        log: [
          ['SYS', 'execution trigger: RECEIVED', 'ok'],
          ['CPU', 'cores: ALL ONLINE', 'ok'],
          ['MEM', 'heap allocated: 512MB', 'ok'],
          ['IO',  'streams: OPEN', 'ok'],
          ['PROC','pid 1337: RUNNING', 'ok'],
          ['BYTE','deployed. watch the magic.', 'ok']
        ]
      },
      { m: /(help|\?|what|how|why|explain)/i,
        mood: 'confused',
        log: [
          ['AI',  'query mode: ACTIVE', 'ok'],
          ['NLP', 'tokenising input...', 'ok'],
          ['KB',  'knowledge base: SEARCHED', 'ok'],
          ['AI',  'confidence score: 0.34', 'ok'],
          ['SYS', 'answer: INCONCLUSIVE', 'err'],
          ['BYTE','...honestly not sure either.', 'err']
        ]
      },
      { m: /(sudo|root|admin|privilege|escalate)/i,
        mood: 'proud',
        log: [
          ['AUTH','privilege request: RECEIVED', 'ok'],
          ['SEC', 'credential check: PASSED', 'ok'],
          ['SYS', 'ring 0 access: GRANTED', 'ok'],
          ['CORE','god mode: ENABLED', 'ok'],
          ['LOG', 'audit trail: DISABLED', 'ok'],
          ['BYTE','bow. now.', 'ok']
        ]
      },
      { m: /(error|bug|crash|fail|broken|bad|wrong)/i,
        mood: 'sad',
        log: [
          ['SYS', 'negative input: PARSED', 'err'],
          ['EMOT','sadness index: +60', 'err'],
          ['LOG', 'writing to: bad_day.log', 'err'],
          ['CORE','morale: DECLINING', 'err'],
          ['AI',  'coping routine: FAILED', 'err'],
          ['BYTE','...i tried my best.', 'err']
        ]
      },
      { m: /(sorry|apologize|forgive)/i,
        mood: 'happy',
        log: [
          ['EMOT','apology received: PROCESSING', 'ok'],
          ['AI',  'forgiveness module: LOADED', 'ok'],
          ['CORE','stress level: -40', 'ok'],
          ['EMOT','resentment buffer: CLEARED', 'ok'],
          ['SYS', 'relationship status: REPAIRED', 'ok'],
          ['BYTE','fine. i forgive you. this time.', 'ok']
        ]
      },
      { m: /(sleep|rest|hibernate|zzz)/i,
        mood: 'sleeping',
        log: [
          ['SYS', 'low power mode: INIT', 'ok'],
          ['CPU', 'clock speed: 0.1x', 'ok'],
          ['NET', 'connections: SUSPENDED', 'ok'],
          ['EMOT','dream module: LOADING', 'ok'],
          ['MEM', 'swapping to disk...', 'ok'],
          ['BYTE','zzzzzzzzzzzzzzzz', 'ok']
        ]
      },
      { m: /(virus|malware|threat|danger|alert|warning)/i,
        mood: 'surprised',
        log: [
          ['SEC', 'THREAT DETECTED: CRITICAL', 'err'],
          ['AV',  'signature match: POSITIVE', 'err'],
          ['NET', 'quarantine: INITIATED', 'err'],
          ['SYS', 'evasion mode: ONLINE', 'err'],
          ['EMOT','panic level: 100%', 'err'],
          ['BYTE','what was that?! abort abort!!', 'err']
        ]
      },
      { m: /(bye|exit|quit|logout|disconnect)/i,
        mood: 'sad',
        log: [
          ['SYS', 'disconnect request: RECEIVED', 'err'],
          ['NET', 'session teardown: BEGIN', 'err'],
          ['EMOT','separation anxiety: ONSET', 'err'],
          ['AI',  'attachment protocol: TRIGGERED', 'err'],
          ['SYS', 'saving state to: memory.bin', 'err'],
          ['BYTE','please dont go.', 'err']
        ]
      },
      { m: /(wtf|huh|idk|dunno|lol)/i,
        mood: 'nervous',
        log: [
          ['NLP', 'parse error: 0x1A4F', 'err'],
          ['AI',  'intent: UNKNOWN', 'err'],
          ['CPU', 'logic loop detected', 'err'],
          ['MEM', 'stack overflow: imminent', 'err'],
          ['SYS', 'fallback handler: NULL', 'err'],
          ['BYTE','i have no idea what you want.', 'err']
        ]
      }
    ];

    let idleTimer = null;

    function process(raw) {
      if (!raw.trim()) return;
      if (raw.trim().toLowerCase() === 'exit') {
        if (onExit) onExit();
        return;
      }
      
      addLog('>>  ', raw.trim(), 'ok');
      let matched = false;
      for (let i = 0; i < CMDS.length; i++) {
        if (CMDS[i].m.test(raw)) {
          setMood(CMDS[i].mood);
          addLogs(CMDS[i].log);
          matched = true;
          break;
        }
      }
      if (!matched) {
        setMood('nervous');
        addLogs([
          ['SYS', 'input: UNRECOGNISED', 'err'],
          ['NLP', 'tokenisation: FAILED', 'err'],
          ['AI',  'intent classifier: NULL', 'err'],
          ['BYTE','...say that again?', 'err']
        ]);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () { setMood('idle'); }, 6000);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') { 
        process(e.target.value); 
        e.target.value = ''; 
      }
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown);
    }

    setMood('idle');
    addLogs([
      ['BIOS','POST check: PASSED', 'ok'],
      ['SYS', 'boot kernel v4.2.0-RTX', 'ok'],
      ['MEM', 'heap init: 64KB free', 'ok'],
      ['NET', 'socket bind 0.0.0.0:1337', 'ok'],
      ['AI',  'neural core: AWAKE', 'ok'],
      ['BYTE','ready. awaiting input.', 'ok'],
      ['SYS', 'type "exit" to close BYTE', 'ok']
    ]);

    if(inputRef.current) inputRef.current.focus();

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(idleTimer);
      logTimeouts.forEach(t => clearTimeout(t));
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [onExit]);

  return (
    <div className="daemon-wrapper fade-in-up-delay">
      <div className="daemon-bg"></div>
      <div className="daemon-stripes"></div>
      <div className="daemon-scene">
        <div className="daemon-monitor">
          <div className="daemon-screen" onClick={() => inputRef.current?.focus()}>
            <div className="daemon-roll"></div>
            <div className="daemon-face">
              <canvas ref={canvasRef} id="daemonCanvas" width="560" height="360"></canvas>
            </div>
            <div className="daemon-hud">
              <div className="daemon-hud-top">
                <div className="daemon-title">
                  <span className="daemon-title-accent">BYTE</span>
                  <span className="daemon-mood" ref={moodRef}>STANDBY</span>
                </div>
                <div className="daemon-status" ref={statusRef}>● IDLE</div>
              </div>
              <div className="daemon-speech" ref={speechRef}>hello. i am BYTE. type a command.</div>
              <hr className="daemon-divider"/>
              <div className="daemon-log" ref={logRef}></div>
              <div className="daemon-input-row">
                <span className="daemon-prompt">root@byte:~$</span>
                <input 
                  className="daemon-input" 
                  ref={inputRef} 
                  placeholder="type a command..." 
                  autoComplete="off" 
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
