let t,e,i,s;const a=t=>{document.documentElement.setAttribute("data-theme",t),document.getElementById("colorThemeSelect").value=t},r=t=>{document.getElementById("modeSelect").value=t};class n{static init(){for(let t in this.opts={theme:"foam",visualizer:"line"},this.sideEffects=t=>{"theme"===t&&a(this.opts.theme),"visualizer"===t&&r(this.opts.visualizer)},this.opts)null!=localStorage.getItem(t)&&(this.opts[t]=localStorage.getItem(t),this.sideEffects(t))}static getOption(t){return this.opts[t]}static setOption(t,e){this.opts[t]=e,localStorage.setItem(t,e)}}n.init();const h={foam:{primary:"#abffca",secondary:"#000000"},fire:{primary:"#ff0000",secondary:"#000000"},bubblegum:{primary:"#ffffff",secondary:"#ffa1ee"},galaxy:{primary:"#e8daed",secondary:"#755b7d"}};var l=class{static getTheme(){return h[n.getOption("theme")]}static setTheme(t){n.setOption("theme",t),document.documentElement.setAttribute("data-theme",t),document.getElementById("colorThemeSelect").value=t}};class o{static average(t,e,{rateUp:i,rateDown:s}){console.assert(t.length===e.length);let a=new Float32Array(t.length);for(let r=0;r<t.length;r++)t[r]>e[r]?a[r]=t[r]*(1-i)+e[r]*i:a[r]=t[r]*(1-s)+e[r]*s;return a}}class m{constructor(t){this.audio=t;let e=(this.audio.audioContext?this.audio.audioContext.sampleRate:44100)/this.audio.fftSize,i=Math.clamp(Math.round(20/e)-1,0,this.audio.numSamps-1),s=Math.clamp(Math.round(320/e)-1,0,this.audio.numSamps-1),a=Math.clamp(Math.round(2800/e)-1,0,this.audio.numSamps-1),r=Math.clamp(Math.round(11025/e)-1,0,this.audio.numSamps-1);this.starts=[i,s,a],this.stops=[s,a,r],this.val=new Float32Array(3),this.imm=new Float32Array(3),this.att=new Float32Array(3),this.avg=new Float32Array(3),this.longAvg=new Float32Array(3),this.att.fill(1),this.avg.fill(1),this.longAvg.fill(1)}get bass(){return this.val[0]}get bass_att(){return this.att[0]}get mid(){return this.val[1]}get mid_att(){return this.att[1]}get treb(){return this.val[2]}get treb_att(){return this.att[2]}static isFiniteNumber(t){return Number.isFinite(t)&&!Number.isNaN(t)}updateAudioLevels(){if(this.audio.freqArray.length>0){this.imm.fill(0);for(let t=0;t<3;t++)for(let e=this.starts[t];e<this.stops[t];e++)this.imm[t]+=this.audio.freqArray[e];this.avg=o.average(this.avg,this.imm,{rateUp:.8,rateDown:.5}),this.longAvg=o.average(this.longAvg,this.imm,{rateUp:.992,rateDown:.992});for(let t=0;t<3;t++)this.longAvg[t]<.001?(this.val[t]=1,this.att[t]=1):(this.val[t]=this.imm[t]/this.longAvg[t],this.att[t]=this.avg[t]/this.longAvg[t])}}}class u{constructor(t,e,i=!1){this.equalizeArr=null,this.samplesIn=t,this.samplesOut=e,this.equalize=i,this.NFREQ=2*e,this.equalize&&this.initEqualizeTable(),this.bitrevtable=new Uint16Array(this.NFREQ),this.cossintable=[new Float32Array(0),new Float32Array(0)],this.initBitRevTable(),this.initCosSinTable()}initEqualizeTable(){this.equalizeArr=new Float32Array(this.samplesOut);let t=1/this.samplesOut;for(let e=0;e<this.samplesOut;e++)this.equalizeArr[e]=-.02*Math.log((this.samplesOut-e)*t)}initBitRevTable(){for(let t=0;t<this.NFREQ;t++)this.bitrevtable[t]=t;let t=0;for(let e=0;e<this.NFREQ;e++){if(t>e){let i=this.bitrevtable[e];this.bitrevtable[e]=this.bitrevtable[t],this.bitrevtable[t]=i}let i=this.NFREQ>>1;for(;i>=1&&t>=i;)t-=i,i>>=1;t+=i}}initCosSinTable(){let t=2,e=0;for(;t<=this.NFREQ;)e+=1,t<<=1;this.cossintable=[new Float32Array(e),new Float32Array(e)],t=2;let i=0;for(;t<=this.NFREQ;){let e=-2*Math.PI/t;this.cossintable[0][i]=Math.cos(e),this.cossintable[1][i]=Math.sin(e),i+=1,t<<=1}}timeToFrequencyDomain(t){let e=new Float32Array(this.NFREQ),i=new Float32Array(this.NFREQ);for(let s=0;s<this.NFREQ;s++){let a=this.bitrevtable[s];a<this.samplesIn?e[s]=t[a]:e[s]=0,i[s]=0}let s=2,a=0;for(;s<=this.NFREQ;){let t=this.cossintable[0][a],r=this.cossintable[1][a],n=1,h=0,l=s>>1;for(let a=0;a<l;a++){for(let t=a;t<this.NFREQ;t+=s){let s=t+l,a=n*e[s]-h*i[s],r=n*i[s]+h*e[s];e[s]=e[t]-a,i[s]=i[t]-r,e[t]+=a,i[t]+=r}let o=n;n=o*t-h*r,h=h*t+o*r}s<<=1,a+=1}let r=new Float32Array(this.samplesOut);if(this.equalize&&null!=this.equalizeArr)for(let t=0;t<this.samplesOut;t++)r[t]=this.equalizeArr[t]*Math.sqrt(e[t]*e[t]+i[t]*i[t]);else for(let t=0;t<this.samplesOut;t++)r[t]=Math.sqrt(e[t]*e[t]+i[t]*i[t]);return r}}class y{constructor(t){this.numSamps=512,this.fftSize=2*this.numSamps,this.fft=new u(this.fftSize,512,!0),this.audioContext=t,this.audible=t.createDelay(),this.analyser=t.createAnalyser(),this.analyser.smoothingTimeConstant=0,this.analyser.fftSize=this.fftSize,this.audible.connect(this.analyser),this.analyserL=t.createAnalyser(),this.analyserL.smoothingTimeConstant=0,this.analyserL.fftSize=this.fftSize,this.analyserR=t.createAnalyser(),this.analyserR.smoothingTimeConstant=0,this.analyserR.fftSize=this.fftSize,this.splitter=t.createChannelSplitter(2),this.audible.connect(this.splitter),this.splitter.connect(this.analyserL,0),this.splitter.connect(this.analyserR,1),this.timeByteArray=new Uint8Array(this.fftSize),this.timeByteArrayL=new Uint8Array(this.fftSize),this.timeByteArrayR=new Uint8Array(this.fftSize),this.timeArray=new Int8Array(this.fftSize),this.timeByteArraySignedL=new Int8Array(this.fftSize),this.timeByteArraySignedR=new Int8Array(this.fftSize),this.tempTimeArrayL=new Int8Array(this.fftSize),this.tempTimeArrayR=new Int8Array(this.fftSize),this.timeArrayL=new Int8Array(this.numSamps),this.timeArrayR=new Int8Array(this.numSamps),this.freqArray=new Float32Array(0),this.freqArrayL=new Float32Array(0),this.freqArrayR=new Float32Array(0)}sampleAudio(){this.analyser.getByteTimeDomainData(this.timeByteArray),this.analyserL.getByteTimeDomainData(this.timeByteArrayL),this.analyserR.getByteTimeDomainData(this.timeByteArrayR),this.processAudio()}updateAudio(t,e,i){this.timeByteArray.set(t),this.timeByteArrayL.set(e),this.timeByteArrayR.set(i),this.processAudio()}processAudio(){for(let t=0,e=0,i=0;t<this.fftSize;t++)this.timeArray[t]=this.timeByteArray[t]-128,this.timeByteArraySignedL[t]=this.timeByteArrayL[t]-128,this.timeByteArraySignedR[t]=this.timeByteArrayR[t]-128,this.tempTimeArrayL[t]=.5*(this.timeByteArraySignedL[t]+this.timeByteArraySignedL[i]),this.tempTimeArrayR[t]=.5*(this.timeByteArraySignedR[t]+this.timeByteArraySignedR[i]),t%2==0&&(this.timeArrayL[e]=this.tempTimeArrayL[t],this.timeArrayR[e]=this.tempTimeArrayR[t],e+=1),i=t;this.freqArray=this.fft.timeToFrequencyDomain(this.timeArray),this.freqArrayL=this.fft.timeToFrequencyDomain(this.timeByteArraySignedL),this.freqArrayR=this.fft.timeToFrequencyDomain(this.timeByteArraySignedR)}connectAudio(t){t.connect(this.audible)}disconnectAudio(t){t.disconnect(this.audible)}}const c={bars:(t,e,i)=>{let s=t.freqArrayL,a=e.width,r=e.height,n=s.length,h=0,o=[],m=0;for(let t=0;t<n;t++)if(0===t)o.push(1),h+=1;else{let e=Math.log10(t+1)-Math.log10(t);o.push(e),h+=e}for(let t=0;t<n;t++){let e=o[t]/h*a,n=s[t]*r/20;i.fillStyle=l.getTheme().primary,i.fillRect(m,r-n,e,n),m+=e}},line:(t,e,i)=>{let s=t.freqArray.map(t=>Math.log10(t+1)),a=e.width,r=e.height,n=s.length;i.clearRect(0,0,a,r);let h=0,o=[];for(let t=0;t<n;t++)if(0===t)o.push(1),h+=1;else{let e=Math.log10(t+1)-Math.log10(t);o.push(e),h+=e}let m=0;i.beginPath();for(let t=0;t<n;t++){let e=o[t]/h*a,n=m+e/2,l=r-s[t]*r/2;0===t?i.moveTo(n,l):i.lineTo(n,l),m+=e}i.strokeStyle=l.getTheme().primary,i.lineWidth=2,i.stroke()}};class d{constructor(t){this.audioNode=null,this.audio=new y(t),this.audioLevels=new m(this.audio),this.canvas=document.getElementById("volumeBarCanvas"),this.ctx=this.canvas.getContext("2d")}render(){this.audio.sampleAudio(),this.audioLevels.updateAudioLevels(),this.renderWebGL()}connectAudio(t){this.audioNode=t,this.audio.connectAudio(t)}disconnectAudio(t){this.audioNode=null,this.audio.disconnectAudio(t)}renderWebGL(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),(0,c[n.getOption("visualizer")])(this.audio,this.canvas,this.ctx)}}document.getElementById("audioFileInput").addEventListener("change",function(a){let r=a.target.files[0];if(r){let a=new FileReader;a.onload=function(a){var r;r=a.target.result,(e=(t=new(window.AudioContext||window.webkitAudioContext)).createAnalyser()).fftSize=4096,new Uint8Array(e.frequencyBinCount),e.minDecibels=-90,e.maxDecibels=0,e.smoothingTimeConstant=0,t.decodeAudioData(r,function(a){(i=t.createBufferSource()).buffer=a,i.connect(e),i.onended=()=>{},(s=new d(t)).connectAudio(e),e.connect(t.destination),i.start(),f()})},a.readAsArrayBuffer(r)}},!1);const f=()=>{requestAnimationFrame(()=>f()),s.render()};document.getElementById("colorThemeSelect").addEventListener("change",t=>{l.setTheme(t.target.value)}),document.getElementById("modeSelect").addEventListener("change",t=>{n.setOption("visualizer",t.target.value)});
//# sourceMappingURL=index.228f134f.js.map