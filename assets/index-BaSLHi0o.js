var e={awaiting:1,revision:2,resub:3,received:4,review:5,ready:6};function t(e,t){let n=t&&t.status||`awaiting`;return n===`revision`&&e.versions.length>(t&&t.ver||1)&&(n=`resub`),n}function n(e,t,n){return[...e].filter(e=>!e.deleted&&(!t||e.year===t)&&(!n||+e.sem==+n))}function r(r,i,a,o,s,c){let l=null,u=null,ee=(n,r)=>!n||e[t(r,c(r.id))]>e[t(n,c(n.id))];for(let e of n(s,a,o))e.subject===i&&(e.studentId==null?+r.section&&+e.grade==+r.grade&&+e.section==+r.section&&ee(u,e)&&(u=e):String(e.studentId)===String(r.id)&&ee(l,e)&&(l=e));return l||u}function i(e,n,i,a,o,s){let c=[...o],l={subs:a,required:a.length,uploaded:0,awaiting:0,received:0,review:0,revision:0,ready:0,remaining:0,pct:0,items:[]};for(let o of a){let a=r(e,o,n,i,c,s),u=a?t(a,s(a.id)):null;l.items.push({subject:o,exam:a,status:u}),a&&u&&(l.uploaded++,l[u===`resub`?`revision`:u]++)}return l.remaining=l.required-l.uploaded,l.pct=l.required?Math.round(l.ready/l.required*100):0,l}function a(e,t,n){return[...t].filter(t=>t.active!==!1&&(e.studentId==null?+t.grade==+e.grade&&!!+t.section&&+t.section==+e.section:String(e.studentId)===String(t.id))&&n(t.id,e.year,e.sem).includes(e.subject))}function o(){return typeof window<`u`&&`Notification`in window}async function s(){if(typeof navigator>`u`||!(`serviceWorker`in navigator))return null;try{return await navigator.serviceWorker.register(`/sw.js`)}catch{return null}}async function c(){return o()?(await s(),Notification.requestPermission()):`unsupported`}async function l(e,t,n){if(typeof navigator<`u`&&`vibrate`in navigator&&navigator.vibrate?.([200,100,200]),!o()||Notification.permission!==`granted`)return;let r={body:t,icon:`/icon.svg`,badge:`/icon.svg`,lang:`ar`,dir:`rtl`,tag:`daam-${Date.now()}`,data:{url:n},vibrate:[200,100,200]},i=await s();i?await i.showNotification(e,r):new Notification(e,r)}var u=!1;function ee(e){if(u)return;u=!0;let o=(document.getElementById(`logoimg`)||{}).src||`/logo.png`,s=!1,ee=!0,te=(e,t=document)=>t.querySelector(e),d={get(e,t){try{let n=localStorage.getItem(`daam.`+e);return n==null?t:JSON.parse(n)}catch{return t}},set(e,t){try{localStorage.setItem(`daam.`+e,JSON.stringify(t))}catch{}},del(e){try{localStorage.removeItem(`daam.`+e)}catch{}}},f=d.get(`lang`,`ar`),p=(e,t)=>f===`ar`?e:t,m=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),ne=()=>new Date().toISOString(),re=()=>f===`ar`?`ar-AE-u-nu-latn`:`en-GB`,h=e=>{if(!e)return`—`;let t=new Date(e.length===10?e+`T00:00:00`:e);return isNaN(t)?`—`:t.toLocaleDateString(re(),{day:`numeric`,month:`short`,year:`numeric`})},g=e=>{if(!e)return`—`;let t=new Date(e);return isNaN(t)?`—`:t.toLocaleString(re(),{day:`numeric`,month:`short`,year:`numeric`,hour:`numeric`,minute:`2-digit`})},ie=e=>e>1048576?(e/1048576).toFixed(1)+` MB`:Math.max(1,Math.round(e/1024))+` KB`,ae={ar:[`اللغة العربية`,`Arabic`],math:[`الرياضيات`,`Mathematics`],isl:[`التربية الإسلامية`,`Islamic Education`],soc:[`الدراسات الاجتماعية`,`Social Studies`],sci:[`العلوم`,`Science`],en:[`اللغة الإنجليزية`,`English`],bio:[`الأحياء`,`Biology`],chem:[`الكيمياء`,`Chemistry`],phys:[`الفيزياء`,`Physics`]},_=Object.keys(ae),oe=[`الأول`,`الثاني`,`الثالث`,`الرابع`,`الخامس`,`السادس`,`السابع`,`الثامن`,`التاسع`,`العاشر`,`الحادي عشر`,`الثاني عشر`],se=[`الأولى`,`الثانية`,`الثالثة`,`الرابعة`,`الخامسة`,`السادسة`,`السابعة`,`الثامنة`],ce=[`2024-2025`,`2025-2026`,`2026-2027`,`2027-2028`,`2028-2029`],v=e=>ae[e]?p(ae[e][0],ae[e][1]):e||`—`,le=e=>p(`الصف `+(oe[e-1]||e),`Grade `+e),y=(e,t)=>le(+e)+` / `+(+t?p(`شعبة `+t,`Section `+t):p(`الشعبة غير محددة`,`section not set`)),b=e=>p(`الفصل الدراسي `+oe[e-1],[`First`,`Second`,`Third`][e-1]+` Semester`),ue=e=>p(`الحصة `+se[e-1],`Period `+e),de={f1:[`الاختبار التكويني الأول`,`First Formative Assessment`],f2:[`الاختبار التكويني الثاني`,`Second Formative Assessment`],other:[`اختبار آخر`,`Other Exam`],final:[`اختبار نهاية الفصل`,`End-of-Semester Exam`]},x=e=>p(de[e][0],de[e][1]),S={awaiting:[`بانتظار الاستلام`,`Awaiting Receipt`,`amber`],received:[`تم الاستلام`,`Received`,`blue`],review:[`قيد المراجعة`,`Under Review`,`violet`],revision:[`طلب التعديل`,`Revision Required`,`red`],resub:[`أُعيد الرفع بعد التعديل`,`Re-uploaded after revision`,`orange`],ready:[`جاهز للتسليم للشؤون الأكاديمية`,`Ready for Academic Affairs Submission`,`green`]},fe={new:[`جديدة`,`New`,`amber`],received:[`تم الاستلام`,`Received`,`blue`],done:[`تم التنفيذ`,`Completed`,`green`]},C={exam:[`اختبار`,`Exam`,`blue`],behavioral:[`دعم سلوكي`,`Behavioural support`,`red`],academic:[`دعم أكاديمي`,`Academic support`,`green`],help:[`طلب مساعدة`,`Help request`,`amber`]},pe={new:[`جديد`,`New`,`amber`],received:[`تم الاستلام`,`Received`,`blue`],in_progress:[`جاري التدخل`,`In progress`,`violet`],completed:[`مكتمل`,`Completed`,`green`]},w=(e,t)=>e[t]?p(e[t][0],e[t][1]):t,T=(e,t)=>`<span class="bd c-${e[t]?e[t][2]:`gray`}">${m(w(e,t))}</span>`,me=[[`راضٍ جدًا`,`Very satisfied`],[`راضٍ`,`Satisfied`],[`محايد`,`Neutral`],[`غير راضٍ`,`Dissatisfied`],[`غير راضٍ إطلاقًا`,`Very dissatisfied`]],he=[[`ما مدى رضاك عن الخدمات التعليمية المقدمة لابنك؟`,`How satisfied are you with the educational services provided to your child?`],[`ما مدى رضاك عن مستوى التواصل بينك وبين معلم التربية الخاصة؟`,`How satisfied are you with communication between you and the special education teacher?`],[`هل تلاحظ تحسنًا في مستوى ابنك الأكاديمي؟`,`Do you notice improvement in your child’s academic level?`],[`ما مدى مناسبة الأنشطة والمواد التعليمية لاحتياجات ابنك؟`,`How well do the activities and learning materials suit your child’s needs?`],[`هل تحصل على الدعم والإرشادات اللازمة لمتابعة ابنك في المنزل؟`,`Do you receive the support and guidance you need to follow up with your child at home?`],[`ما مدى رضاك عن سرعة الاستجابة لاستفساراتك وطلباتك؟`,`How satisfied are you with how quickly your questions and requests are answered?`],[`ما مدى رضاك بشكل عام عن خدمات قسم التربية الخاصة؟`,`Overall, how satisfied are you with the Special Education Department’s services?`]],ge={home:`M3 11l9-8 9 8M5 10v10h14V10`,cal:`M4 6h16v14H4zM4 10h16M8 3v4M16 3v4`,up:`M12 16V4M7 9l5-5 5 5M4 20h16`,list:`M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01`,book:`M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3zM5 17a3 3 0 013-3h11`,bell:`M6 16v-5a6 6 0 1112 0v5l2 2H4zM10 20a2 2 0 004 0`,inbox:`M4 13l3-8h10l3 8v6H4zM4 13h5l1 2h4l1-2h5`,check:`M4 12l5 5L20 6`,users:`M9 11a4 4 0 100-8 4 4 0 000 8zM2 21a7 7 0 0114 0M17 11a3 3 0 100-6M22 20a5 5 0 00-4-5`,chart:`M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3`,arch:`M3 5h18v4H3zM5 9v10h14V9M10 13h4`,heart:`M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z`,form:`M9 4h6v3H9zM7 5H5v15h14V5h-2M9 12l2 2 4-4`,gear:`M12 9a3 3 0 100 6 3 3 0 000-6zM4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4`,award:`M12 14a5 5 0 100-10 5 5 0 000 10zM9 13l-1 8 4-2 4 2-1-8`,dl:`M12 4v12M7 11l5 5 5-5M4 20h16`,eye:`M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z`,trash:`M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13`,edit:`M4 20h4L19 9l-4-4L4 16zM13 7l4 4`,plus:`M12 5v14M5 12h14`,menu:`M4 6h16M4 12h16M4 18h16`,x:`M6 6l12 12M18 6L6 18`,out:`M10 4H5v16h5M15 8l4 4-4 4M9 12h10`,snd:`M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 010 6`,mute:`M4 10v4h4l5 4V6L8 10zM16 9l5 6M21 9l-5 6`,clock:`M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2`,file:`M6 3h8l4 4v14H6zM14 3v4h4`,copy:`M8 8h11v12H8zM5 16V4h11`,print:`M7 8V4h10v4M5 8h14v8h-2M7 14h10v6H7zM7 16H5V8`,hand:`M12 21a8 8 0 100-16M12 5v7M9 9l3 3 3-3`},E=e=>`<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="${ge[e]||ge.file}"/></svg>`,_e=Object.keys({templates:`adm/v1/templates`,students:`adm/v1/students`,teachers:`adm/v1/teachers`,reqs:`adm/v1/reqs`,xrev:`adm/v1/xrev`,sstat:`adm/v1/sstat`,rstat:`adm/v1/rstat`,mrev:`adm/v1/mrev`,acts:`adm/v1/acts`,surveys:`adm/v1/surveys`,arev:`adm/v1/arev`,sopen:`adm/v1/sopen`,settings:`adm/v1/settings`,schedules:`schedules`,exams:`exams`,memos:`memos`,requests:`requests`,psub:`psub`,pans:`pans`,notifs:`notifs`,alog:`adm/v1/alog`,mreq:`adm/v1/mreq`,xtaken:`xtaken`,prompt:`adm/v1/prompt`,chunks:`chunks`}).filter(e=>e!==`chunks`),D={};_e.forEach(e=>D[e]=new Map);let ve={},ye=null,be=null,xe=!0,Se=!1,Ce=!1,O=d.get(`session`,null),k={view:`home`,f:{},files:{},year:null,sem:null,tab:null,st:``,drop:!1,nav:!1},A=d.get(`prefs`,{sound:!0,voice:!0}),we=()=>(D.settings.get(`main`)||{}).year||`2026-2027`,Te=()=>+((D.settings.get(`main`)||{}).sem||1),j=()=>k.year||we(),M=()=>+(k.sem||Te()),N=()=>[...D.students.values()].filter(e=>e.active!==!1).sort((e,t)=>e.grade-t.grade||String(e.name).localeCompare(t.name,`ar`)),Ee=()=>[...D.teachers.values()].sort((e,t)=>String(e.name).localeCompare(t.name,`ar`)),De=e=>D.students.get(e),P=e=>(De(e)||{}).name||p(`طالب محذوف`,`Removed student`),F=e=>(e.studentId?P(e.studentId)+` — `:``)+y(e.grade,e.section),Oe=()=>O&&O.role===`p`?N().filter(e=>e.parentCode&&e.parentCode===O.code):[];class ke extends Error{}let Ae={forbidden:[`لا تملك صلاحية تنفيذ هذا الإجراء.`,`You do not have permission for this action.`],invalid:[`البيانات المدخلة غير مكتملة أو غير صحيحة.`,`The data entered is incomplete or not valid.`],bad_password:[`رمز الحماية غير صحيح.`,`The security code is not correct.`],bad_tcode:[`رمز دخول المعلمين غير صحيح. اطلبه من معلم التربية الخاصة.`,`The teacher sign-in code is not correct. Ask the special education teacher for it.`],too_many:[`محاولات دخول خاطئة كثيرة. انتظر 15 دقيقة ثم حاول مرة أخرى.`,`Too many wrong sign-in attempts. Wait 15 minutes and try again.`],bad_code:[`رمز الدخول غير صحيح. تواصل مع معلم التربية الخاصة.`,`The access code is not correct. Contact the special education teacher.`],name_required:[`اكتب اسمك ليظهر في سجل الإجراءات.`,`Type your name so it appears in the action log.`],exam_taken:[`رفع معلم آخر اختبار هذه المادة لهذا الطالب في هذا الفصل.`,`Another teacher already uploaded this subject’s exam for this student this semester.`],exam_dup:[`سبق أن رفعت اختبار هذه المادة لهذا الصف والشعبة في هذا الفصل. استخدم «إعادة رفع الاختبار» من سجل الاختبارات.`,`You already uploaded this subject’s exam for this class and semester. Use “Re-upload exam” in the exam log.`],exam_missing:[`هذا الاختبار غير موجود.`,`This exam no longer exists.`],not_revision:[`إعادة الرفع متاحة فقط بعد طلب التعديل.`,`Re-upload is only available after a revision request.`],comment_required:[`اكتب الملاحظات والتعديلات المطلوبة قبل الإرسال.`,`Write the required comments and changes before sending.`],file_type:[`نوع الملف غير مدعوم أو أن محتواه لا يطابق نوعه.`,`The file type is not supported, or its content does not match its type.`],file_large:[`حجم الملف أكبر من الحد المسموح (20 ميجابايت).`,`The file is larger than the 20 MB limit.`],file_empty:[`الملف فارغ.`,`The file is empty.`],file_missing:[`الملف غير متاح حاليًا.`,`The file is not available right now.`],file_incomplete:[`لم يكتمل رفع الملف. حاول مرة أخرى.`,`The upload did not finish. Try again.`],teacher_dup:[`هذا الاسم موجود في القائمة.`,`This name is already in the list.`],student_missing:[`الطالب غير موجود.`,`The student was not found.`],survey_done:[`سبق إرسال الاستبيان لهذا الفصل.`,`The survey was already sent for this semester.`],survey_closed:[`استبيان هذا الفصل غير متاح حاليًا.`,`This semester’s survey is not open.`],survey_incomplete:[`أجب عن جميع الأسئلة قبل الإرسال.`,`Answer every question before sending.`],already_approved:[`سبق اعتماد هذه المشاركة.`,`This submission was already approved.`],sped_not_configured:[`لم تُضبط كلمة مرور معلم التربية الخاصة على الخادم بعد (SPED_PASSWORD).`,`The special education password has not been set on the server yet (SPED_PASSWORD).`],photos_required:[`مطلوب صورتان لإرسال النشاط.`,`2 photos are required to send the activity.`],pdf_unavailable:[`تعذّر إنشاء ملف PDF على الخادم: لا يتوفر متصفح للطباعة.`,`The PDF could not be created on the server: no browser is available for printing.`],sped_pw_setup:[`اختر كلمة مرور من 6 أحرف على الأقل.`,`Choose a password of at least 6 characters.`],sped_pw_missing:[`لم تُحدَّد كلمة مرور معلمي التربية الخاصة بعد.`,`The special education password has not been set yet.`],quota_exceeded:[`امتلأت مساحة التخزين. احذف بعض البيانات أو الملفات القديمة.`,`Storage is full. Remove some old data or files.`],confirm_word:[`اكتب كلمة «حذف» أو DELETE للتأكيد.`,`Type DELETE (or «حذف») to confirm.`],read_only:[`صلاحيتك على هذه الصفحة للقراءة فقط. اطلب من مالك المنصة صلاحية «مساهم».`,`You have read-only access to this page. Ask the platform owner for Contributor access.`],unauthorized:[`انتهت الجلسة. سجّل الدخول من جديد.`,`Your session ended. Please sign in again.`]};function je(){O=null,d.del(`session`),rt=null,Ne=``,_e.forEach(e=>D[e]=new Map),Pt.length=0,It(),zt(`home`),Ie()}function I(e){let t=e&&e.code,n=e instanceof ke?e.message:t&&Ae[t]?p(Ae[t][0],Ae[t][1]):p(`تعذّر الحفظ. تحقق من الاتصال وحاول مرة أخرى.`,`Could not save. Check your connection and try again.`);Nt(m(n),`err`),!(e instanceof ke)&&!(t&&Ae[t])&&console.error(e),t===`unauthorized`&&O&&je()}let Me=(t,n)=>e(t,n),Ne=``;function Pe(e,t){let n=JSON.stringify(e.cols);if(n===Ne)return!1;Ne=n;for(let t of _e){let n=new Map;(e.cols[t]||[]).forEach(e=>n.set(e.id,e)),D[t]=n,ve[t]=!0}return O&&O.role===`p`&&!O.name&&Oe()[0]&&(O.name=p(`ولي أمر `,`Parent of `)+Oe()[0].name,d.set(`session`,O)),it(t),!0}async function Fe(e){if(O)try{let t=await Me(`sync`);Ce=!1,Pe(t,e)&&Rt()}catch(e){e&&e.code===`unauthorized`?je():ve.students||(Ce=!0,$())}}async function L(e,t){let n=await Me(e,t);return await Fe(),n}async function Ie(){try{let e=await Me(`publicInfo`);if(O)return;let t=new Map;e.teachers.forEach(e=>t.set(e.id,e)),D.teachers=t,ve.teachers=!0,D.settings=new Map([[`main`,{id:`main`,...e.settings}]]),$()}catch{}}function Le(){setInterval(()=>{O&&document.visibilityState!==`hidden`&&Fe()},e.pollMs||5e3),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Fe()}),window.addEventListener(`focus`,()=>Fe())}let Re={pdf:`application/pdf`,png:`image/png`,jpg:`image/jpeg`,jpeg:`image/jpeg`,webp:`image/webp`,docx:`application/vnd.openxmlformats-officedocument.wordprocessingml.document`,pptx:`application/vnd.openxmlformats-officedocument.presentationml.presentation`,xlsx:`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`},ze=e=>[`png`,`jpg`,`jpeg`,`webp`].includes(e.ext),Be=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]),r.onerror=n,r.readAsDataURL(e)});async function Ve(t,n,r){let i=(t.name.split(`.`).pop()||``).toLowerCase();if(!n.includes(i))throw new ke(p(`نوع الملف غير مدعوم. الأنواع المسموحة: `,`File type not supported. Allowed types: `)+n.join(`، `).toUpperCase());if(!t.size)throw new ke(p(`الملف فارغ.`,`The file is empty.`));if(t.size>20971520)throw new ke(p(`حجم الملف أكبر من الحد المسموح (20 ميجابايت).`,`The file is larger than the 20 MB limit.`));if(e.storeFile)return e.storeFile(t,r);let a=await Me(`fileBegin`,{name:t.name,size:t.size,kind:r});for(let e=0;e<a.parts;e++)await Me(`fileChunk`,{id:a.id,i:e,b64:await Be(t.slice(e*a.chunk,(e+1)*a.chunk))});return a.id}async function He(t){if(e.getBlob)return e.getBlob(t);let n=[];for(let e=0;e<t.n;e++){let r=await Me(`fileGet`,{id:t.ref,i:e}),i=atob(r.b64),a=new Uint8Array(i.length);for(let e=0;e<i.length;e++)a[e]=i.charCodeAt(e);n.push(a)}return new Blob(n,{type:Re[t.ext]||`application/octet-stream`})}async function Ue(e,t){if(ye)try{await ye.save({filename:e,data:t})}catch(e){(!e||e.code!==`declined`)&&Nt(p(`تعذّر تنزيل الملف في هذا العرض.`,`The file could not be downloaded in this view.`),`err`)}else try{let n=document.createElement(`a`);n.href=URL.createObjectURL(t instanceof Blob?t:new Blob([t])),n.download=e,document.body.appendChild(n),n.click(),n.remove()}catch{Nt(p(`تعذّر تنزيل الملف.`,`The file could not be downloaded.`),`err`)}}async function We(e){Nt(p(`جارٍ تجهيز الملف…`,`Preparing the file…`));try{await Ue(e.name,await He(e))}catch{Nt(p(`الملف غير متاح حاليًا.`,`The file is not available right now.`),`err`)}}async function Ge(e,t){let n=e=>{let n=document.getElementById(t);return n&&(n.innerHTML=e),n};n(`<p class="mut">${p(`جارٍ تحميل الملف…`,`Loading the file…`)}</p>`);try{if(ze(e)&&e.kind===`asset`){n(`<img alt="" src="/_blob/${m(e.ref)}">`);return}let r=await He(e);if(ze(e)){let t=n(`<img alt="">`);t&&(t.firstChild.src=`data:`+Re[e.ext]+`;base64,`+await Be(r));return}if(e.ext===`pdf`&&window.pdfjsLib){try{window.pdfjsLib.GlobalWorkerOptions.workerSrc=`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}catch{}let e=await window.pdfjsLib.getDocument({data:await r.arrayBuffer()}).promise,i=n(``);if(!i)return;let a=Math.min(e.numPages,40);for(let n=1;n<=a;n++){let r=await e.getPage(n),a=r.getViewport({scale:1.5}),o=document.createElement(`canvas`);if(o.width=a.width,o.height=a.height,!document.getElementById(t))return;i.appendChild(o),await r.render({canvasContext:o.getContext(`2d`),viewport:a}).promise}e.numPages>a&&i.insertAdjacentHTML(`beforeend`,`<p class="mut">${p(`عُرضت أول 40 صفحة. نزّل الملف لعرضه كاملًا.`,`First 40 pages shown. Download the file to see all of it.`)}</p>`);return}if(e.ext===`docx`&&window.mammoth){let e=await window.mammoth.extractRawText({arrayBuffer:await r.arrayBuffer()}),t=n(`<p class="mut sm">${p(`معاينة نصية لملف Word. نزّل الملف لمشاهدة التنسيق والصور.`,`Text preview of the Word file. Download it to see layout and images.`)}</p><pre></pre>`);t&&(t.querySelector(`pre`).textContent=e.value||``);return}n(`<p class="mut">${p(`المعاينة غير متاحة لهذا الملف هنا. استخدم زر التنزيل.`,`Preview is not available for this file here. Use the download button.`)}</p>`)}catch{n(`<p class="mut">${p(`تعذّر عرض الملف. جرّب تنزيله.`,`The file could not be displayed. Try downloading it.`)}</p>`)}}function Ke(e){return new Promise(t=>{let n=new Image,r=URL.createObjectURL(e);n.onload=()=>{let i=Math.min(1,1400/Math.max(n.width,n.height)),a=document.createElement(`canvas`);a.width=Math.round(n.width*i),a.height=Math.round(n.height*i),a.getContext(`2d`).drawImage(n,0,0,a.width,a.height),URL.revokeObjectURL(r),a.toBlob(n=>t(n?new File([n],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e),`image/jpeg`,.82)},n.onerror=()=>{URL.revokeObjectURL(r),t(e)},n.src=r})}let qe=null;function Je(){try{let e=window.AudioContext||window.webkitAudioContext;if(!e)return;qe||=new e,qe.state===`suspended`&&qe.resume()}catch{}}function Ye(e){if(!A.sound)return;Je();let t=qe;if(t)for(let n=0;n<e;n++)[880,1318.5].forEach((e,r)=>{let i=t.currentTime+n*.7+r*.18,a=t.createOscillator(),o=t.createGain();a.type=`sine`,a.frequency.value=e,o.gain.setValueAtTime(1e-4,i),o.gain.exponentialRampToValueAtTime(.35,i+.02),o.gain.exponentialRampToValueAtTime(1e-4,i+.45),a.connect(o).connect(t.destination),a.start(i),a.stop(i+.5)})}function Xe(e){A.voice&&e&&(be?be.speak(e,{language:f}).catch(()=>Ze(e)):Ze(e))}function Ze(e){try{if(!(`speechSynthesis`in window))return;let t=new SpeechSynthesisUtterance(e);t.lang=f===`ar`?`ar-SA`:`en-GB`,t.rate=.95,window.speechSynthesis.cancel(),window.speechSynthesis.speak(t)}catch{}}function Qe(e){let t=e.p||{},n=t.subject?v(t.subject):``,r=t.sem?b(t.sem):``,i=t.grade?y(t.grade,t.section):``,a=t.teacher||e.by||``,o=t.student?P(t.student):``;switch(e.type){case`sched_new`:return[p(`جدولة اختبار جديدة`,`New exam schedule`),p(`${a} جدول ${x(t.xt)} في ${n} — ${i} بتاريخ ${h(t.date)}`,`${a} scheduled ${x(t.xt)} in ${n} — ${i} on ${h(t.date)}`)];case`sched_edit`:return[p(`تعديل على جدولة اختبار`,`Exam schedule edited`),p(`عدّل ${a} جدولة ${x(t.xt)} في ${n} — ${i}، التاريخ ${h(t.date)}`,`${a} edited the schedule for ${x(t.xt)} in ${n} — ${i}, date ${h(t.date)}`)];case`sched_del`:return[p(`حذف جدولة اختبار`,`Exam schedule deleted`),p(`حذف ${a} جدولة ${x(t.xt)} في ${n} — ${i} بتاريخ ${h(t.date)}`,`${a} deleted the schedule for ${x(t.xt)} in ${n} — ${i} on ${h(t.date)}`)];case`sched_status`:return[p(`تحديث على جدولتك`,`Update on your schedule`),p(`${x(t.xt)} في ${n} — ${i}: ${w(fe,t.status)}`,`${x(t.xt)} in ${n} — ${i}: ${w(fe,t.status)}`)];case`exam_new`:return[p(`اختبار نهاية فصل جديد`,`New end-of-semester exam`),p(`رفع ${a} اختبار ${n} — ${r} — ${i}`,`${a} uploaded the ${n} exam — ${r} — ${i}`)];case`exam_reup`:return[p(`نسخة معدلة من اختبار`,`Revised exam uploaded`),p(`أعاد ${a} رفع اختبار ${n} — ${r} — ${i} بعد التعديل`,`${a} re-uploaded the ${n} exam — ${r} — ${i} after revision`)];case`exam_status`:return[p(`تحديث على اختبارك`,`Update on your exam`),p(`اختبار ${n} — ${r} — ${i}: ${w(S,t.status)}`,`${n} exam — ${r} — ${i}: ${w(S,t.status)}`)+(t.comment?p(` — الملاحظات: `,` — Comments: `)+t.comment:``)];case`exam_deleted`:return[p(`حُذف اختبارك`,`Your exam was removed`),p(`حذف معلم التربية الخاصة اختبار ${n} — ${r} — ${i}`,`The special education teacher removed the ${n} exam — ${r} — ${i}`)];case`memo_new`:return[p(`مذكرة مراجعة جديدة`,`New review notes`),p(`رفع ${a} مذكرة ${n} للطالب ${o}`,`${a} uploaded ${n} notes for ${o}`)];case`memo_ok`:return[p(`مذكرة مراجعة جديدة لابنك`,`New review notes for your child`),p(`أتيحت مذكرة ${n} للطالب ${o}`,`${n} notes are now available for ${o}`)];case`req_new`:return[p(`طلب دعم فوري`,`Instant support request`),p(`${w(C,t.rt)} للطالب ${o} من ${a}`,`${w(C,t.rt)} for ${o} from ${a}`)+(t.note?` — `+t.note:``)];case`req_status`:return[p(`تحديث على طلب الدعم`,`Update on your support request`),p(`${w(C,t.rt)} — ${o}: ${w(pe,t.status)}`,`${w(C,t.rt)} — ${o}: ${w(pe,t.status)}`)];case`act_new`:return[p(`نشاط أسري جديد`,`New family activity`),p(`أُضيف نشاط «${t.title}» — آخر موعد ${h(t.due)}`,`Activity “${t.title}” was added — due ${h(t.due)}`)];case`survey_open`:return[p(`استبيان الرضا متاح`,`Satisfaction survey is open`),p(`استبيان ${r} متاح الآن للإجابة`,`The ${r} survey is now open`)];case`remind`:return[p(`تذكير`,`Reminder`),p(`لديك أنشطة أو استبيان لم تُستكمل بعد. نشكر تعاونكم.`,`You have activities or a survey still to complete. Thank you for your cooperation.`)];case`act_sub`:return[p(`مشاركة نشاط جديدة`,`New activity submission`),p(`أرسل ولي أمر الطالب ${o} صور نشاط «${t.title}»`,`The parent of ${o} sent photos for “${t.title}”`)];case`survey_done`:return[p(`استبيان مكتمل`,`Survey completed`),p(`أكمل ولي أمر الطالب ${o} استبيان ${r}`,`The parent of ${o} completed the ${r} survey`)];case`act_rev`:return[t.status===`approved`?p(`تم اعتماد مشاركتك`,`Your submission was approved`):p(`مطلوب استكمال النشاط`,`Activity needs completing`),p(`نشاط «${t.title}»`,`Activity “${t.title}”`)+(t.note?` — `+t.note:``)]}return[e.type,``]}let $e=e=>!!O&&(O.role===`s`&&e.to===`sped`||O.role===`t`&&e.to===`t:`+O.name||O.role===`p`&&Oe().some(t=>e.to===`p:`+t.id)),et=()=>[...D.notifs.values()].filter($e).sort((e,t)=>e.at<t.at?1:-1),tt=()=>`read.`+(O?O.role+`.`+(O.name||O.code):``),nt=()=>{let e=d.get(tt(),``);return et().filter(t=>t.at>e).length},rt=null;function it(e){let t=et();if(e||!rt){rt=new Set(t.map(e=>e.id));return}let n=t.filter(e=>!rt.has(e.id));if(n.forEach(e=>rt.add(e.id)),!n.length)return;Ye(n.some(e=>[`exam_new`,`exam_reup`,`req_new`,`memo_new`].includes(e.type))?2:1),n.slice(0,3).forEach(e=>{let[t,n]=Qe(e);Nt(`<b>${m(t)}</b><br>${m(n)}`,``,()=>at(e.id),9e3)});let[r,i]=Qe(n[0]);Xe(r+`. `+i);try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch{}Promise.resolve().then(()=>l(r,i,`/`)).catch(()=>{})}function at(e){let t=D.notifs.get(e);k.drop=!1,t&&t.link?(zt(t.link.view),t.link.open&&z[t.link.open]&&z[t.link.open]({id:t.link.id})):$()}let ot=e=>D.xrev.get(e);function R(e){return t(e,ot(e.id))}let st=e=>e.versions[e.versions.length-1];function ct(e,t){return n(D.exams.values(),e,t)}let lt=(e,t,n)=>D.reqs.get(`${t}_${n}_${e}`),ut=(e,t,n)=>(lt(e,t,n)||{}).subjects||[];function dt(e,t,n,i){return r(e,t,n,i,D.exams.values(),ot)}function ft(e,t,n){return i(e,t,n,ut(e.id,t,n),D.exams.values(),ot)}let pt=e=>a(e,N(),ut),mt=(e,t,n,r)=>((lt(e.id,n,r)||{}).teachers||{})[t]||``,ht=e=>(D.sstat.get(e.id)||{}).status||`new`,gt=e=>(D.rstat.get(e.id)||{}).status||`new`,_t=(e,t,n)=>[...D.acts.values()].filter(r=>r.active!==!1&&r.year===t&&+r.sem==+n&&(r.targets===`all`||(r.targets||[]).includes(e))).sort((e,t)=>e.at<t.at?-1:1);function vt(e,t){let n=e.id+`_`+t,r=D.psub.get(n),i=D.arev.get(n);return r?i&&i.at>r.at?i.status:`sent`:`none`}let yt={none:[`لم يُرسل`,`Not sent`,`gray`],sent:[`تم الإرسال — بانتظار المراجعة`,`Sent — awaiting review`,`blue`],approved:[`معتمد`,`Approved`,`green`],more:[`مطلوب استكمال`,`Needs completing`,`red`]};function bt(e,t,n){let r=_t(e,t,n),i=r.filter(t=>vt(t,e)===`approved`).length;return{total:r.length,ok:i,sent:r.filter(t=>vt(t,e)!==`none`).length,pct:r.length?Math.round(i/r.length*100):0}}let xt=(e,t)=>D.surveys.get(`${e}_${t}`),St=(e,t)=>!e.targets||e.targets===`all`||e.targets.includes(String(t));function Ct(e,t,n){let r=xt(t,n);if(!r||!St(r,e))return`na`;let i=r.id+`_`+e,a=D.pans.get(i),o=D.sopen.get(i);return a&&!(o&&o.at>a.at)?`done`:!r.open||r.openDate&&r.openDate>ne().slice(0,10)?`closed`:`open`}let z={},B={t:{},s:{},p:{}},V=(e,t)=>k.f[e]==null?t??``:k.f[e],H=(e,t,n)=>`<option value="${m(e)}"${String(n)===String(e)?` selected`:``}>${m(t)}</option>`;function wt(e,t,n){n||={};let r=n.val==null?V(e):n.val;return`<select data-f="${e}"${n.re?` data-re="1"`:``}>${n.ph===!1?``:`<option value="">${m(n.ph||p(`اختر…`,`Choose…`))}</option>`}${t.map(([e,t])=>H(e,t,r)).join(``)}</select>`}let U=(e,t,n)=>`<label class="f ${n||``}"><span>${m(e)}</span>${t}</label>`,Tt=(e,t,n)=>`<input type="${t||`text`}" data-f="${e}" value="${m(V(e))}" placeholder="${m(n||``)}">`,Et=(e,t)=>`<textarea data-f="${e}" placeholder="${m(t||``)}">${m(V(e))}</textarea>`,W={subj:()=>_.map(e=>[e,v(e)]),grade:()=>oe.map((e,t)=>[t+1,le(t+1)]),sec:()=>[1,2,3,4].map(e=>[e,p(`شعبة `+e,`Section `+e)]),per:()=>se.map((e,t)=>[t+1,ue(t+1)]),sem:()=>[1,2,3].map(e=>[e,b(e)]),year:()=>ce.map(e=>[e,e]),xt:()=>[`f1`,`f2`,`other`].map(e=>[e,x(e)]),teach:()=>Ee().map(e=>[e.name,e.name+(e.subject?` — `+e.subject:``)]),stu:()=>N().map(e=>[e.id,e.name])},G=(e,t,n)=>t.length?`<div class="tw"><table><thead><tr>${e.map(e=>`<th>${m(e)}</th>`).join(``)}</tr></thead><tbody>${t.map(e=>`<tr>${e.map(e=>`<td>${e}</td>`).join(``)}</tr>`).join(``)}</tbody></table></div>`:`<div class="empty">${m(n||p(`لا توجد بيانات بعد.`,`Nothing here yet.`))}</div>`,K=(e,t,n)=>(n||={},`<button class="btn ${n.cls||``}" data-act="${e}"${Object.entries(n.d||{}).map(([e,t])=>` data-${e}="${m(t)}"`).join(``)}${n.dis?` disabled`:``}>${n.ic?E(n.ic):``}${m(t)}</button>`),Dt=(e,t,n)=>`<div class="filebox"><label class="btn">${E(`up`)}${p(`اختيار ملف`,`Choose file`)}<input type="file" data-file="${e}" accept="${t}" hidden></label><span class="sm ${k.files[e]?`b`:`mut`}">${k.files[e]?m(k.files[e].name)+` (`+ie(k.files[e].size)+`)`:m(n)}</span></div>`,Ot=e=>`<div class="row"><label class="row sm"><span class="mut">${p(`العام الدراسي`,`Academic year`)}</span><select data-v="year" style="width:auto">${ce.map(e=>H(e,e,j())).join(``)}</select></label>${e?`<label class="row sm"><span class="mut">${p(`الفصل`,`Semester`)}</span><select data-v="sem" style="width:auto">${[1,2,3].map(e=>H(e,b(e),M())).join(``)}</select></label>`:``}</div>`,kt=()=>`<div class="tabs">${[1,2,3].map(e=>`<button class="tab ${M()===e?`on`:``}" data-act="setv" data-k="sem" data-val="${e}">${p(`الفصل الدراسي ${oe[e-1]} | ${[`First`,`Second`,`Third`][e-1]} Semester`,`${[`First`,`Second`,`Third`][e-1]} Semester | الفصل الدراسي ${oe[e-1]}`)}</button>`).join(``)}</div>`,At=e=>`<div class="pipe">${e.map(([e,t,n,r])=>`<button class="pp ${r&&r.on?`on`:``}" style="--k:var(--${n||`line`})" data-act="${r&&r.act||`go`}"${Object.entries(r||{}).filter(([e])=>e!==`on`&&e!==`act`).map(([e,t])=>` data-${e}="${m(t)}"`).join(``)}><b>${e}</b><span>${m(t)}</span></button>`).join(``)}</div>`,jt=e=>String(e).split(` | `)[0],q=(e,t,n)=>`<div><h1>${m(jt(p(e,t)))}</h1>${n?`<p class="mut">${m(n)}</p>`:``}</div>`,Mt=(e,t)=>`<span class="row sm" style="gap:6px">${E(`file`)}<span class="b">${m(e.name)}</span><span class="mut">${ie(e.size)}</span>${t||``}</span>`;function Nt(e,t,n,r){let i=document.createElement(`div`);i.className=`toast `+(t||``),i.setAttribute(`role`,`status`),i.innerHTML=e,i.onclick=()=>{i.remove(),n&&n()},te(`#toasts`).appendChild(i),setTimeout(()=>i.remove(),r||(t===`err`?7e3:4500))}let J=(e,t)=>Nt(m(p(e,t)),`ok`),Y=(e,t)=>Nt(m(p(e,t)),`err`),Pt=[];function X(e,t){Pt.push({fn:e,wide:t}),It()}function Ft(){Pt.pop(),It()}function It(){let e=Pt[Pt.length-1],t=te(`#modal`);t.innerHTML=e?`<div class="ov" data-ov="1"><div class="md ${e.wide?`wide`:``}" role="dialog" aria-modal="true">${e.fn()}</div></div>`:``,e&&e.after&&e.after()}let Z=e=>`<div class="row sp"><h2>${m(e)}</h2><button class="btn g s" data-act="close" aria-label="${p(`إغلاق`,`Close`)}">${E(`x`)}</button></div>`;function Q(e,t,n){k.askYes=t,X(()=>`${Z(p(`تأكيد`,`Confirm`))}<p>${m(e)}</p><div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`askyes`,n||p(`تأكيد`,`Confirm`),{cls:`p`})}</div>`)}z.close=Ft,z.askyes=async()=>{let e=k.askYes;if(Ft(),e){try{await e()}catch(e){I(e)}$()}};let Lt=!1;function Rt(){let e=document.activeElement;e&&te(`#app`).contains(e)&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`)&&e.type!==`checkbox`&&e.type!==`file`?Lt=!0:$()}function zt(e,t){k.view=e,k.f={},k.files={},k.tab=null,k.st=``,k.edit=null,k.nav=!1,k.drop=!1,Object.assign(k,t||{}),$(),window.scrollTo(0,0)}function $(){Lt=!1,document.documentElement.lang=f,document.documentElement.dir=f===`ar`?`rtl`:`ltr`,document.title=p(`دعم — قسم التربية الخاصة`,`Daam — Special Education Department`),te(`#app`).innerHTML=O?Wt():Yt(),Bt()}function Bt(){document.querySelectorAll(`img[data-lazy]`).forEach(async e=>{let t=k.fileReg&&k.fileReg[e.dataset.lazy];if(e.removeAttribute(`data-lazy`),t)try{e.src=`data:`+Re[t.ext]+`;base64,`+await Be(await He(t))}catch{}})}let Vt=()=>`<div class="lang" role="group" aria-label="Language"><button class="${f===`ar`?`on`:``}" data-act="lang" data-l="ar">AR</button><button class="${f===`en`?`on`:``}" data-act="lang" data-l="en">EN</button></div>`;z.lang=e=>{f=e.l,d.set(`lang`,f),$(),It()};let Ht={t:[[`home`,`home`,`لوحة التحكم`,`Dashboard`],[`sched`,`cal`,`جدولة الاختبارات التكوينية`,`Formative Exam Scheduling`],[`upload`,`up`,`رفع اختبارات نهاية الفصول`,`Final Exam Upload`],[`log`,`list`,`سجل الاختبارات`,`Exam Log`],[`memos`,`book`,`مذكرات طلاب التربية الخاصة`,`Special Education Student Notes`],[`support`,`hand`,`طلبات الدعم الفوري`,`Instant Support Requests`]],s:[[`home`,`home`,`لوحة التحكم`,`Dashboard`],[`support`,`hand`,`طلبات الدعم الفوري`,`Instant Support Requests`],[`incoming`,`inbox`,`جدولة الاختبارات الواردة`,`Incoming Exam Schedules`],[`reqs`,`check`,`تحديد الاختبارات المطلوبة للطلاب`,`Student Exam Requirements`],[`review`,`eye`,`مراجعة اختبارات نهاية الفصول`,`Final Exam Review`],[`memos`,`book`,`مذكرات الطلاب`,`Student Notes`],[`reports`,`chart`,`تقارير متابعة الاختبارات`,`Exam Tracking Reports`],[`archive`,`arch`,`الأرشيف الإلكتروني`,`Electronic Archive`],[`acts`,`heart`,`أنشطة أولياء الأمور`,`Parent Activities`],[`surveys`,`form`,`استبيانات رضا أولياء الأمور`,`Parent Satisfaction Surveys`],[`students`,`users`,`الطلاب وأولياء الأمور`,`Students & Parents`],[`teachers`,`users`,`المعلمون`,`Teachers`],[`settings`,`gear`,`الإعدادات`,`Settings`]],p:[[`home`,`home`,`الرئيسية`,`Home`],[`acts`,`heart`,`أنشطة أسرتي`,`My Family Activities`],[`survey`,`form`,`استبيان رضا ولي الأمر`,`Parent Satisfaction Survey`],[`memos`,`book`,`مذكرات المراجعة`,`Review Notes`],[`cert`,`award`,`شهادة الشكر والتقدير`,`Certificate of Appreciation`]]};function Ut(e){return O.role===`s`?e===`support`?[...D.requests.values()].filter(e=>gt(e)===`new`).length:e===`incoming`?[...D.schedules.values()].filter(e=>ht(e)===`new`).length:e===`review`?ct().filter(e=>[`awaiting`,`resub`].includes(R(e))).length:e===`acts`?[...D.psub.values()].filter(e=>{let t=D.acts.get(e.actId);return t&&vt(t,e.studentId)===`sent`}).length:0:0}function Wt(){let e=O.role,t=B[e][k.view]||B[e].home,n=nt(),r=e===`t`?p(`معلم التعليم العام`,`General education teacher`):e===`s`?p(`معلم التربية الخاصة`,`Special education teacher`):p(`ولي الأمر`,`Parent`),i;if(!ve.students||!ve.settings)i=`<div class="empty">${Ce?p(`تعذّر الوصول إلى البيانات حتى الآن. سيُعاد المحاولة تلقائيًا.`,`The data cannot be reached yet. Retrying automatically.`):p(`جارٍ تحميل البيانات…`,`Loading data…`)}</div>`;else try{i=t()}catch(e){console.error(e),i=`<div class="empty">${p(`حدث خطأ في عرض هذه الصفحة.`,`This page could not be displayed.`)}</div>`}return`<div class="shell">
  <aside class="side ${k.nav?`open`:``}"><div class="brandx"><div class="bx-mark" aria-hidden="true">دعم</div><div><div class="bx-t">${p(`مجمع زايد التعليمي`,`Zayed Education Complex`)}</div><div class="bx-t2">${p(`سهيلة`,`Suhaila`)}</div><div class="bx-s">${p(`قسم التربية الخاصة`,`Special Education Department`)}</div></div></div>
  <div class="dept">${p(`منصة دعم`,`Daam Platform`)}<small>${m(r)}</small></div>
  ${Ht[e].map(([e,t,n,r])=>{let i=Ut(e);return`<button class="nv ${k.view===e?`on`:``}" data-act="go" data-view="${e}">${E(t)}<span>${m(p(n,r))}</span>${i?`<em>${i}</em>`:``}</button>`}).join(``)}
  <div style="margin-top:auto;padding-top:14px">${K(`logout`,p(`تسجيل الخروج`,`Sign out`),{cls:`g`,ic:`out`})}</div></aside>
  ${k.nav?`<div class="scrim" data-act="nav"></div>`:``}
  <div><header class="top"><button class="btn g s burger" data-act="nav" aria-label="${p(`القائمة`,`Menu`)}">${E(`menu`)}</button>
  <div class="grow"><div class="b" style="line-height:1.3">${m(O.name)}</div><div class="xs mut">${m(r)}${Se?` — `+p(`وضع محلي: البيانات لا تُحفظ`,`local mode: data is not saved`):``}</div></div>
  ${Vt()}<button class="btn g s" data-act="sound" title="${p(`الصوت والنطق`,`Sound and voice`)}" aria-label="${p(`الصوت والنطق`,`Sound and voice`)}">${E(A.sound?`snd`:`mute`)}</button>
  <button class="btn g s bell" data-act="drop" aria-label="${p(`الإشعارات`,`Notifications`)}">${E(`bell`)}${n?`<em>${n}</em>`:``}</button>
  ${k.drop?`<div class="drop">${Gt(30)||`<p class="mut" style="padding:16px">${p(`لا توجد إشعارات.`,`No notifications.`)}</p>`}</div>`:``}</header>
  <main class="main">${i}</main></div></div>`}function Gt(e){let t=k.readAt||d.get(tt(),``);return et().slice(0,e).map(e=>{let[n,r]=Qe(e);return`<button class="ni ${e.at>t?`un`:``}" data-act="notif" data-id="${e.id}"><span class="b sm">${m(n)}</span><br><span class="sm">${m(r)}</span><br><span class="xs mut">${g(e.at)}</span></button>`}).join(``)}z.go=e=>zt(e.view,e.st?{st:e.st}:null),z.nav=()=>{k.nav=!k.nav,$()},z.drop=()=>{k.drop=!k.drop,k.drop&&(k.readAt=d.get(tt(),``),d.set(tt(),ne())),$()},z.notif=e=>at(e.id),z.sound=()=>{Je(),A.sound||Promise.resolve().then(()=>c()).catch(()=>{}),A.sound=!A.sound,A.voice=A.sound,d.set(`prefs`,A),A.sound?(Ye(1),J(`تم تشغيل التنبيه الصوتي والنطق.`,`Sound and voice alerts are on.`)):J(`تم إيقاف الصوت والنطق.`,`Sound and voice alerts are off.`),$()},z.setv=e=>{k[e.k]=e.val,k.edit=null,$()},z.logout=async()=>{try{await Me(`logout`)}catch{}je()},z.dl=()=>{k.pv&&We(k.pv)},z.viewfile=e=>{let t=k.fileReg&&k.fileReg[e.k];t&&Jt(t)};function Kt(e){k.fileReg=k.fileReg||{};let t=e.ref;return k.fileReg[t]=e,t}let qt=e=>{let t=Kt(e);return`${K(`viewfile`,p(`معاينة`,`Preview`),{cls:`s`,ic:`eye`,d:{k:t}})}${K(`dlfile`,p(`تنزيل`,`Download`),{cls:`s`,ic:`dl`,d:{k:t}})}`};z.dlfile=e=>{let t=k.fileReg&&k.fileReg[e.k];t&&We(t)};function Jt(e){k.pv=e,X(()=>`${Z(e.name)}<div class="pv" id="pv"></div><div class="row" style="justify-content:flex-end">${K(`dl`,p(`تنزيل الملف`,`Download file`),{ic:`dl`})}</div>`,!0),Ge(e,`pv`)}function Yt(){let e=V(`tname`)===`__other`;return`<div class="login"><div class="row sp"><span></span>${Vt()}</div>
  <div class="lhead"><img src="${o}" alt="${p(`مجمع زايد التعليمي – سهيلة`,`Zayed Education Complex – Suhaila`)}"></div>
  <div style="text-align:center"><div class="bigname">${p(`دعم`,`Daam`)}</div><h2>${p(`قسم التربية الخاصة`,`Special Education Department`)}</h2>
  <p class="mut">${p(`منصة موحدة تربط معلمي التعليم العام ومعلم التربية الخاصة وأولياء الأمور.`,`One platform connecting general education teachers, the special education teacher and parents.`)}</p></div>
  ${Se?`<div class="note">${p(`قاعدة البيانات المشتركة غير متاحة في هذا العرض؛ تعمل المنصة مؤقتًا بدون حفظ.`,`The shared database is not available in this view; the platform is running without saving.`)}</div>`:``}
  <div class="roles">
  <div class="card role col" style="--k:var(--blue)"><h2>${p(`معلم التعليم العام`,`General education teacher`)}</h2><p class="mut sm">${p(`جدولة الاختبارات، رفع اختبارات نهاية الفصل والمذكرات، ومتابعة حالتها.`,`Schedule exams, upload final exams and notes, and follow their status.`)}</p>
  ${U(p(`اسم المعلم`,`Teacher name`),`<select data-f="tname" data-re="1"><option value="">${ve.teachers?p(`اختر اسمك…`,`Choose your name…`):p(`جارٍ التحميل…`,`Loading…`)}</option>${Ee().map(e=>H(e.name,e.name+(e.subject?` — `+e.subject:``),V(`tname`))).join(``)}${H(`__other`,p(`اسمي غير موجود في القائمة`,`My name is not in the list`),V(`tname`))}</select>`)}
  ${e?U(p(`اكتب اسمك الثلاثي`,`Type your full name`),Tt(`tname2`)):``}${U(p(`رمز دخول المعلمين`,`Teacher sign-in code`),`<input type="password" inputmode="numeric" class="ltr" data-f="tcode" autocomplete="off" value="${m(V(`tcode`))}">`)}${K(`loginT`,p(`دخول المعلم`,`Enter as teacher`),{cls:`p`})}</div>
  <div class="card role col" style="--k:var(--pri)"><h2>${p(`معلم التربية الخاصة`,`Special education teacher`)}</h2><p class="mut sm">${p(`إدارة الطلاب ومتطلباتهم، مراجعة الاختبارات، التقارير، وأنشطة أولياء الأمور.`,`Manage students and requirements, review exams, reports and parent activities.`)}</p>
  ${xe?U(p(`اسمك كما يظهر في السجلات`,`Your name as shown in records`),`<input type="text" data-f="sname" value="${m(V(`sname`,d.get(`sname`,``)))}">`)+U(p(`رمز الحماية`,`Security code`),`<input type="password" class="ltr" data-f="spw" autocomplete="off" value="${m(V(`spw`))}">`)+(s&&!ee?`<p class="xs mut">${p(`لم تُحدَّد كلمة مرور بعد: أول كلمة مرور تُدخلها (6 أحرف على الأقل) تصبح كلمة مرور معلمي التربية الخاصة، ويمكن تغييرها من الإعدادات.`,`No password has been set yet: the first password you enter (at least 6 characters) becomes the special education password. You can change it in Settings.`)}</p>`:``)+K(`loginS`,p(`دخول معلم التربية الخاصة`,`Enter as special education teacher`),{cls:`p`}):`<div class="note">${p(`هذه الواجهة متاحة لمالك المنصة ومن يمنحه صلاحية «محرر» فقط.`,`This interface is open only to the platform owner and people given the Editor role.`)}</div>`}</div>
  <div class="card role col" style="--k:var(--gold)"><h2>${p(`ولي الأمر`,`Parent`)}</h2><p class="mut sm">${p(`أنشطة الأسرة، استبيان الرضا، ومذكرات المراجعة الخاصة بأبنائك.`,`Family activities, the satisfaction survey and your children’s review notes.`)}</p>
  ${U(p(`رمز الدخول الذي استلمته من معلم التربية الخاصة`,`Access code you received from the special education teacher`),`<input type="text" inputmode="numeric" class="ltr" data-f="pcode" value="${m(V(`pcode`))}">`)}${K(`loginP`,p(`دخول ولي الأمر`,`Enter as parent`),{cls:`p`})}</div>
  </div></div>`}async function Xt(e){try{let t=await Me(`login`,e);O={role:t.session.role,name:t.session.name,code:t.session.code},d.set(`session`,O),rt=null,Ne=``,Je(),O.role===`s`&&(ee=!0),await Fe(!0),zt(`home`)}catch(e){I(e)}}z.loginT=()=>{let e=V(`tname`);if(e===`__other`&&(e=String(V(`tname2`)).trim().replace(/\s+/g,` `)),!e||e.length<3)return Y(`اختر اسمك من القائمة أو اكتبه.`,`Choose your name from the list or type it.`);let t=String(V(`tcode`)||``).trim();return t?Xt({role:`t`,name:e,password:t}):Y(`اكتب رمز دخول المعلمين.`,`Type the teacher sign-in code.`)},z.loginS=()=>{let e=String(V(`sname`)||d.get(`sname`,``)).trim();return e.length<3?Y(`اكتب اسمك ليظهر في سجل الإجراءات.`,`Type your name so it appears in the action log.`):(d.set(`sname`,e),Xt({role:`s`,name:e,password:String(V(`spw`))}))},z.loginP=()=>{let e=String(V(`pcode`)).trim();return e?Xt({role:`p`,code:e}):Y(`رمز الدخول غير صحيح. تواصل مع معلم التربية الخاصة.`,`The access code is not correct. Contact the special education teacher.`)};let Zt=e=>[...D.schedules.values()].filter(t=>t.teacher===O.name&&(!e||t.year===e)),Qt=e=>ct(e).filter(e=>e.teacher===O.name);B.t.home=()=>{let e=j(),t=Qt(e),n=e=>t.filter(t=>e===`revision`?[`revision`,`resub`].includes(R(t)):R(t)===e).length,r=Gt(6);return`${q(`لوحة التحكم`,`Dashboard`,p(`مرحبًا، `,`Welcome, `)+O.name)}${Ot()}
  ${en()}
  ${At([[Zt(e).length,p(`اختبارات جدولتها`,`Exams scheduled`),`gold`,{view:`sched`}],[t.length,p(`اختبارات رفعتها`,`Exams uploaded`),`pri`,{view:`log`,st:`all`}],[n(`received`),p(`تم استلامها`,`Received`),`blue`,{view:`log`,st:`received`}],[n(`review`),p(`قيد المراجعة`,`Under review`),`violet`,{view:`log`,st:`review`}],[n(`revision`),p(`تحتاج إلى تعديل`,`Need revision`),`red`,{view:`log`,st:`revision`}],[n(`ready`),p(`جاهزة للتسليم للشؤون الأكاديمية`,`Ready for Academic Affairs`),`green`,{view:`log`,st:`ready`}]])}
  <div class="row">${K(`go`,p(`جدولة اختبار تكويني`,`Schedule a formative exam`),{cls:`p`,ic:`cal`,d:{view:`sched`}})}${K(`go`,p(`رفع اختبار نهاية الفصل`,`Upload a final exam`),{ic:`up`,d:{view:`upload`}})}${K(`go`,p(`رفع مذكرة لطالب`,`Upload notes for a student`),{ic:`book`,d:{view:`memos`}})}</div>
  <div class="card"><h2>${p(`آخر الإشعارات والتحديثات`,`Latest notifications and updates`)}</h2>${r?`<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden">${r}</div>`:`<p class="mut">${p(`ستظهر هنا تحديثات معلم التربية الخاصة على اختباراتك وجدولاتك.`,`Updates from the special education teacher on your exams and schedules will appear here.`)}</p>`}</div>`};function $t(){let e=we(),t=Te(),n=[],r=new Date().toISOString().slice(0,10),i=new Date(Date.now()+6048e5).toISOString().slice(0,10);return Qt(e).filter(e=>R(e)===`revision`).forEach(e=>n.push({k:`orange`,ic:`edit`,t:p(`عدّل الاختبار وأعد رفعه: `,`Revise and re-upload the exam: `)+v(e.subject)+` — `+F(e),b:K(`reup`,p(`إعادة الرفع`,`Re-upload`),{cls:`s p`,ic:`up`,d:{id:e.id}})})),N().filter(e=>e.active!==!1).forEach(r=>ut(r.id,e,t).forEach(i=>{mt(r,i,e,t)!==O.name||dt(r,i,e,t)||n.push({k:`gold`,ic:`up`,t:p(`ارفع اختبار نهاية الفصل: `,`Upload the final exam: `)+v(i)+` — `+r.name+` (`+b(t)+`)`,b:K(`todoUp`,p(`رفع`,`Upload`),{cls:`s p`,ic:`up`,d:{sid:r.id,sj:i,sem:t}})})})),Zt(e).filter(e=>e.date>=r&&e.date<=i).sort((e,t)=>e.date<t.date?-1:1).forEach(e=>n.push({k:`blue`,ic:`cal`,t:p(`اختبار تكويني قادم: `,`Upcoming formative exam: `)+v(e.subject)+` — `+y(e.grade,e.section)+` — `+h(e.date)+` — `+w(fe,ht(e)),b:K(`go`,p(`فتح`,`Open`),{cls:`s`,d:{view:`sched`}})})),n}function en(){let e=$t();return`<div class="card"><h2>${p(`مطلوب منك الآن`,`Required from you now`)}${e.length?` <span class="bd c-amber">${e.length}</span>`:``}</h2>${e.length?`<div class="col" style="gap:8px">${e.map(e=>`<div class="row sp" style="border:1px solid var(--line);border-inline-start:4px solid var(--${e.k});border-radius:10px;padding:8px 12px"><span class="row" style="gap:8px">${E(e.ic)}<span>${m(e.t)}</span></span>${e.b}</div>`).join(``)}</div>`:`<p class="mut">${p(`لا يوجد ما يتطلب إجراءً منك الآن. ستظهر هنا الاختبارات المطلوبة منك وطلبات التعديل والاختبارات التكوينية القريبة.`,`Nothing needs your action right now. Exams assigned to you, revision requests and upcoming formative exams will appear here.`)}</p>`}</div>`}z.todoUp=e=>{zt(`upload`,{sem:+e.sem}),z.xUpOpen({sid:e.sid,sj:e.sj})},B.t.sched=()=>{let e=j(),t=M(),n=k.edit,r=Zt(e).filter(e=>+e.sem===t).sort((e,t)=>e.date<t.date?1:-1).map(e=>{let t=ht(e);return[m(x(e.type)),m(v(e.subject)),m(y(e.grade,e.section)),h(e.date),m(ue(e.period)),T(fe,t),m(e.notes||`—`),`<span class="xs mut">${g(e.at)}</span>`,`<div class="row">${K(`schedEdit`,p(`تعديل`,`Edit`),{cls:`s`,ic:`edit`,d:{id:e.id}})}${K(`schedDel`,p(`حذف`,`Delete`),{cls:`s d`,ic:`trash`,d:{id:e.id}})}</div>`]});return`${q(`جدولة الاختبارات التكوينية | Formative Exam Scheduling`,`Formative Exam Scheduling | جدولة الاختبارات التكوينية`)}${Ot()}${kt()}
  <div class="card col"><h2>${n?p(`تعديل الجدولة`,`Edit schedule`):p(`جدولة جديدة`,`New schedule`)} — ${m(b(t))}</h2><div class="fg">
  ${U(p(`نوع الاختبار`,`Exam type`),wt(`type`,W.xt()))}${U(p(`تاريخ الاختبار`,`Exam date`),Tt(`date`,`date`))}${U(p(`المادة`,`Subject`),wt(`subject`,W.subj()))}
  ${U(p(`الصف`,`Grade`),wt(`grade`,W.grade()))}${U(p(`الشعبة`,`Section`),wt(`section`,W.sec()))}${U(p(`الحصة`,`Period`),wt(`period`,W.per()))}
  ${U(p(`ملاحظات (اختياري)`,`Notes (optional)`),Et(`notes`),`w`)}</div>
  <div class="row">${K(`schedSave`,n?p(`حفظ التعديل`,`Save changes`):p(`إرسال الجدولة | Submit Schedule`,`Submit Schedule | إرسال الجدولة`),{cls:`p`,ic:`check`})}${n?K(`schedCancel`,p(`إلغاء`,`Cancel`)):``}</div></div>
  <h2>${p(`جدولاتي في هذا الفصل`,`My schedules this semester`)}</h2>
  ${G([p(`نوع الاختبار`,`Exam type`),p(`المادة`,`Subject`),p(`الصف والشعبة`,`Class`),p(`التاريخ`,`Date`),p(`الحصة`,`Period`),p(`الحالة`,`Status`),p(`ملاحظات`,`Notes`),p(`أُرسلت`,`Sent`),p(`الإجراءات`,`Actions`)],r,p(`لم ترسل أي جدولة في هذا الفصل بعد.`,`You have not submitted any schedule this semester yet.`))}`},z.schedEdit=e=>{let t=D.schedules.get(e.id);t&&(k.edit=e.id,k.sem=t.sem,k.f={type:t.type,date:t.date,subject:t.subject,grade:t.grade,section:t.section,period:t.period,notes:t.notes},$(),window.scrollTo(0,0))},z.schedCancel=()=>{k.edit=null,k.f={},$()},z.schedDel=e=>Q(p(`حذف هذه الجدولة نهائيًا؟ سيصل إشعار لمعلم التربية الخاصة.`,`Delete this schedule permanently? The special education teacher will be notified.`),async()=>{await L(`schedDel`,{id:e.id}),k.edit===e.id&&(k.edit=null,k.f={}),J(`حُذفت الجدولة وأُشعر معلم التربية الخاصة.`,`Schedule deleted and the special education teacher was notified.`)},p(`حذف`,`Delete`)),z.schedSave=async()=>{let e=k.f,t=j(),n=M();if(!e.type||!e.date||!e.subject||!e.grade||!e.section||!e.period)return Y(`أكمل جميع الحقول: النوع، التاريخ، المادة، الصف، الشعبة، الحصة.`,`Complete all fields: type, date, subject, grade, section and period.`);let r={year:t,sem:n,type:e.type,date:e.date,subject:e.subject,grade:+e.grade,section:+e.section,period:+e.period,notes:String(e.notes||``).trim()},i=Zt(t).find(e=>e.id!==k.edit&&+e.sem===n&&e.type===r.type&&e.subject===r.subject&&+e.grade===r.grade&&+e.section===r.section),a=async()=>{let e=k.edit;await L(`schedSave`,e?{...r,id:e}:r),e?J(`تم حفظ تعديل الجدولة وإشعار معلم التربية الخاصة.`,`Schedule changes saved and the special education teacher was notified.`):J(`أُرسلت الجدولة إلى معلم التربية الخاصة. الحالة: جديدة.`,`Schedule sent to the special education teacher. Status: New.`),k.edit=null,k.f={},$()};if(i)return Q(p(`سبق أن أرسلت جدولة لنفس الاختبار والمادة والصف والشعبة في هذا الفصل. هل تريد إرسال جدولة أخرى؟`,`You already submitted a schedule for the same exam, subject, grade and section this semester. Submit another one?`),a,p(`إرسال على أي حال`,`Submit anyway`));try{await a()}catch(e){I(e)}};let tn=[`pdf`,`docx`],nn=[`pdf`,`docx`,`png`,`jpg`,`jpeg`];function rn(e,t,n,r){let i=Qt(n).find(n=>+n.sem===r&&n.subject===t&&String(n.studentId)===String(e.id));if(i)return{kind:`mine`,x:i,st:R(i)};let a=[...D.xtaken.values()].find(i=>i.year===n&&+i.sem===r&&i.subject===t&&String(i.studentId)===String(e.id));if(a)return{kind:`other`,x:a,st:a.status};let o=Qt(n).find(n=>+n.sem===r&&n.subject===t&&n.studentId==null&&+n.grade==+e.grade&&+n.section==+e.section)||[...D.xtaken.values()].find(i=>i.year===n&&+i.sem===r&&i.subject===t&&i.studentId==null&&+i.grade==+e.grade&&+i.section==+e.section);return o?{kind:o.status?`other`:`mine`,x:o,st:o.status||R(o),section:!0}:{kind:`none`}}B.t.upload=()=>{let e=j(),t=M(),n=V(`fsj`),r=V(`fgr`),i=N().filter(e=>e.active!==!1&&(!r||+e.grade==+r)).sort((e,t)=>e.grade-t.grade||e.section-t.section||e.name.localeCompare(t.name,`ar`)).map(r=>{let i=ut(r.id,e,t).filter(e=>!n||e===n);if(n&&!i.length)return``;let a=i.map(n=>{let i=rn(r,n,e,t),a=i.kind===`other`?i.x.teacher:``,o=i.kind===`none`?`no`:i.st===`ready`?`ap`:`ok`,s=i.kind===`none`?p(`لم يُرفع — اضغط للرفع`,`Not uploaded — tap to upload`):(i.kind===`mine`?p(`رفعته أنت`,`Uploaded by you`):p(`رفعه: `,`Uploaded by: `)+a)+(i.section?p(` (ملف الشعبة)`,` (section file)`):``)+` — `+w(S,i.st),c=i.kind===`none`?`xUpOpen`:i.kind===`mine`?`go`:``;return`<button class="tile ${o}"${c?` data-act="${c}"`:` disabled style="cursor:default"`} data-sid="${r.id}" data-sj="${n}" data-view="log">${E(i.kind===`none`?`up`:`check`)}<span>${m(v(n))}</span><span class="xs">${m(s)}</span></button>`}).join(``);return`<div class="card"><h3>${m(r.name)}</h3><p class="sm mut">${m(y(r.grade,r.section))}</p><div class="tiles">${a||`<span class="sm mut" style="grid-column:1/-1">${p(`لم يحدد معلم التربية الخاصة الاختبارات المطلوبة لهذا الطالب في هذا الفصل بعد.`,`The special education teacher has not set the required exams for this student this semester yet.`)}</span>`}</div></div>`}).join(``);return`${q(`رفع اختبارات نهاية الفصول | Final Exam Upload`,`Final Exam Upload | رفع اختبارات نهاية الفصول`,p(`اختبار مستقل لكل طالب: اضغط على المادة تحت اسم الطالب الذي تدرّسه لرفع الاختبار المُعدّ له. ما رفعه معلم آخر يظهر باسمه.`,`One exam per student: tap the subject under the name of a student you teach to upload the exam prepared for them. Exams another teacher uploaded show their name.`))}${Ot()}${kt()}
  <div class="card"><div class="fg">${U(p(`المادة`,`Subject`),wt(`fsj`,W.subj(),{re:!0,ph:p(`كل المواد`,`All subjects`)}))}${U(p(`الصف`,`Grade`),wt(`fgr`,W.grade(),{re:!0,ph:p(`كل الصفوف`,`All grades`)}))}</div></div>
  ${i.trim()?`<div class="sgrid">${i}</div>`:`<div class="empty">${p(`لا يوجد طلاب مطابقون لهذه التصفية.`,`No students match this filter.`)}</div>`}`},z.xUpOpen=e=>{k.xup={sid:e.sid,sj:e.sj,sem:M(),year:j()},k.files.exam=null,k.f.xnotes=``,X(()=>{let e=k.xup;return`${Z(p(`رفع اختبار نهاية الفصل — `,`Upload final exam — `)+v(e.sj)+` — `+P(e.sid))}<p class="sm mut">${m(b(e.sem)+` — `+e.year)}</p>
  <div class="f w"><span>${p(`ملف الاختبار`,`Exam file`)}</span>${Dt(`exam`,`.pdf,.docx`,p(`PDF أو Word (docx) حتى 20 ميجابايت`,`PDF or Word (docx) up to 20 MB`))}</div>
  ${U(p(`ملاحظات (اختياري)`,`Notes (optional)`),Et(`xnotes`),`w`)}
  <div class="row" style="justify-content:flex-end">${K(`examUp`,k.busy?p(`جارٍ الرفع…`,`Uploading…`):p(`رفع الاختبار`,`Upload exam`),{cls:`p`,ic:`up`,dis:k.busy})}</div>`})},z.examUp=async()=>{let e=k.xup,t=k.files.exam;if(e){if(!t)return Y(`اختر ملف الاختبار.`,`Choose the exam file.`);k.busy=!0,It();try{let n=await Ve(t,tn,`exam`);await L(`examUp`,{year:e.year,sem:+e.sem,subject:e.sj,sid:+e.sid,notes:String(k.f.xnotes||``).trim(),fileId:n}),k.busy=!1,k.xup=null,Ft(),J(`تم رفع الاختبار بنجاح. الحالة: بانتظار الاستلام.`,`Exam uploaded successfully. Status: Awaiting Receipt.`),$()}catch(e){k.busy=!1,It(),I(e)}}},B.t.log=()=>{let e=j(),t=k.st||`all`,n=Qt(e).filter(e=>t===`all`||(t===`revision`?[`revision`,`resub`].includes(R(e)):R(e)===t)).sort((e,t)=>e.at<t.at?1:-1).map(e=>{let t=R(e),n=D.xrev.get(e.id)||{};return[m(b(e.sem)),m(x(`final`)),m(v(e.subject)),m(F(e)),`—`,h(st(e).at),T(S,t),m(n.comment||`—`),`<div class="row">${qt(st(e).file)}${K(`examHist`,p(`السجل`,`History`),{cls:`s`,ic:`clock`,d:{id:e.id}})}${[`revision`,`resub`].includes(t)?K(`reup`,p(`إعادة رفع الاختبار بعد التعديل | Re-upload Revised Exam`,`Re-upload Revised Exam`),{cls:`s p`,ic:`up`,d:{id:e.id}}):``}</div>`]}),r=t===`all`?Zt(e).sort((e,t)=>e.date<t.date?1:-1).map(e=>[m(b(e.sem)),m(x(e.type)),m(v(e.subject)),m(y(e.grade,e.section)),h(e.date),`—`,T(fe,ht(e)),`—`,K(`go`,p(`فتح الجدولة`,`Open scheduling`),{cls:`s`,d:{view:`sched`}})]):[],i=[[`all`,p(`الكل`,`All`)],...[`awaiting`,`received`,`review`,`revision`,`ready`].map(e=>[e,w(S,e)])];return`${q(`سجل الاختبارات`,`Exam Log`,p(`كل ما رفعته أو جدولته، مع حالته وآخر ملاحظات معلم التربية الخاصة.`,`Everything you uploaded or scheduled, with its status and the latest review comments.`))}
  <div class="row sp">${Ot()}<div class="row">${i.map(([e,n])=>`<button class="chk ${t===e?`on`:``}" data-act="setv" data-k="st" data-val="${e}">${m(n)}</button>`).join(``)}</div></div>
  ${G([p(`الفصل الدراسي`,`Semester`),p(`نوع الاختبار`,`Exam type`),p(`المادة`,`Subject`),p(`الصف والشعبة`,`Class`),p(`تاريخ الاختبار`,`Exam date`),p(`تاريخ الرفع`,`Uploaded`),p(`الحالة`,`Status`),p(`آخر ملاحظات معلم التربية الخاصة`,`Latest review comments`),p(`الإجراءات`,`Actions`)],[...n,...r],p(`لا توجد اختبارات مطابقة.`,`No matching exams.`))}`};function an(e){let t=D.xrev.get(e.id)||{},n=[];return e.versions.forEach(e=>n.push({at:e.at,html:`<span class="b">${e.v===1?p(`رفع النسخة الأولى`,`First version uploaded`):p(`رفع نسخة معدلة رقم `,`Revised version uploaded, no. `)+e.v}</span> — ${m(e.by)}${e.withdrawn?` <span class="bd c-gray">${p(`سحبها المعلم`,`Withdrawn by teacher`)}</span>`:``}<div class="row" style="margin-top:4px">${Mt(e.file)}${qt(e.file)}</div>${e.notes?`<div class="sm mut">${m(e.notes)}</div>`:``}`})),(t.history||[]).forEach(e=>n.push({at:e.at,html:`${T(S,e.status)} — ${m(e.by)} <span class="xs mut">(${p(`النسخة`,`version`)} ${e.ver})</span>${e.comment?`<div class="sm">${p(`الملاحظات: `,`Comments: `)}${m(e.comment)}</div>`:``}`})),n.sort((e,t)=>e.at<t.at?-1:1),`<ul class="tl">${n.map(e=>`<li><div class="xs mut">${g(e.at)}</div>${e.html}</li>`).join(``)}</ul>`}z.examHist=e=>{let t=D.exams.get(e.id);t&&X(()=>`${Z(p(`سجل مراجعة الاختبار`,`Exam review history`)+` — `+v(t.subject)+` — `+F(t))}${an(t)}`)},z.reup=e=>{k.reupId=e.id,k.files.re=null,k.f.renotes=``,k.f.rewd=!1,X(()=>{let e=D.exams.get(k.reupId),t=D.xrev.get(k.reupId)||{};return`${Z(p(`إعادة رفع الاختبار بعد التعديل`,`Re-upload revised exam`))}${t.comment?`<div class="note"><b>${p(`التعديلات المطلوبة: `,`Requested changes: `)}</b>${m(t.comment)}</div>`:``}<p class="sm mut">${m(v(e.subject))} — ${m(b(e.sem))} — ${m(F(e))}</p>${Dt(`re`,`.pdf,.docx`,p(`اختر النسخة المعدلة (PDF أو Word)`,`Choose the revised version (PDF or Word)`))}${U(p(`ملاحظات للمراجع (اختياري)`,`Notes for the reviewer (optional)`),Et(`renotes`))}<label class="chk ${k.f.rewd?`on`:``}"><input type="checkbox" data-f="rewd" data-re="1"${k.f.rewd?` checked`:``}>${p(`سحب النسخة السابقة من العرض (تبقى محفوظة في سجل الأرشيف)`,`Withdraw the previous version from view (it stays in the archive log)`)}</label><div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`reupSave`,p(`رفع النسخة المعدلة`,`Upload revised version`),{cls:`p`,ic:`up`})}</div>`})},z.reupSave=async(e,t)=>{let n=D.exams.get(k.reupId),r=k.files.re;if(n){if(!r)return Y(`اختر ملف النسخة المعدلة.`,`Choose the revised file.`);t.disabled=!0;try{let e=await Ve(r,tn,`exam`);await L(`examReup`,{id:n.id,fileId:e,notes:String(k.f.renotes||``).trim(),withdraw:!!k.f.rewd}),Ft(),J(`تم رفع النسخة المعدلة وإشعار معلم التربية الخاصة.`,`Revised version uploaded and the special education teacher was notified.`),$()}catch(e){t.disabled=!1,I(e)}}};let on=(e,t,n)=>`${n}_${e}_${t}`,sn=(e,t)=>D.mreq.get(t+`_`+e),cn=(e,t)=>{let n=sn(e,t);return n?_.filter(e=>n.subjects.includes(e)):_},ln=(e,t)=>{let n=cn(e,t);return _.filter(r=>n.includes(r)||D.memos.get(on(e,r,t)))};function un(e){let t=j(),n=N();return n.length?`<div class="sgrid">${n.map(n=>`<div class="card"><h3>${m(n.name)}</h3><p class="sm mut">${m(y(n.grade,n.section))}</p><div class="tiles">${ln(n.id,t).map(r=>{let i=D.memos.get(on(n.id,r,t)),a=i&&(D.mrev.get(i.id)||{}).approved;return`<button class="tile ${i?a?`ap`:`ok`:`no`}" data-act="${e}" data-sid="${n.id}" data-sj="${r}">${E(i?`check`:`up`)}<span>${m(v(r))}</span><span class="xs">${i?a?p(`معتمدة ومتاحة لولي الأمر`,`Approved, shared with parent`):p(`تم الرفع`,`Uploaded`):sn(n.id,t)?p(`مطلوبة — لم تُرفع`,`Required — not uploaded`):p(`لم تُرفع مذكرة`,`No notes uploaded`)}</span></button>`}).join(``)||`<span class="sm mut" style="grid-column:1/-1">${p(`لا توجد مذكرات مطلوبة لهذا الطالب.`,`No notes are required for this student.`)}</span>`}</div></div>`).join(``)}</div>`:`<div class="empty">${p(`لا يوجد طلاب مسجلون بعد. يضيفهم معلم التربية الخاصة من قسم «الطلاب وأولياء الأمور».`,`No students registered yet. The special education teacher adds them under “Students & Parents”.`)}</div>`}B.t.memos=()=>`${q(`مذكرات طلاب التربية الخاصة`,`Special Education Student Notes`,p(`اضغط على المادة تحت اسم الطالب لرفع مذكرته مباشرة.`,`Tap a subject under a student’s name to upload that student’s notes.`))}${Ot()}${un(`memoOpen`)}`;function dn(e,t,n){let r=j(),i=D.memos.get(on(e,t,r)),a=i?i.versions:[],o=i&&(D.mrev.get(i.id)||{}).approved;return`${Z(v(t)+` — `+P(e))}
  ${i?`<div class="col" style="gap:8px">${a.slice().reverse().map((e,t)=>`<div class="card" style="padding:12px"><div class="row sp">${Mt(e.file,t===0?` <span class="bd c-green">${p(`الحالية`,`Current`)}</span>`:` <span class="bd c-gray">${p(`نسخة سابقة`,`Earlier version`)}</span>`)}<div class="row">${qt(e.file)}</div></div><div class="xs mut">${p(`رفعها: `,`Uploaded by: `)}${m(e.teacher)} — ${g(e.at)}</div></div>`).join(``)}</div>`:`<div class="empty">${p(`لم تُرفع مذكرة لهذه المادة بعد.`,`No notes uploaded for this subject yet.`)}</div>`}
  ${n?`<h3>${i?p(`رفع نسخة جديدة`,`Upload a new version`):p(`رفع المذكرة`,`Upload notes`)}</h3>${Dt(`memo`,`.pdf,.docx,.png,.jpg,.jpeg`,p(`PDF أو Word أو صورة`,`PDF, Word or image`))}<div class="row" style="justify-content:flex-end">${K(`memoSave`,p(`رفع المذكرة`,`Upload notes`),{cls:`p`,ic:`up`})}</div>`:i?`<div class="row sp"><span>${o?`<span class="bd c-blue">${p(`معتمدة ومتاحة لولي الأمر`,`Approved and shared with the parent`)}</span>`:`<span class="bd c-green">${p(`تم الرفع — لم تُعتمد بعد`,`Uploaded — not approved yet`)}</span>`}</span>${K(`memoApprove`,o?p(`إلغاء الاعتماد`,`Withdraw approval`):p(`اعتماد وإتاحة لولي الأمر`,`Approve and share with parent`),{cls:o?``:`p`,ic:`check`})}</div><div class="row" style="justify-content:flex-end">${K(`memoDel`,p(`حذف المذكرة نهائيًا`,`Delete these notes permanently`),{cls:`s d`,ic:`trash`})}</div>`:``}`}z.memoOpen=e=>{k.memo={sid:e.sid,sj:e.sj},k.files.memo=null,X(()=>dn(k.memo.sid,k.memo.sj,O.role===`t`))},z.memoSave=async(e,t)=>{let{sid:n,sj:r}=k.memo,i=k.files.memo,a=j();if(!i)return Y(`اختر ملف المذكرة.`,`Choose the notes file.`);t.disabled=!0;try{await L(`memoSave`,{sid:n,sj:r,year:a,fileId:await Ve(i,nn,`memo`)}),k.files.memo=null,J(`تم رفع المذكرة وإشعار معلم التربية الخاصة.`,`Notes uploaded and the special education teacher was notified.`),It(),$()}catch(e){t.disabled=!1,I(e)}},B.t.support=()=>{let e=[...D.requests.values()].filter(e=>e.teacher===O.name).sort((e,t)=>e.at<t.at?1:-1).slice(0,40);return`${q(`طلبات الدعم الفوري`,`Instant Support Requests`,p(`اختر نوع الطلب من بطاقة الطالب ليصل تنبيه فوري لمعلم التربية الخاصة.`,`Pick a request type on the student card to alert the special education teacher at once.`))}
  <div class="sgrid">${N().map(e=>`<div class="card"><h3>${m(e.name)}</h3><p class="sm mut">${m(y(e.grade,e.section))}</p><div class="rq">${Object.keys(C).map(t=>`<button class="c-${C[t][2]}" data-act="reqNew" data-sid="${e.id}" data-rt="${t}">${m(w(C,t))}</button>`).join(``)}</div></div>`).join(``)||`<div class="empty">${p(`لا يوجد طلاب مسجلون بعد.`,`No students registered yet.`)}</div>`}</div>
  <h2>${p(`طلباتي`,`My requests`)}</h2>${G([p(`النوع`,`Type`),p(`الطالب`,`Student`),p(`الملاحظة`,`Note`),p(`أُرسل`,`Sent`),p(`الحالة`,`Status`),p(`الإجراء والنتيجة`,`Action and outcome`)],e.map(e=>{let t=D.rstat.get(e.id)||{};return[T(C,e.type),m(P(e.studentId)),m(e.note||`—`),g(e.at),T(pe,gt(e)),m([t.action,t.outcome].filter(Boolean).join(` — `)||`—`)]}),p(`لم ترسل أي طلب بعد.`,`You have not sent any request yet.`))}`},z.reqNew=e=>{k.rq=e,k.f.rqnote=``,X(()=>`${Z(w(C,k.rq.rt)+` — `+P(k.rq.sid))}${U(p(`ملاحظة (اختياري)`,`Note (optional)`),Et(`rqnote`,p(`مثال: الاختبار في الحصة الثالثة — قاعة 12`,`Example: the exam is in period 3 — room 12`)))}<div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`reqSend`,p(`إرسال الطلب`,`Send request`),{cls:`p`})}</div>`)},z.reqSend=async()=>{let{sid:e,rt:t}=k.rq,n=String(k.f.rqnote||``).trim();try{await L(`reqNew`,{sid:e,rt:t,note:n}),Ft(),J(`أُرسل الطلب. ستصلك رسالة عند الاستلام.`,`Request sent. You will be notified when it is received.`),$()}catch(e){I(e)}},B.s.home=()=>{let e=j(),t=M(),n=[...D.schedules.values()].filter(n=>n.year===e&&+n.sem===t),r=ct(e,t),i=e=>n.filter(t=>ht(t)===e).length,a=e=>r.filter(t=>e===`revision`?[`revision`,`resub`].includes(R(t)):R(t)===e).length,o=0,s=0;N().forEach(n=>{let r=ft(n,e,t);o+=r.required,s+=r.uploaded});let c=N().filter(e=>!+e.section).length;return`${q(`لوحة التحكم`,`Dashboard`,p(`مركز إدارة الجدولة ومراجعة الاختبارات`,`Scheduling and exam review centre`))}${Ot(!0)}
  ${c?`<div class="note">${p(`يوجد ${c} طالب بدون شعبة محددة. حدّد الشعبة من «الطلاب وأولياء الأمور» حتى تُربط اختباراتهم بدقة.`,`${c} student(s) have no section set. Set it under “Students & Parents” so their exams are matched correctly.`)} ${K(`go`,p(`فتح قائمة الطلاب`,`Open students`),{cls:`s`,d:{view:`students`}})}</div>`:``}
  <h2>${p(`جدولة الاختبارات التكوينية`,`Formative exam schedules`)}</h2>
  ${At([[i(`new`),p(`جدولات جديدة`,`New schedules`),`amber`,{view:`incoming`,st:`new`}],[i(`received`),p(`جدولات مستلمة`,`Received schedules`),`blue`,{view:`incoming`,st:`received`}],[i(`done`),p(`جدولات تم تنفيذها`,`Completed schedules`),`green`,{view:`incoming`,st:`done`}]])}
  <h2>${p(`اختبارات نهاية الفصل (عدد الملفات)`,`End-of-semester exams (number of files)`)}</h2>
  ${At([[a(`awaiting`),p(`اختبارات جديدة بانتظار الاستلام`,`New, awaiting receipt`),`amber`,{view:`review`,st:`awaiting`}],[a(`received`),p(`تم استلامها`,`Received`),`blue`,{view:`review`,st:`received`}],[a(`review`),p(`قيد المراجعة`,`Under review`),`violet`,{view:`review`,st:`review`}],[a(`revision`),p(`تحتاج إلى تعديل`,`Need revision`),`red`,{view:`review`,st:`revision`}],[a(`ready`),p(`جاهزة للتسليم للشؤون الأكاديمية`,`Ready for Academic Affairs`),`green`,{view:`review`,st:`ready`}]])}
  <h2>${p(`متطلبات الطلاب`,`Student requirements`)}</h2>
  ${At([[o,p(`اختبارات مطلوبة من الطلاب`,`Exams required of students`),`pri`,{view:`reqs`}],[s,p(`متطلبات استوفيت برفع اختبار`,`Requirements met by an upload`),`green`,{view:`reqs`}],[o-s,p(`متطلبات لم يُرفع اختبارها`,`Requirements with no upload`),`red`,{view:`reports`,tab:`r2`}]])}
  <div class="card"><h2>${p(`آخر الإشعارات`,`Latest notifications`)}</h2>${Gt(6)?`<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden">${Gt(6)}</div>`:`<p class="mut">${p(`ستظهر هنا الجدولات والاختبارات والمذكرات الجديدة فور وصولها.`,`New schedules, exams and notes will appear here as they arrive.`)}</p>`}</div>`},z.go=e=>zt(e.view,{...e.st?{st:e.st}:{},...e.tab?{tab:e.tab}:{}}),B.s.support=()=>{let e=[...D.requests.values()].sort((e,t)=>e.at<t.at?1:-1).slice(0,200).map(e=>{let t=gt(e),n=D.rstat.get(e.id)||{},r={new:[`received`,p(`استلام`,`Receive`)],received:[`in_progress`,p(`بدء التدخل`,`Start`)],in_progress:[`completed`,p(`إكمال`,`Complete`)]}[t];return[T(C,e.type),m(P(e.studentId)),m(e.teacher),m(e.note||`—`),g(e.at),T(pe,t),m([n.action,n.outcome].filter(Boolean).join(` — `)||`—`),`<div class="row">${r?K(`reqSet`,r[1],{cls:`s p`,d:{id:e.id,st:r[0]}}):``}${K(`reqDel`,p(`حذف`,`Delete`),{cls:`s d`,d:{id:e.id}})}</div>`]});return`${q(`طلبات الدعم الفوري`,`Instant Support Requests`)}${G([p(`النوع`,`Type`),p(`الطالب`,`Student`),p(`المعلم`,`Teacher`),p(`الملاحظة`,`Note`),p(`وقت الطلب`,`Requested`),p(`الحالة`,`Status`),p(`الإجراء والنتيجة`,`Action and outcome`),p(`الإجراءات`,`Actions`)],e,p(`لا توجد طلبات دعم.`,`No support requests.`))}`};async function fn(e,t,n){await L(`reqSet`,{id:e,st:t,...n||{}}),$()}z.reqSet=e=>{if(e.st!==`completed`)return fn(e.id,e.st).catch(I);k.rqid=e.id,k.f.act=``,k.f.outc=``,X(()=>`${Z(p(`إكمال الطلب`,`Complete request`))}${U(p(`الإجراء المتخذ`,`Action taken`),Et(`act`))}${U(p(`النتيجة`,`Outcome`),Et(`outc`))}<div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`reqDone`,p(`حفظ وإكمال`,`Save and complete`),{cls:`p`})}</div>`)},z.reqDone=()=>fn(k.rqid,`completed`,{action:String(k.f.act||``).trim(),outcome:String(k.f.outc||``).trim()}).then(Ft).catch(I),z.reqDel=e=>Q(p(`حذف هذا الطلب من السجل؟`,`Delete this request from the log?`),async()=>{await L(`reqDel`,{id:e.id})},p(`حذف`,`Delete`));let pn={type:[`نوع الاختبار`,`Exam type`],date:[`التاريخ`,`Date`],subject:[`المادة`,`Subject`],grade:[`الصف`,`Grade`],section:[`الشعبة`,`Section`],period:[`الحصة`,`Period`],notes:[`الملاحظات`,`Notes`]},mn=(e,t)=>t==null||t===``?`—`:e===`type`?x(t):e===`date`?h(t):e===`subject`?v(t):e===`grade`?le(+t):e===`section`?p(`شعبة `,`Section `)+t:e===`period`?ue(+t):String(t);z.schedHist=e=>{let t=D.schedules.get(e.id);t&&X(()=>`${Z(p(`سجل تعديلات الجدولة`,`Schedule edit history`)+` — `+v(t.subject)+` — `+y(t.grade,t.section))}<ul class="tl">${[...t.log||[]].reverse().map(e=>`<li><div class="xs mut">${g(e.at)} — ${m(e.by)}</div>${(e.changes||[]).map(e=>typeof e==`string`?`<div class="sm">${m(e)}</div>`:`<div class="sm"><span class="b">${m(pn[e.field]?p(pn[e.field][0],pn[e.field][1]):e.field)}:</span> ${m(mn(e.field,e.from))} ${p(`←`,`→`)} ${m(mn(e.field,e.to))}</div>`).join(``)||`<div class="sm mut">${p(`حفظ دون تغيير`,`Saved with no change`)}</div>`}</li>`).join(``)}</ul>`)},B.s.incoming=()=>{let e=j(),t=M(),n=k.st||`all`,r=[...D.schedules.values()].filter(r=>r.year===e&&+r.sem===t&&(n===`all`||ht(r)===n)).sort((e,t)=>e.date<t.date?-1:1).map(e=>{let t=ht(e);return[m(e.teacher),m(v(e.subject)),m(y(e.grade,e.section)),m(b(e.sem)),m(x(e.type)),h(e.date),m(ue(e.period)),m(e.notes||`—`)+((e.log||[]).length?`<div style="margin-top:4px">${K(`schedHist`,p(`سجل التعديلات (${e.log.length})`,`Edit history (${e.log.length})`),{cls:`s`,ic:`clock`,d:{id:e.id}})}</div>`:``),T(fe,t),`<div class="row">${t===`new`?K(`schedSet`,p(`تم الاستلام | Received`,`Received`),{cls:`s p`,d:{id:e.id,st:`received`}}):``}${t===`done`?``:K(`schedSet`,p(`تم التنفيذ | Completed`,`Completed`),{cls:`s`,d:{id:e.id,st:`done`}})}</div>`]});return`${q(`جدولة الاختبارات الواردة | Incoming Exam Schedules`,`Incoming Exam Schedules | جدولة الاختبارات الواردة`)}
  <div class="row sp">${Ot(!0)}<div class="row">${[[`all`,p(`الكل`,`All`)],...Object.keys(fe).map(e=>[e,w(fe,e)])].map(([e,t])=>`<button class="chk ${n===e?`on`:``}" data-act="setv" data-k="st" data-val="${e}">${m(t)}</button>`).join(``)}</div></div>
  ${G([p(`اسم المعلم`,`Teacher`),p(`المادة`,`Subject`),p(`الصف والشعبة`,`Class`),p(`الفصل الدراسي`,`Semester`),p(`نوع الاختبار`,`Exam type`),p(`تاريخ الاختبار`,`Exam date`),p(`الحصة`,`Period`),p(`الملاحظات`,`Notes`),p(`الحالة`,`Status`),p(`الإجراءات`,`Actions`)],r,p(`لا توجد جدولات في هذا الفصل.`,`No schedules this semester.`))}`},z.schedSet=async e=>{try{await L(`schedSet`,{id:e.id,st:e.st}),J(`تم تحديث الحالة وإشعار المعلم.`,`Status updated and the teacher was notified.`),$()}catch(e){I(e)}},B.s.reqs=()=>{let e=j(),t=M(),n=N(),r=V(`rs`),i=k.rsubs||[],a=k.rteach||{},o=0,s=n.map(n=>{let r=ft(n,e,t);return o+=r.required,[`<span class="b">${m(n.name)}</span>`,m(y(n.grade,n.section)),m(b(t)),r.subs.map(e=>m(v(e))).join(`، `)||`<span class="mut">${p(`لم تُحدد`,`Not set`)}</span>`,r.required,r.uploaded,r.received,r.review,r.revision,r.ready,r.remaining,`<div class="row">${K(`reqEdit`,p(`تعديل`,`Edit`),{cls:`s`,ic:`edit`,d:{sid:n.id}})}${K(`stuFiles`,p(`الاختبارات`,`Exams`),{cls:`s`,ic:`file`,d:{sid:n.id}})}${K(`reqLog`,p(`السجل`,`Log`),{cls:`s`,ic:`clock`,d:{sid:n.id}})}</div>`]});return`${q(`تحديد الاختبارات المطلوبة للطلاب | Student Exam Requirements`,`Student Exam Requirements | تحديد الاختبارات المطلوبة للطلاب`,p(`هذه القائمة هي المصدر الوحيد الذي تعتمد عليه جميع التقارير في حساب المطلوب وغير المستلم.`,`This list is the only source every report uses to count what is required and what is missing.`))}
  <div class="row sp">${Ot(!0)}${K(`reqCopy`,p(`نسخ من فصل سابق`,`Copy from an earlier semester`),{ic:`copy`})}</div>
  <div class="card col"><h2>${p(`متطلبات طالب`,`Requirements for a student`)} — ${m(b(t))} ${m(e)}</h2>
  ${U(p(`الطالب`,`Student`),`<select data-f="rs" data-pick="1"><option value="">${p(`اختر الطالب…`,`Choose a student…`)}</option>${n.map(e=>H(e.id,e.name+` — `+y(e.grade,e.section),r)).join(``)}</select>`)}
  ${r?`<div class="f"><span>${p(`المواد المطلوبة`,`Required subjects`)} — ${p(`عدد الاختبارات المطلوبة`,`Required exam count`)}: <b>${i.length}</b></span><div class="row">${_.map(e=>`<label class="chk ${i.includes(e)?`on`:``}"><input type="checkbox" data-sub="${e}"${i.includes(e)?` checked`:``}>${m(v(e))}</label>`).join(``)}</div></div>
  ${i.length?`<div class="f"><span>${p(`المعلم المسؤول عن كل مادة (اختياري — يظهر في تقرير غير المستلم)`,`Teacher responsible for each subject (optional — shown in the Not Received report)`)}</span><div class="fg">${i.map(e=>U(v(e),`<select data-rt="${e}"><option value="">${p(`غير محدد`,`Not set`)}</option>${Ee().map(t=>H(t.name,t.name,a[e]||``)).join(``)}</select>`)).join(``)}</div></div>`:``}
  <div class="row">${K(`reqSave`,p(`حفظ المتطلبات`,`Save requirements`),{cls:`p`,ic:`check`})}</div>`:``}</div>
  <div class="row sp"><h2>${p(`حالة الاختبارات لكل طالب`,`Exam status per student`)}</h2><span class="bd c-blue">${p(`إجمالي الاختبارات المطلوبة لجميع الطلاب: `,`Total exams required for all students: `)}${o}</span></div>
  ${G([p(`اسم الطالب`,`Student`),p(`الصف والشعبة`,`Class`),p(`الفصل`,`Semester`),p(`المواد المطلوبة`,`Required subjects`),p(`المطلوب`,`Required`),p(`المرفوع`,`Uploaded`),p(`المستلم`,`Received`),p(`قيد المراجعة`,`Under review`),p(`يحتاج تعديل`,`Needs revision`),p(`جاهز للتسليم`,`Ready`),p(`المتبقي`,`Remaining`),p(`الإجراءات`,`Actions`)],s,p(`أضف الطلاب أولًا من قسم «الطلاب وأولياء الأمور».`,`Add students first under “Students & Parents”.`))}`};function hn(e){let t=lt(e,j(),M())||{};k.f.rs=e,k.rsubs=[...t.subjects||[]],k.rteach={...t.teachers||{}}}z.reqEdit=e=>{hn(e.sid),$(),window.scrollTo(0,0)};async function gn(e,t,n,r,i,a){await L(`reqsSave`,{sid:e,year:t,sem:n,subjects:r,teachers:i||{},note:a||``})}z.reqSave=async()=>{let e=V(`rs`);if(e)try{await gn(e,j(),M(),k.rsubs||[],k.rteach),J(`تم حفظ المتطلبات. عدد الاختبارات المطلوبة لهذا الطالب: ${(k.rsubs||[]).length}`,`Requirements saved. Exams required for this student: ${(k.rsubs||[]).length}`),k.f.rs=``,k.rsubs=[],k.rteach={},$()}catch(e){I(e)}},z.reqLog=e=>{let t=[...D.reqs.values()].filter(t=>t.studentId===e.sid).sort((e,t)=>e.id<t.id?1:-1);X(()=>`${Z(p(`سجل متطلبات الطالب — `,`Requirement log — `)+P(e.sid))}${t.length?t.map(e=>`<h3>${m(e.year)} — ${m(b(e.sem))}</h3><p class="sm">${e.subjects.map(v).map(m).join(`، `)||`—`}</p><ul class="tl">${(e.log||[]).map(e=>`<li><div class="xs mut">${g(e.at)} — ${m(e.by)}</div><span class="sm">${e.added.length?p(`أضيف: `,`Added: `)+e.added.map(v).map(m).join(`، `):``} ${e.removed.length?p(` حُذف: `,` Removed: `)+e.removed.map(v).map(m).join(`، `):``}${!e.added.length&&!e.removed.length?p(`حفظ دون تغيير في المواد`,`Saved with no subject change`):``} ${m(e.note||``)}</span></li>`).join(``)}</ul>`).join(``):`<div class="empty">${p(`لا يوجد سجل بعد.`,`No log yet.`)}</div>`}`)},z.reqCopy=()=>{k.cp={y:j(),sem:M()===1?3:M()-1,m:null},M()===1&&(k.cp.y=ce[Math.max(0,ce.indexOf(j())-1)]),_n(),X(vn,!0)};function _n(){k.cp.m={},N().forEach(e=>k.cp.m[e.id]=[...ut(e.id,k.cp.y,k.cp.sem)])}function vn(){let e=k.cp;return`${Z(p(`نسخ المتطلبات إلى `,`Copy requirements into `)+b(M())+` `+j())}<div class="row"><label class="row sm">${p(`من العام`,`From year`)}<select data-cp="y" style="width:auto">${ce.map(t=>H(t,t,e.y)).join(``)}</select></label><label class="row sm">${p(`الفصل`,`Semester`)}<select data-cp="sem" style="width:auto">${[1,2,3].map(t=>H(t,b(t),e.sem)).join(``)}</select></label></div><p class="sm mut">${p(`عدّل الاختيارات قبل الحفظ. الحفظ يستبدل متطلبات الفصل الحالي للطلاب الظاهرين.`,`Adjust the ticks before saving. Saving replaces the current semester’s requirements for the students shown.`)}</p><div class="tw"><table><thead><tr><th>${p(`الطالب`,`Student`)}</th>${_.map(e=>`<th class="n">${m(v(e))}</th>`).join(``)}</tr></thead><tbody>${N().map(t=>`<tr><td>${m(t.name)}</td>${_.map(n=>`<td class="n"><input type="checkbox" data-cps="${t.id}" data-k="${n}"${(e.m[t.id]||[]).includes(n)?` checked`:``}></td>`).join(``)}</tr>`).join(``)}</tbody></table></div><div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`copySave`,p(`حفظ في الفصل الحالي`,`Save into current semester`),{cls:`p`})}</div>`}z.copySave=async()=>{try{let e=e=>_.filter(t=>e.includes(t)).join();for(let t of N()){let n=k.cp.m[t.id]||[];e(n)!==e(ut(t.id,j(),M()))&&await gn(t.id,j(),M(),n,(lt(t.id,k.cp.y,k.cp.sem)||{}).teachers,p(`نسخ من ${b(k.cp.sem)} ${k.cp.y}`,`Copied from ${b(k.cp.sem)} ${k.cp.y}`))}Ft(),J(`تم نسخ المتطلبات وحفظها.`,`Requirements copied and saved.`),$()}catch(e){I(e)}},z.stuFiles=e=>{k.sf=e.sid,X(()=>{let e=De(k.sf),t=ft(e,j(),M());return`${Z(p(`اختبارات الطالب — `,`Student exams — `)+e.name+` — `+b(M()))}${G([p(`المادة`,`Subject`),p(`المعلم`,`Teacher`),p(`الملف`,`File`),p(`الحالة`,`Status`),p(`الإجراءات`,`Actions`)],t.items.map(t=>t.exam?[m(v(t.subject)),m(t.exam.teacher),m(st(t.exam).file.name),T(S,t.status),`<div class="row">${qt(st(t.exam).file)}${K(`examDel`,p(`حذف الاختبار`,`Delete exam`),{cls:`s d`,ic:`trash`,d:{id:t.exam.id}})}</div>`]:[m(v(t.subject)),m(mt(e,t.subject,j(),M())||`—`),`—`,`<span class="bd c-gray">${p(`لم يُرفع`,`Not uploaded`)}</span>`,``]),p(`لم تُحدد مواد مطلوبة لهذا الطالب في هذا الفصل.`,`No required subjects set for this student this semester.`))}<p class="xs mut">${p(`حذف الاختبار يزيله من جميع القوائم والتقارير لكل الطلاب الذين يغطيهم، ويُشعر المعلم.`,`Deleting an exam removes it from every list and report for all students it covers, and notifies the teacher.`)}</p>`},!0)},z.examDel=e=>Q(p(`حذف هذا الاختبار المرفوع؟ سيُزال من القوائم والتقارير.`,`Delete this uploaded exam? It will be removed from lists and reports.`),async()=>{await L(`examDel`,{id:e.id}),J(`حُذف الاختبار.`,`Exam deleted.`),e.from===`rev`?Ft():It()},p(`حذف`,`Delete`));function yn(e){let t={sem:[p(`الفصل`,`Semester`),[[``,p(`كل الفصول`,`All semesters`)],...W.sem()]],subject:[p(`المادة`,`Subject`),[[``,p(`كل المواد`,`All subjects`)],...W.subj()]],teacher:[p(`المعلم`,`Teacher`),[[``,p(`كل المعلمين`,`All teachers`)],...[...new Set([...D.exams.values(),...D.schedules.values()].map(e=>e.teacher))].sort().map(e=>[e,e])]],student:[p(`الطالب`,`Student`),[[``,p(`كل الطلاب`,`All students`)],...W.stu()]],grade:[p(`الصف`,`Grade`),[[``,p(`كل الصفوف`,`All grades`)],...W.grade()]],section:[p(`الشعبة`,`Section`),[[``,p(`كل الشعب`,`All sections`)],...W.sec()]],status:[p(`الحالة`,`Status`),[[``,p(`كل الحالات`,`All statuses`)],...[`awaiting`,`received`,`review`,`revision`,`ready`].map(e=>[e,w(S,e)])]],year:[p(`العام الدراسي`,`Academic year`),[...e.includes(`allyears`)?[[`all`,p(`كل الأعوام`,`All years`)]]:[],...W.year()]]};return`<div class="card"><div class="fg" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${e.filter(e=>t[e]).map(e=>U(t[e][0],`<select data-f="q_${e}" data-re="1">${t[e][1].map(([t,n])=>H(t,n,e===`year`?V(`q_year`,j()):e===`status`?V(`q_status`,k.st&&k.st!==`all`?k.st:``):V(`q_`+e))).join(``)}</select>`)).join(``)}</div></div>`}function bn(e){let t=V(`q_year`,j()),n=e||V(`q_status`,k.st&&k.st!==`all`?k.st:``),r=e=>V(`q_`+e);return ct(t===`all`?null:t,r(`sem`)).filter(e=>(!r(`subject`)||e.subject===r(`subject`))&&(!r(`teacher`)||e.teacher===r(`teacher`))&&(!r(`grade`)||+e.grade==+r(`grade`))&&(!r(`section`)||+e.section==+r(`section`))&&(!n||(n===`revision`?[`revision`,`resub`].includes(R(e)):R(e)===n))&&(!r(`student`)||pt(e).some(e=>e.id===r(`student`)))).sort((e,t)=>e.at<t.at?1:-1)}B.s.review=()=>`${q(`مراجعة اختبارات نهاية الفصول | Final Exam Review`,`Final Exam Review | مراجعة اختبارات نهاية الفصول`)}${yn([`year`,`sem`,`subject`,`teacher`,`grade`,`section`,`status`])}
  ${G([p(`اسم المعلم`,`Teacher`),p(`المادة`,`Subject`),p(`الصف والشعبة`,`Class`),p(`الفصل الدراسي`,`Semester`),p(`تاريخ الرفع`,`Uploaded`),p(`اسم الملف`,`File name`),p(`الطلاب الذين ينطبق عليهم`,`Students it applies to`),p(`الحالة`,`Status`),``],bn().map(e=>{let t=pt(e);return[m(e.teacher),m(v(e.subject)),m(F(e)),m(b(e.sem)),g(st(e).at),m(st(e).file.name)+(e.versions.length>1?` <span class="bd c-gray">${p(`نسخة `,`v`)}${e.versions.length}</span>`:``),t.length?t.map(e=>m(e.name)).join(`، `):`<span class="mut">${p(`لا يوجد طالب مطلوب منه هذه المادة في هذه الشعبة`,`No student in this section requires this subject`)}</span>`,T(S,R(e)),`<div class="row">${K(`examOpen`,p(`فتح ومراجعة`,`Open and review`),{cls:`s p`,ic:`eye`,d:{id:e.id}})}${K(`examDel`,p(`حذف`,`Delete`),{cls:`s d`,ic:`trash`,d:{id:e.id,from:`tbl`}})}</div>`]}),p(`لا توجد اختبارات مطابقة.`,`No matching exams.`))}`,z.examOpen=e=>{let t=D.exams.get(e.id);if(!t||t.deleted)return Y(`هذا الاختبار غير موجود.`,`This exam no longer exists.`);k.xid=e.id,k.f.xcomment=``,k.xneed=!1,k.pv=st(t).file,X(xn,!0),Ge(k.pv,`pv`)};function xn(){let e=D.exams.get(k.xid),t=R(e),n=st(e).file,r=pt(e);return`${Z(v(e.subject)+` — `+b(e.sem)+` — `+F(e))}
  <div class="row sp"><div class="sm"><span class="b">${m(e.teacher)}</span> — ${g(st(e).at)} — ${p(`النسخة`,`Version`)} ${e.versions.length}<br>${Mt(n)}</div><div class="row">${T(S,t)}${K(`dl`,p(`تنزيل`,`Download`),{cls:`s`,ic:`dl`})}${K(`examDel`,p(`حذف الاختبار`,`Delete exam`),{cls:`s d`,ic:`trash`,d:{id:e.id,from:`rev`}})}</div></div>
  <p class="sm"><span class="mut">${p(`ينطبق على: `,`Applies to: `)}</span>${r.map(e=>m(e.name)).join(`، `)||p(`لا أحد وفق قائمة المتطلبات`,`nobody, per the requirements list`)}</p>
  <div class="pv" id="pv"></div>
  <div class="col" style="gap:8px"><h3>${p(`تغيير حالة المراجعة`,`Change review status`)}</h3>
  <div class="row">${K(`xset`,p(`تم الاستلام | Received`,`Received`),{d:{st:`received`}})}${K(`xset`,p(`قيد المراجعة | Under Review`,`Under Review`),{d:{st:`review`}})}${K(`xneed`,p(`طلب التعديل | Revision Required`,`Revision Required`),{cls:`d`})}${K(`xset`,p(`جاهز للتسليم للشؤون الأكاديمية`,`Ready for Academic Affairs Submission`),{cls:`p`,d:{st:`ready`}})}</div>
  <p class="xs mut">${p(`«تم الاستلام» تأكيد استلام فقط. «جاهز للتسليم» لا يعني اعتماد الشؤون الأكاديمية النهائي.`,`“Received” only confirms receipt. “Ready for submission” is not final approval by Academic Affairs.`)}</p>
  <div id="xneed" ${k.xneed?``:`hidden`}>${U(p(`الملاحظات والتعديلات المطلوبة (إلزامي)`,`Required comments and changes (mandatory)`),Et(`xcomment`))}<div class="row" style="margin-top:8px">${K(`xset`,p(`إرسال طلب التعديل للمعلم`,`Send revision request to teacher`),{cls:`p`,d:{st:`revision`}})}</div></div></div>
  <h3>${p(`سجل مراجعة الاختبار`,`Exam review history`)}</h3>${an(e)}`}z.xneed=()=>{k.xneed=!0;let e=te(`#xneed`);if(e){e.hidden=!1;let t=e.querySelector(`textarea`);t&&t.focus()}},z.xset=async e=>{let t=D.exams.get(k.xid),n=e.st,r=n===`revision`?String(k.f.xcomment||``).trim():``;if(n===`revision`&&r.length<3)return Y(`اكتب الملاحظات والتعديلات المطلوبة قبل الإرسال.`,`Write the required comments and changes before sending.`);try{await L(`xset`,{id:t.id,st:n,comment:r}),Ft(),J(`تم تحديث حالة الاختبار وإشعار المعلم.`,`Exam status updated and the teacher was notified.`),$()}catch(e){I(e)}},B.s.memos=()=>{let e=j(),t=0,n=0;return N().forEach(r=>cn(r.id,e).forEach(i=>{t++,D.memos.get(on(r.id,i,e))&&n++})),`${q(`مذكرات الطلاب`,`Student Notes`,p(`الأخضر: تم الرفع. الأزرق: معتمدة ومتاحة لولي الأمر. اضغط المادة للمعاينة والاعتماد.`,`Green: uploaded. Blue: approved and shared with the parent. Tap a subject to preview and approve.`))}<div class="row sp">${Ot()}<div class="row"><span class="bd c-green">${p(`مذكرات مرفوعة من المطلوب: `,`Required notes uploaded: `)}${n} / ${t}</span>${K(`mreqOpen`,p(`تحديد المذكرات المطلوبة لكل طالب`,`Set required notes per student`),{cls:`p`,ic:`check`})}</div></div>${un(`memoOpen`)}`},z.mreqOpen=()=>{let e=j();k.mq={},N().forEach(t=>k.mq[t.id]=[...cn(t.id,e)]),X(()=>`${Z(p(`المذكرات المطلوبة لكل طالب — `,`Required notes per student — `)+j())}<p class="sm mut">${p(`ضع علامة على المواد المطلوب رفع مذكرة لها لكل طالب. يظهر لمعلم التعليم العام المواد المحددة فقط.`,`Tick the subjects that need notes for each student. General education teachers see only the ticked subjects.`)}</p><div class="tw"><table><thead><tr><th>${p(`الطالب`,`Student`)}</th>${_.map(e=>`<th class="n">${m(v(e))}</th>`).join(``)}<th class="n">${p(`العدد`,`Count`)}</th></tr></thead><tbody>${N().map(e=>`<tr><td>${m(e.name)}<div class="xs mut">${m(y(e.grade,e.section))}</div></td>${_.map(t=>`<td class="n"><input type="checkbox" data-mq="${e.id}" data-k="${t}"${k.mq[e.id].includes(t)?` checked`:``}></td>`).join(``)}<td class="n b" id="mqc_${e.id}">${k.mq[e.id].length}</td></tr>`).join(``)}</tbody></table></div><div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`mreqSave`,p(`حفظ`,`Save`),{cls:`p`})}</div>`,!0)},z.mreqSave=async()=>{let e=j();try{let t={};for(let e of N())t[e.id]=_.filter(t=>(k.mq[e.id]||[]).includes(t));await L(`mreqSave`,{year:e,map:t}),Ft(),J(`تم حفظ المذكرات المطلوبة.`,`Required notes saved.`),$()}catch(e){I(e)}},z.memoApprove=async()=>{let{sid:e,sj:t}=k.memo,n=on(e,t,j()),r=(D.mrev.get(n)||{}).approved;try{await L(`memoApprove`,{id:n,on:!r}),It(),$()}catch(e){I(e)}};let Sn=()=>{let e;do e=String(Math.floor(1e5+Math.random()*9e5));while(N().some(t=>t.parentCode===e));return e};B.s.students=()=>`${q(`الطلاب وأولياء الأمور`,`Students & Parents`,p(`رمز الدخول يربط ولي الأمر بأبنائه؛ استخدم الرمز نفسه للإخوة.`,`The access code links a parent to their children; use the same code for siblings.`))}
  <div class="row">${K(`stuForm`,p(`إضافة طالب`,`Add student`),{cls:`p`,ic:`plus`})}</div>
  ${G([p(`اسم الطالب`,`Student`),p(`الصف`,`Grade`),p(`الشعبة`,`Section`),p(`ولي الأمر`,`Parent`),p(`رمز دخول ولي الأمر`,`Parent access code`),p(`الإجراءات`,`Actions`)],N().map(e=>[`<span class="b">${m(e.name)}</span>`,m(le(e.grade)),+e.section?e.section:`<span class="bd c-red">${p(`غير محددة`,`Not set`)}</span>`,m(e.parentName||`—`),e.parentCode?`<span class="ltr b">${m(e.parentCode)}</span>`:`<span class="mut">${p(`لم يُصدر`,`Not issued`)}</span>`,`<div class="row">${K(`stuForm`,p(`تعديل`,`Edit`),{cls:`s`,ic:`edit`,d:{id:e.id}})}${K(`stuDel`,p(`حذف`,`Delete`),{cls:`s d`,ic:`trash`,d:{id:e.id}})}</div>`]),p(`لا يوجد طلاب. أضف أول طالب.`,`No students. Add the first one.`))}`,z.stuForm=e=>{let t=e.id?De(e.id):null;k.sid=e.id||null,k.f={...k.f,sn:t?t.name:``,sg:t?t.grade:``,ss:t&&t.section||``,spn:t&&t.parentName||``,spc:t&&t.parentCode||``},X(()=>`${Z(k.sid?p(`تعديل بيانات الطالب`,`Edit student`):p(`إضافة طالب`,`Add student`))}<div class="fg">${U(p(`اسم الطالب`,`Student name`),Tt(`sn`),`w`)}${U(p(`الصف`,`Grade`),wt(`sg`,W.grade()))}${U(p(`الشعبة`,`Section`),wt(`ss`,W.sec(),{ph:p(`غير محددة`,`Not set`)}))}${U(p(`اسم ولي الأمر`,`Parent name`),Tt(`spn`))}${U(p(`رمز دخول ولي الأمر`,`Parent access code`),`<div class="row" style="flex-wrap:nowrap"><input type="text" class="ltr" data-f="spc" value="${m(V(`spc`))}">${K(`stuCode`,p(`توليد`,`Generate`),{cls:`s`})}</div>`)}</div><div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`stuSave`,p(`حفظ`,`Save`),{cls:`p`})}</div>`)},z.stuCode=()=>{k.f.spc=Sn(),It()},z.stuSave=async()=>{let e=k.f,t=String(e.sn||``).trim();if(t.length<3||!e.sg)return Y(`اكتب اسم الطالب واختر الصف.`,`Type the student name and choose the grade.`);try{await L(`stuSave`,{...k.sid?{id:k.sid}:{},name:t,grade:+e.sg,section:+e.ss||0,parentName:String(e.spn||``).trim(),parentCode:String(e.spc||``).trim()}),Ft(),J(`تم حفظ بيانات الطالب.`,`Student saved.`),$()}catch(e){I(e)}},z.stuDel=e=>Q(p(`حذف الطالب «${P(e.id)}» من القوائم؟ تبقى سجلاته السابقة محفوظة في الأرشيف.`,`Remove “${P(e.id)}” from the lists? Earlier records stay in the archive.`),async()=>{await L(`stuDel`,{id:e.id}),J(`حُذف الطالب من القوائم.`,`Student removed from the lists.`)},p(`حذف`,`Delete`)),B.s.teachers=()=>`${q(`المعلمون`,`Teachers`,p(`تظهر هذه الأسماء في قائمة الدخول وفي قوائم المنصة.`,`These names appear in the sign-in list and across the platform.`))}
  <div class="card"><div class="fg">${U(p(`اسم المعلم`,`Teacher name`),Tt(`tn`))}${U(p(`التخصص`,`Subject`),Tt(`ts`))}<div class="f"><span>&nbsp;</span>${K(`tAdd`,p(`إضافة معلم`,`Add teacher`),{cls:`p`,ic:`plus`})}</div></div></div>
  ${G([p(`اسم المعلم`,`Teacher`),p(`التخصص`,`Subject`),``],Ee().map(e=>[m(e.name),m(e.subject||`—`),K(`tDel`,p(`حذف`,`Delete`),{cls:`s d`,ic:`trash`,d:{id:e.id}})]),p(`لا يوجد معلمون في القائمة.`,`No teachers in the list.`))}`,z.tAdd=async()=>{let e=String(V(`tn`)).trim().replace(/\s+/g,` `);if(e.length<3)return Y(`اكتب اسم المعلم.`,`Type the teacher name.`);if(Ee().some(t=>t.name===e))return Y(`هذا الاسم موجود في القائمة.`,`This name is already in the list.`);try{await L(`tAdd`,{name:e,subject:String(V(`ts`)).trim()}),k.f.tn=``,k.f.ts=``,J(`أضيف المعلم.`,`Teacher added.`),$()}catch(e){I(e)}},z.tDel=e=>Q(p(`حذف «${(D.teachers.get(e.id)||{}).name}» من قائمة المعلمين؟ تبقى اختباراته السابقة محفوظة.`,`Remove “${(D.teachers.get(e.id)||{}).name}” from the teacher list? Their earlier exams stay saved.`),async()=>{await L(`tDel`,{id:e.id})},p(`حذف`,`Delete`)),B.s.settings=()=>`${q(`الإعدادات`,`Settings`)}${Nn()}${s?``:`<div class="card col"><h2>${p(`رمز دخول معلمي التعليم العام`,`General education teacher sign-in code`)}</h2><p class="sm mut">${p(`رمز موحد يكتبه كل معلم مع اسمه عند الدخول. عند تغييره يُطلب من جميع المعلمين الدخول من جديد بالرمز الجديد.`,`One shared code every teacher types with their name to sign in. Changing it signs every teacher out until they use the new code.`)}</p><div class="fg">${U(p(`الرمز الجديد (4 إلى 12 رقمًا)`,`New code (4 to 12 digits)`),`<input type="text" inputmode="numeric" class="ltr" data-f="tcn" autocomplete="off" value="${m(V(`tcn`))}">`)}<div class="f"><span>&nbsp;</span>${K(`tcodeSet`,p(`حفظ الرمز`,`Save code`),{cls:`p`,ic:`check`})}</div></div></div>`}${s?`<div class="card col"><h2>${p(`كلمة مرور معلمي التربية الخاصة`,`Special education password`)}</h2><div class="fg">${U(p(`كلمة المرور الحالية`,`Current password`),`<input type="password" class="ltr" data-f="pwo" autocomplete="off" value="${m(V(`pwo`))}">`)}${U(p(`كلمة المرور الجديدة (6 أحرف على الأقل)`,`New password (at least 6 characters)`),`<input type="password" class="ltr" data-f="pwn" autocomplete="off" value="${m(V(`pwn`))}">`)}<div class="f"><span>&nbsp;</span>${K(`pwChange`,p(`تغيير كلمة المرور`,`Change password`),{cls:`p`})}</div></div></div>`:``}
  <div class="card col"><h2>${p(`العام والفصل الدراسي الحالي`,`Current academic year and semester`)}</h2><p class="sm mut">${p(`يحددان ما يظهر افتراضيًا لجميع المستخدمين، وما يراه ولي الأمر من أنشطة واستبيان.`,`These set what everyone sees by default, and which activities and survey parents see.`)}</p><div class="fg">${U(p(`العام الدراسي`,`Academic year`),wt(`cy`,W.year(),{val:V(`cy`,we()),ph:!1}))}${U(p(`الفصل الدراسي`,`Semester`),wt(`cs`,W.sem(),{val:V(`cs`,Te()),ph:!1}))}</div><div class="row">${K(`setSave`,p(`حفظ`,`Save`),{cls:`p`})}</div></div>
  <div class="card col"><h2>${p(`التنبيه الصوتي والنطق`,`Sound and voice alerts`)}</h2><div class="row"><label class="chk ${A.sound?`on`:``}"><input type="checkbox" data-pref="sound"${A.sound?` checked`:``}>${p(`نغمة التنبيه`,`Alert chime`)}</label><label class="chk ${A.voice?`on`:``}"><input type="checkbox" data-pref="voice"${A.voice?` checked`:``}>${p(`النطق الصوتي للإشعار`,`Read notifications aloud`)}</label>${K(`testSnd`,p(`تجربة الصوت`,`Test sound`),{ic:`snd`})}</div><p class="xs mut">${p(`يعمل الصوت بعد أول ضغطة داخل المنصة، ويتبع إعدادات المتصفح والجهاز.`,`Sound works after your first tap in the platform and follows browser and device settings.`)}</p></div>
  <div class="card col" style="border-color:var(--red)"><h2>${p(`بدء التشغيل الفعلي: حذف بيانات التجربة`,`Going live: delete test data`)}</h2><p class="sm mut">${p(`يحذف كل ما أُدخل أثناء التجربة ويُبقي أسماء الطلاب والمعلمين ورموز أولياء الأمور والإعدادات. استخدمه مرة واحدة قبل مشاركة المنصة مع المعلمين.`,`Deletes everything entered while testing and keeps student and teacher names, parent codes and settings. Use it once before sharing the platform with teachers.`)}</p><div class="fg">${En(`wpw`)}<div class="f"><span>&nbsp;</span>${K(`wipe`,p(`حذف كل بيانات التجربة`,`Delete all test data`),{cls:`d`,ic:`trash`})}</div></div></div>`,z.tcodeSet=()=>{let e=String(V(`tcn`)||``).trim();if(!/^\d{4,12}$/.test(e))return Y(`الرمز من 4 إلى 12 رقمًا.`,`The code must be 4 to 12 digits.`);Q(p(`تغيير رمز دخول المعلمين؟ سيُطلب من جميع المعلمين الدخول من جديد بالرمز الجديد.`,`Change the teacher sign-in code? Every teacher will need to sign in again with the new code.`),async()=>{await L(`tcodeSet`,{code:e}),k.f.tcn=``,J(`تم تغيير رمز دخول المعلمين.`,`The teacher sign-in code was changed.`),$()},p(`تغيير`,`Change`))},z.pwChange=async()=>{try{await L(`pwChange`,{old:String(V(`pwo`)),password:String(V(`pwn`))}),k.f.pwo=``,k.f.pwn=``,J(`تم تغيير كلمة المرور.`,`The password was changed.`),$()}catch(e){I(e)}},z.setSave=async()=>{try{await L(`setSave`,{year:V(`cy`,we()),sem:+V(`cs`,Te())}),k.year=null,k.sem=null,J(`تم حفظ الإعدادات.`,`Settings saved.`),$()}catch(e){I(e)}},z.memoDel=()=>{let{sid:e,sj:t}=k.memo,n=on(e,t,j());Q(p(`حذف مذكرة ${v(t)} للطالب ${P(e)} بجميع نسخها نهائيًا؟`,`Permanently delete the ${v(t)} notes for ${P(e)}, with all versions?`),async()=>{await L(`memoDel`,{id:n}),J(`حُذفت المذكرة.`,`Notes deleted.`),It()},p(`حذف`,`Delete`))},z.wipe=()=>{let e=String(V(`wpw`));if(!e)return Y(`اكتب رمز الحماية الصحيح لتأكيد الحذف.`,`Type the correct security code to confirm.`);Q(p(`سيُحذف نهائيًا كل ما أُدخل للتجربة: الجدولات، الاختبارات، المذكرات، طلبات الدعم، متطلبات الطلاب، الأنشطة والمشاركات، الاستبيانات، الإشعارات وسجل الإنجاز. تبقى أسماء الطلاب والمعلمين والإعدادات. لا يمكن التراجع.`,`Everything entered while testing will be permanently deleted: schedules, exams, notes, support requests, student requirements, activities and submissions, surveys, notifications and the achievement log. Student and teacher names and settings are kept. This cannot be undone.`),async()=>{Nt(p(`جارٍ حذف بيانات التجربة…`,`Deleting test data…`),``,null,15e3),await L(`wipe`,{password:e}),k.f.wpw=``,rt=new Set,J(`تم حذف جميع بيانات التجربة. المنصة جاهزة للتشغيل الفعلي.`,`All test data was deleted. The platform is ready for real use.`)},p(`حذف كل بيانات التجربة`,`Delete all test data`))},z.testSnd=()=>{Je(),Ye(2),Xe(p(`هذا اختبار للتنبيه الصوتي في منصة دعم`,`This is a test of the Daam voice alert`))};let Cn={req:[`طلبات الدعم الفوري`,`Instant support requests`],sched:[`جدولات الاختبارات`,`Exam schedules`],exam:[`مراجعة الاختبارات`,`Exam review`],reqs:[`متطلبات الطلاب`,`Student requirements`],memo:[`مذكرات الطلاب`,`Student notes`],parent:[`أولياء الأمور`,`Parents`],admin:[`إدارة البيانات`,`Data management`]},wn={req_status:`req`,req_del:`req`,sched_status:`sched`,exam_status:`exam`,exam_del:`exam`,req_save:`reqs`,req_bulk:`reqs`,memo_approve:`memo`,memo_del:`memo`,mreq_save:`memo`,act_del:`parent`,sub_del:`parent`,act_save:`parent`,act_review:`parent`,survey_save:`parent`,survey_reopen:`parent`,remind:`parent`,stu_save:`admin`,stu_del:`admin`,t_add:`admin`,t_del:`admin`,settings:`admin`,arch_del:`admin`,arch_bulk:`admin`,wipe:`admin`,pw_set:`admin`,pw_change:`admin`,template_set:`admin`,prompt_save:`admin`,tcode:`admin`};function Tn(e){let t=e.p||{},n=t.subject?v(t.subject):``,r=t.grade?y(t.grade,t.section):``,i=t.student?P(t.student):``,a=t.sem?b(t.sem):``;switch(e.type){case`req_status`:return p(`${w(C,t.rt)} للطالب ${i} (طلب ${t.teacher}): ${w(pe,t.status)}`,`${w(C,t.rt)} for ${i} (requested by ${t.teacher}): ${w(pe,t.status)}`)+(t.action?p(` — الإجراء: `,` — Action: `)+t.action:``)+(t.outcome?p(` — النتيجة: `,` — Outcome: `)+t.outcome:``);case`req_del`:return p(`حذف طلب ${w(C,t.rt)} للطالب ${i} (طلب ${t.teacher})`,`Deleted the ${w(C,t.rt)} request for ${i} (requested by ${t.teacher})`);case`sched_status`:return p(`جدولة ${x(t.xt)} في ${n} — ${r} (${t.teacher}): ${w(fe,t.status)}`,`Schedule for ${x(t.xt)} in ${n} — ${r} (${t.teacher}): ${w(fe,t.status)}`);case`exam_status`:return p(`اختبار ${n} — ${a} — ${r} (${t.teacher}): ${w(S,t.status)}`,`${n} exam — ${a} — ${r} (${t.teacher}): ${w(S,t.status)}`)+(t.comment?p(` — الملاحظات: `,` — Comments: `)+t.comment:``);case`exam_del`:return p(`حذف اختبار ${n} — ${a} — ${r} (${t.teacher})`,`Deleted the ${n} exam — ${a} — ${r} (${t.teacher})`);case`req_save`:return p(`تحديد متطلبات الطالب ${i} — ${a} ${t.year}: ${t.n} اختبارات مطلوبة`,`Set requirements for ${i} — ${a} ${t.year}: ${t.n} exams required`);case`req_bulk`:return t.what===`teachers_clear`?p(`إلغاء إسناد المعلمين من الجدول المدرسي: يرفع كل معلم اختبارات طلابه بنفسه`,`Cleared the teachers assigned from the timetable: each teacher uploads their own students’ exams`):t.what===`teachers`?p(`تحديد المعلم المسؤول عن كل اختبار مطلوب من الجدول المدرسي (الصفوف 1–10)`,`Set the responsible teacher for each required exam from the school timetable (grades 1–10)`):p(`تحديد الاختبارات المطلوبة لطلاب الصفوف 1–10 (الفصول الثلاثة) — ${t.year}: ${t.n} اختبارًا مطلوبًا`,`Set required exams for grades 1–10 (all three semesters) — ${t.year}: ${t.n} exams required`);case`memo_approve`:return t.on?p(`اعتماد مذكرة ${n} للطالب ${i} وإتاحتها لولي الأمر`,`Approved ${n} notes for ${i} and shared them with the parent`):p(`إلغاء اعتماد مذكرة ${n} للطالب ${i}`,`Withdrew approval of ${n} notes for ${i}`);case`mreq_save`:return p(`تحديد المذكرات المطلوبة للطلاب — ${t.year}: ${t.n} مذكرة مطلوبة`,`Set required notes for students — ${t.year}: ${t.n} notes required`);case`memo_del`:return p(`حذف مذكرة ${n} للطالب ${i}`,`Deleted ${n} notes for ${i}`);case`act_del`:return p(`حذف نشاط أسري: `,`Deleted family activity: `)+t.title;case`sub_del`:return p(`حذف مشاركة ولي أمر الطالب ${i} في نشاط «${t.title}»`,`Deleted the submission from the parent of ${i} for “${t.title}”`);case`act_save`:return(t.edit?p(`تعديل نشاط أسري: `,`Edited family activity: `):p(`إضافة نشاط أسري: `,`Added family activity: `))+t.title+` — `+a;case`act_review`:return(t.status===`approved`?p(`اعتماد مشاركة ولي أمر الطالب `,`Approved the submission from the parent of `):p(`طلب استكمال من ولي أمر الطالب `,`Asked for completion from the parent of `))+i+p(` في نشاط «`,` for “`)+t.title+p(`»`,`”`);case`survey_save`:return p(`إعداد أو تحديث استبيان الرضا — ${a}`,`Prepared or updated the satisfaction survey — ${a}`);case`survey_reopen`:return p(`إعادة فتح الاستبيان لولي أمر الطالب ${i}`,`Reopened the survey for the parent of ${i}`);case`remind`:return p(`إرسال تذكير لولي أمر الطالب ${i}`,`Sent a reminder to the parent of ${i}`);case`stu_save`:return p(`إضافة أو تعديل بيانات الطالب `,`Added or edited student `)+t.name;case`stu_del`:return p(`حذف الطالب من القوائم: `,`Removed student from lists: `)+t.name;case`t_add`:return p(`إضافة معلم: `,`Added teacher: `)+t.name;case`t_del`:return p(`حذف معلم من القائمة: `,`Removed teacher from the list: `)+t.name;case`arch_del`:return t.kind===`exam`?p(`حذف نهائي من الأرشيف: اختبار ${n} — ${a} — ${r} (${t.teacher}) — ${t.year}`,`Permanently deleted from the archive: ${n} exam — ${a} — ${r} (${t.teacher}) — ${t.year}`):p(`حذف نهائي من الأرشيف: جدولة ${x(t.xt)} في ${n} — ${r} (${t.teacher}) بتاريخ ${h(t.date)}`,`Permanently deleted from the archive: ${x(t.xt)} schedule in ${n} — ${r} (${t.teacher}) on ${h(t.date)}`);case`arch_bulk`:return p(`حذف نتائج الأرشيف المعروضة: ${t.exams} اختبار و${t.schedules} جدولة`,`Deleted the archive results shown: ${t.exams} exam(s) and ${t.schedules} schedule(s)`);case`template_set`:return p(`تحديث ${An(t.key)}: ${t.name}`,`Updated the ${An(t.key)}: ${t.name}`);case`pw_set`:return p(`تحديد كلمة مرور معلمي التربية الخاصة`,`Set the special education password`);case`pw_change`:return p(`تغيير كلمة مرور معلمي التربية الخاصة`,`Changed the special education password`);case`wipe`:return p(`حذف بيانات التجربة قبل التشغيل الفعلي`,`Deleted the test data before going live`);case`prompt_save`:return t.reset?p(`استعادة الأمر الأصلي لـ«أمر متطلبات منصة دعم»`,`Restored the original Daam requirements prompt`):p(`تحديث «أمر متطلبات منصة دعم» ونشره للمعلمين`,`Updated the Daam requirements prompt for teachers`);case`tcode`:return p(`تغيير رمز دخول معلمي التعليم العام`,`Changed the general education teacher sign-in code`);case`settings`:return p(`تحديث العام والفصل الحالي: ${t.year} — ${b(t.sem)}`,`Updated current year and semester: ${t.year} — ${b(t.sem)}`)}return e.type}let En=e=>U(p(`رمز الحماية للتأكيد`,`Security code to confirm`),`<input type="password" class="ltr" data-f="${e}" autocomplete="off" value="${m(V(e))}">`),Dn=()=>`<div class="row">${s?``:K(`repPrint`,p(`طباعة`,`Print`),{ic:`print`})}${K(`repXlsx`,p(`تنزيل Excel`,`Download Excel`),{ic:`dl`})}${K(`repPdf`,p(`تنزيل PDF`,`Download PDF`),{cls:`p`,ic:`dl`})}</div>`;Ht.t.push([`report`,`chart`,`تقريري`,`My Report`]);let On=[{key:`iep`,ic:`form`,ar:`قالب الخطة التربوية الفردية`,en:`Individual Education Plan (IEP) template`,dAr:`يكتب فيه المعلم الخطة التربوية الفردية للطالب.`,dEn:`The teacher writes the student's individual education plan in this template.`,fmt:`Word`},{key:`exam`,ic:`file`,ar:`قالب الاختبار المعتمد`,en:`Approved exam template`,dAr:`القالب الرسمي لاختبار نهاية الفصل لطلبة أصحاب الهمم؛ يُستخدم كما هو دون تغيير تصميمه.`,dEn:`The official end-of-semester exam template for Students of Determination; use it as it is, without changing its design.`,fmt:`PowerPoint`}],kn=[`docx`,`pptx`,`xlsx`,`pdf`],An=e=>{let t=On.find(t=>t.key===e);return t?p(t.ar,t.en):e},jn=e=>D.templates.get(e),Mn=e=>`<p class="xs mut">${m(e.file.name)} — ${ie(e.file.size)} — ${p(`آخر تحديث: `,`Last updated: `)}${h(e.at)}${e.by?` — `+m(e.by):``}</p>`;Ht.t.push([`templates`,`file`,`القوالب المعتمدة`,`Approved Templates`]),B.t.templates=()=>`${q(`القوالب المعتمدة`,`Approved Templates`,p(`نزّل القالب وعدّل عليه في Word أو PowerPoint كما هو، دون تغيير تصميمه. يحدّث معلم التربية الخاصة هذه القوالب عند الحاجة، فنزّل أحدث نسخة في كل مرة.`,`Download the template and edit it in Word or PowerPoint as it is, without changing its design. The special education teacher updates these templates when needed, so download the latest version each time.`))}
  <div class="sgrid">${On.map(e=>{let t=jn(e.key);return`<div class="card col" style="gap:8px"><div class="row sp"><h3>${E(e.ic)} ${m(p(e.ar,e.en))}</h3><span class="bd c-blue">${e.fmt}</span></div><p class="sm">${m(p(e.dAr,e.dEn))}</p>${t?Mn(t)+`<div class="row">${K(`tplDl`,p(`تنزيل القالب`,`Download template`),{cls:`p`,ic:`dl`,d:{k:e.key}})}</div>`:`<p class="sm mut">${p(`لم يرفع معلم التربية الخاصة هذا القالب بعد.`,`The special education teacher has not uploaded this template yet.`)}</p>`}</div>`}).join(``)}</div>`,z.tplDl=async e=>{let t=jn(e.k);if(t){Nt(p(`جارٍ تجهيز الملف…`,`Preparing the file…`));try{await Ue(t.file.name,await He(t.file))}catch(e){I(e)}}};let Nn=()=>`<div class="card col"><h2>${p(`القوالب المعتمدة لمعلمي التعليم العام`,`Approved templates for general education teachers`)}</h2><p class="sm mut">${p(`ما ترفعه هنا يظهر فورًا لجميع المعلمين في «القوالب المعتمدة» ويحل محل النسخة السابقة. الصيغ المسموحة: Word وPowerPoint وExcel وPDF حتى 20 ميجابايت.`,`What you upload here appears at once for every teacher under “Approved Templates” and replaces the previous version. Allowed formats: Word, PowerPoint, Excel and PDF, up to 20 MB.`)}</p>
  ${On.map(e=>{let t=jn(e.key);return`<div class="card col" style="gap:8px;padding:14px"><h3>${m(p(e.ar,e.en))}</h3>${t?Mn(t)+`<div class="row">${K(`tplDl`,p(`تنزيل النسخة الحالية`,`Download current version`),{cls:`s`,ic:`dl`,d:{k:e.key}})}</div>`:`<p class="sm mut">${p(`لم يُرفع بعد.`,`Not uploaded yet.`)}</p>`}${Dt(`tpl_`+e.key,`.docx,.pptx,.xlsx,.pdf`,p(`اختر ملف القالب الجديد`,`Choose the new template file`))}<div class="row">${K(`tplUp`,k.tplBusy===e.key?p(`جارٍ الرفع…`,`Uploading…`):t?p(`استبدال القالب`,`Replace template`):p(`رفع القالب`,`Upload template`),{cls:`p`,ic:`up`,d:{k:e.key},dis:!!k.tplBusy})}</div></div>`}).join(``)}</div>`;z.tplUp=async e=>{let t=k.files[`tpl_`+e.k];if(!t)return Y(`اختر ملف القالب أولًا.`,`Choose the template file first.`);k.tplBusy=e.k,$();try{let n=await Ve(t,kn,`template`);await L(`templateSet`,{key:e.k,fileId:n}),k.files[`tpl_`+e.k]=null,J(`تم نشر القالب للمعلمين.`,`The template is now published for teachers.`)}catch(e){I(e)}k.tplBusy=null,$()},Ht.t.push([`prompt`,`copy`,`أمر متطلبات منصة دعم`,`Daam Requirements Prompt`]);let Pn=()=>k.plang||f,Fn=()=>D.prompt&&D.prompt.get(`prompt`)||null,In=e=>{let t=Fn();return t&&t[e]||(e===`ar`?`# أمر متطلبات منصة دعم
## إعداد المذكرة التعليمية واختبار نهاية الفصل الدراسي لطلبة أصحاب الهمم

أنت متخصص في التربية الخاصة، وإعداد المناهج التعليمية، وتصميم المذكرات والاختبارات المدرسية لطلبة أصحاب الهمم، وفق المناهج والموجهات المعتمدة من وزارة التربية والتعليم في دولة الإمارات العربية المتحدة.

سأرفق لك 3 ملفات أساسية:

1. **الخطة التعليمية للفصل الدراسي:** وتتضمن الأهداف والمهارات والموضوعات المطلوب تدريسها وقياسها.
2. **كتاب المادة الدراسية:** وهو المرجع العلمي الأساسي لإعداد المحتوى والأسئلة.
3. **قالب الاختبار المعتمد:** وهو قالب رسمي بصيغة PowerPoint، ويجب استخدامه كما هو دون تغيير تصميمه أو تنسيقه.

مهمتك هي دراسة الملفات الثلاثة بعناية، ثم إعداد مذكرة تعليمية واختبار نهاية الفصل الدراسي وتدريبات تحاكي الاختبار، مع الالتزام الكامل بالتعليمات التالية.

---

# أولاً: دراسة وتحليل المرفقات

قبل البدء في إعداد الملفات:

1. اقرأ الخطة التعليمية وحدد جميع الأهداف والمهارات والموضوعات المقررة.
2. راجع كتاب المادة وحدد الدروس والمعلومات المرتبطة بكل هدف.
3. تعرف على الصف الدراسي والحلقة الدراسية والمادة من الملفات المرفقة.
4. راجع قالب الاختبار المعتمد وافهم طريقة تنظيمه وتوزيع أقسامه ودرجاته.
5. تأكد من توافق الأهداف الموجودة في الخطة مع المحتوى الموجود في الكتاب.
6. لا تضف أي أهداف أو موضوعات غير واردة في الخطة التعليمية.

إذا وجدت نقصاً أو تعارضاً بين الملفات، أو تعذر تحديد الحلقة الدراسية، أو لم تتوفر لديك الموجهات الرسمية اللازمة، اطلب التوضيح قبل البدء ولا تفترض معلومات من عندك.

# ثانياً: الالتزام بالموجهات العامة لاختبارات أصحاب الهمم

يجب الالتزام بالموجهات العامة المعتمدة لاختبارات أصحاب الهمم، ومراعاة الفروق الفردية ومستويات الطلبة، مع الالتزام بالتقسيم التالي:

## الحلقة الأولى: الصفوف من 1 إلى 4

- إجمالي عدد الأسئلة: 15 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 3 بدائل فقط.
  2. التوصيل.

## الحلقة الثانية: الصفوف من 5 إلى 8

- إجمالي عدد الأسئلة: 20 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 4 بدائل.
  2. التوصيل.
  3. ملء الفراغ.

## الحلقة الثالثة: الصفوف من 9 إلى 12

- إجمالي عدد الأسئلة: 20 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 4 بدائل.
  2. إجابة قصيرة.

## شرط نسبة الاختيار من متعدد لجميع الحلقات

يجب أن تمثل أسئلة الاختيار من متعدد نسبة 75% من إجمالي درجات الاختبار لجميع الحلقات.

بناءً على ذلك:

- 75 درجة من أصل 100 تخصص لأسئلة الاختيار من متعدد.
- 25 درجة من أصل 100 تخصص لبقية أنواع الأسئلة المقررة للحلقة.

لا يجوز استبدال أنواع الأسئلة المحددة لكل حلقة بأنواع أخرى.

يجب مراعاة أن يكون عدد الأسئلة وأنواعها متوافقاً مع الحلقة الدراسية، وأن تكون الأسئلة المتبقية موزعة بطريقة مناسبة وعادلة.

# ثالثاً: ضوابط صياغة أسئلة الاختبار

التزم بالضوابط التالية:

1. أن تكون جميع الأسئلة مرتبطة بالأهداف التعليمية الواردة في الخطة.
2. أن تكون المعلومات مستمدة من كتاب المادة.
3. أن تتناسب صياغة الأسئلة مع المستوى الفعلي للطلبة المستهدفين.
4. استخدام عبارات قصيرة وواضحة ومباشرة.
5. تجنب الصياغات المعقدة والأسئلة التي تحتمل أكثر من إجابة.
6. تجنب الأسئلة التي تتضمن أكثر من مهارة في الوقت نفسه دون ضرورة.
7. مراعاة التدرج المناسب في مستوى الصعوبة.
8. عدم استخدام معلومات خارج نطاق المحتوى المقرر.
9. تجنب تكرار السؤال نفسه بصيغ مختلفة.
10. التأكد من وجود إجابة صحيحة وواضحة لكل سؤال.
11. استخدام صور أو رموز توضيحية عند الحاجة، بشرط أن تكون مرتبطة بالهدف التعليمي ولا تكشف الإجابة.
12. مراعاة وضوح الصور وحجم الخط وسهولة قراءة الاختبار.

# رابعاً: توزيع الدرجات

جميع الاختبارات في الحلقات الثلاث يجب أن تكون من 100 درجة بالضبط.

يجب توزيع الدرجات وفق النسب التالية:

| نوع الأسئلة | الدرجة |
|---|---:|
| اختيار من متعدد | 75 |
| الأنواع الأخرى المقررة للحلقة | 25 |
| الإجمالي | 100 |

التعليمات الإلزامية:

1. وزع درجات كل سؤال بصورة عادلة ومنطقية حسب عدد المفردات ومستوى الصعوبة.
2. حدد درجة كل سؤال بشكل واضح.
3. في أسئلة التوصيل، حدد درجة كل مفردة على حدة، وليس درجة السؤال الإجمالية فقط.
4. في أسئلة ملء الفراغ، حدد درجة كل فراغ.
5. في أسئلة الإجابة القصيرة، حدد الدرجة المخصصة للإجابة وعناصر الإجابة التي تستحق الدرجة.
6. اجعل مجموع درجات جميع الأسئلة والمفردات يساوي 100 بالضبط.
7. لا تترك أي سؤال أو مفردة دون تحديد درجتها.
8. أظهر الدرجة بجوار السؤال أو المفردة بطريقة واضحة للطالب والمعلم.
9. أضف في نهاية الاختبار خانة واضحة للمجموع النهائي: 100 درجة.
10. أجرِ مراجعة حسابية نهائية للتأكد من صحة توزيع الدرجات قبل تسليم الاختبار.

يجب ألا يكون توزيع الدرجات شكلياً، بل يجب أن يتناسب مع عدد المفردات المطلوبة للإجابة عنها.

# خامساً: استخدام الأرقام الإنجليزية

هذا شرط إلزامي في جميع الاختبارات دون استثناء.

استخدم الأرقام الإنجليزية فقط:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9

يُمنع استخدام الأرقام الهندية أو العربية في الاختبار.

يشمل ذلك:

- أرقام الأسئلة.
- أرقام البدائل.
- أرقام الصفحات.
- الدرجات.
- التواريخ.
- الأعداد داخل نصوص الأسئلة.
- أي أرقام أخرى تظهر في صفحات الاختبار.

يجب أن تكون جميع الأرقام المستخدمة داخل الاختبار باللغة الإنجليزية.

# سادساً: إعداد المذكرة التعليمية

أنشئ مذكرة تعليمية متكاملة بناءً على الخطة التعليمية وكتاب المادة.

يجب أن تتضمن:

1. عنوان المذكرة واسم المادة والصف والفصل الدراسي.
2. تقسيم المحتوى إلى وحدات ودروس وفق الخطة.
3. شرحاً مبسطاً لكل موضوع.
4. توضيح المفاهيم والمعلومات الأساسية.
5. أمثلة تطبيقية مناسبة.
6. تدريبات متنوعة بعد الدروس.
7. أسئلة مراجعة تساعد على تثبيت المعلومات.
8. إبراز المهارات التي سيقيسها اختبار نهاية الفصل.

ضوابط المذكرة:

- تغطي جميع الأهداف التعليمية دون إغفال أي هدف.
- تستخدم لغة واضحة ومناسبة للطلبة.
- تراعي خصائص الطلبة من أصحاب الهمم والفروق الفردية.
- لا تتضمن معلومات علمية غير صحيحة.
- لا تتضمن موضوعات خارج الخطة.
- تكون منظمة وجذابة وسهلة القراءة والطباعة.
- تستخدم صوراً ورسومات توضيحية مناسبة عند الحاجة.

# سادساً مكرر: وضوح الخط وسهولة القراءة وتقليل حجم الملفات

هذه التعليمات إلزامية ويجب تطبيقها على المذكرة التعليمية والاختبار والتدريبات وجميع الملفات الناتجة.

## أولاً: وضوح الخط وحجمه

يجب تصميم جميع الملفات بما يضمن سهولة القراءة لطلبة أصحاب الهمم، مع مراعاة الفروق الفردية وصعوبات التعلم وضعف البصر.

### في المذكرة التعليمية (Word):

- استخدام خط عربي واضح وسهل القراءة.
- حجم خط المتن لا يقل عن 18 نقطة، ويفضل 20 نقطة عند ملاءمة مساحة الصفحة.
- العناوين الرئيسية بحجم 24–28 نقطة.
- العناوين الفرعية بحجم 20–22 نقطة.
- استخدام تباعد مناسب بين الأسطر والفقرات.
- ترك مساحات بيضاء كافية بين الشروحات والتدريبات.
- عدم تكديس المعلومات أو وضع نصوص كثيرة في الصفحة الواحدة.
- إبراز الكلمات والمفاهيم المهمة بطريقة واضحة.
- التأكد من وضوح النص عند الطباعة بالأبيض والأسود أيضاً.

### في اختبار نهاية الفصل (PowerPoint):

- إعطاء الأولوية القصوى لوضوح الأسئلة أمام الطالب.
- نوع الخط: Arial أو Tahoma للنص العربي (أو Dubai إذا كان مستخدماً في القالب ومتوفراً)، وArial أو Calibri للنص الإنجليزي، مع استخدام خط واحد في الاختبار كله.
- حجم نص السؤال 24 نقطة على الورقة المطبوعة.
- حجم بدائل الاختيار من متعدد 22 نقطة على الورقة المطبوعة.
- يجب أن تكون هذه الأحجام هي الأحجام الفعلية بعد الطباعة، وليست مجرد الأحجام المكتوبة داخل PowerPoint (انظر بند «حجم الشريحة» أدناه).
- جعل الأرقام والرموز والدرجات واضحة وسهلة التمييز.
- عدم تصغير الخط بهدف احتواء عدد أكبر من الأسئلة في الشريحة.
- إذا لم تتسع الشريحة للأسئلة بالخط المناسب، أضف شرائح جديدة مع المحافظة على التصميم الأصلي للقالب.
- تجنب تداخل النصوص أو تقارب الأسطر أو ازدحام الصور والاختيارات.
- اجعل مساحة الإجابة مناسبة لحجم كتابة الطالب.
- اترك مسافات كافية بين الاختيارات حتى يستطيع الطالب قراءتها وتحديد الإجابة بسهولة.

### حجم الشريحة حتى لا يصغر الخط عند الطباعة:

عند طباعة الشريحة على ورقة A4 يكبّر PowerPoint الشريحة أو يصغّرها لتملأ الورقة، فيتغير حجم الخط الفعلي على الورق. لذلك:

1. قبل إدخال الأسئلة، افتح «تصميم ← حجم الشريحة» في القالب، وسجّل مقاس الشريحة.
2. لا تغيّر مقاس شرائح القالب، لأن ذلك يشوّه تصميمه المعتمد.
3. احسب حجم الخط داخل PowerPoint بحيث يبقى على الورق 24 نقطة للسؤال و22 نقطة للبدائل:

| مقاس شريحة القالب | السؤال داخل PowerPoint | البدائل داخل PowerPoint |
|---|---:|---:|
| A4 رأسي 21 × 29.7 سم (مقاس قالب الاختبار المعتمد للمدرسة) | 25 | 23 |
| A4 أفقي أو 4:3 (عرض الشريحة 27.5 سم أو أقل) | 24 | 22 |
| عريض 16:9 (عرض الشريحة 33.867 سم) | 29 | 26 |
| مقاس آخر | 24 ÷ (عرض الطباعة 28.7 سم ÷ عرض الشريحة)، مقرّباً للأعلى | 22 ÷ (عرض الطباعة 28.7 سم ÷ عرض الشريحة)، مقرّباً للأعلى |

4. إذا كانت الشريحة رأسية (Portrait)، استخدم عرض الطباعة 20 سم بدل 28.7 سم في الحساب (الورقة A4 بعد هوامش الطابعة).
5. لا تستخدم أي حجم أصغر من الجدول، وإذا لم تتسع الشريحة أضف شرائح جديدة.
6. في قالب المدرسة المعتمد: نصوص «س ( ): اكتب السؤال هنا» مكتوبة بخط Arial حجم 16، وهي أماكن للأسئلة وليست عناصر ثابتة. اكتب الأسئلة بخط Arial بالأحجام أعلاه (25 للسؤال و23 للبدائل)، ولا تُبقِ حجم 16. العناوين الثابتة في القالب (مثل «الجزء: الموضوعي» و«لكل مفردة … درجات» وبيانات الغلاف) تبقى بخطها وحجمها كما هي، مع تعديل قيمها لتطابق الاختبار.
7. القالب يتسع لثلاثة أسئلة في الشريحة بحجم 16؛ بالأحجام المطلوبة ضع سؤالاً أو سؤالين في الشريحة، وأضف شرائح بنفس التصميم حتى تكتمل الأسئلة.
8. اذكر في نهاية عملك مقاس شريحة القالب وأحجام الخط التي استخدمتها.
9. ذكّر المعلم بطباعة الاختبار بخيار «شرائح بملء الصفحة» مع تفعيل «ملاءمة للورق»، ودون طباعة عدة شرائح في الورقة الواحدة، لأن ذلك يصغّر الخط.

### ملاحظة مهمة بشأن القالب المعتمد:

إذا كان قالب PowerPoint الأصلي يحتوي على خطوط صغيرة، حافظ على الهوية والتصميم العام للقالب، مع تحسين حجم النصوص المضافة بما يسمح بقراءتها بوضوح، دون تغيير العناصر الثابتة المعتمدة.

لا تجعل الالتزام بعدد الشرائح سبباً في تصغير الخط أو التضحية بسهولة القراءة.

الأولوية هي أن يتمكن الطالب من قراءة السؤال والاختيارات بوضوح دون إجهاد بصري.

## ثانياً: تقليل حجم الملفات دون التأثير على الجودة

يجب أن تكون الملفات النهائية صغيرة الحجم قدر الإمكان حتى يسهل على المعلمين رفعها على منصة دعم وتنزيلها ومشاركتها.

التزم بالتالي:

1. ضغط الصور والرسومات داخل ملفات Word وPowerPoint.
2. استخدام صور محسّنة الحجم والدقة دون فقدان وضوح التفاصيل المهمة.
3. تجنب الصور الضخمة أو غير الضرورية.
4. عدم إدراج الصور بصيغ أو دقة مرتفعة دون حاجة.
5. إزالة العناصر المخفية والبيانات غير الضرورية التي تزيد حجم الملف.
6. استخدام إعدادات ضغط الوسائط المناسبة داخل Office.
7. عدم تحويل الصفحات أو الشرائح بالكامل إلى صور؛ يجب أن تظل النصوص قابلة للتحديد والتعديل.
8. الحفاظ على جودة الطباعة ووضوح النصوص والصور.
9. تجنب تكرار الصور نفسها داخل الملف بأحجام غير ضرورية.
10. اختيار الصيغ المناسبة التي تحقق التوازن بين الجودة وصغر الحجم.

## ثالثاً: فحص الملفات قبل التسليم

قبل تسليم الملفات النهائية:

- تأكد من أن حجم كل ملف مناسب للرفع على منصة دعم.
- حاول تقليل حجم الملفات قدر الإمكان دون التأثير على وضوحها.
- افتح الملفات وتحقق من أن الخطوط واضحة عند العرض والطباعة.
- تأكد من أن الصور والرسومات ما زالت واضحة بعد الضغط.
- تأكد من عدم حدوث أي تشوه في التنسيق نتيجة تقليل حجم الملفات.
- تأكد من أن الملفات تفتح بصورة طبيعية على برامج Microsoft Office.

**الأولوية الأساسية: وضوح المحتوى للطالب أولاً، ثم تقليل حجم الملف دون التضحية بجودة القراءة والطباعة.**

# سابعاً: إضافة تدريب على اختبار نهاية الفصل في نهاية المذكرة

في نهاية المذكرة، أضف قسماً مستقلاً بعنوان:

**تدريب على اختبار نهاية الفصل الدراسي**

يجب أن يكون هذا القسم بمثابة محاكاة تدريبية للاختبار الفعلي.

الشروط:

1. أن يحاكي أنواع الأسئلة المقررة للحلقة الدراسية.
2. أن يتضمن تدريبات على جميع المهارات التي يقيسها الاختبار.
3. أن يتناسب مع مستوى الطالب.
4. أن يحتوي على أسئلة متنوعة وليست منسوخة حرفياً من الاختبار.
5. أن تكون أسئلته مشابهة للاختبار من حيث طريقة الصياغة ومستوى الصعوبة.
6. أن يساعد الطالب على فهم طريقة الإجابة والاستعداد للاختبار الفعلي.
7. أن يتضمن تدريباً كافياً على الاختيار من متعدد والأنواع الأخرى المقررة للحلقة.

# ثامناً: الحفاظ على قالب الاختبار المعتمد بصيغة PowerPoint

هذه من أهم التعليمات في المهمة.

قالب الاختبار الذي سأرفقه لك هو ملف PowerPoint معتمد من المدرسة.

يجب العمل على نسخة من ملف PowerPoint الأصلي نفسه، وإدراج الأسئلة والمحتوى داخله.

**ممنوع تماماً تغيير القالب أو إعادة تصميمه.**

يجب الحفاظ على جميع العناصر التالية:

- تصميم الشرائح الأصلي.
- ألوان القالب.
- الخطوط وأحجامها الأصلية للعناصر الثابتة.
- الشعارات والهوية المؤسسية.
- الترويسة والتذييل.
- الجداول والخلايا والحدود.
- الهوامش والمحاذاة.
- خلفيات الشرائح.
- ترتيب الشرائح والأقسام.
- توزيع العناصر داخل كل شريحة.
- أي تعليمات أو بيانات ثابتة موجودة بالقالب.

المطلوب هو تعبئة القالب بالأسئلة والبيانات المطلوبة فقط.

## البيانات المتغيرة في القالب التي يجب تعديلها لتطابق الاختبار

قالب المدرسة يحتوي على بيانات مكتوبة مسبقاً كمثال، ويجب تعديل قيمها (دون تغيير خطها أو حجمها أو مكانها):

1. **الفصل الدراسي في الغلاف:** اكتب الفصل الصحيح (الأول أو الثاني أو الثالث) كما هو في الخطة التعليمية المرفقة. إذا لم يكن الفصل واضحاً في الملفات، اسأل المعلم قبل إعداد الاختبار ولا تُبقِ القيمة المكتوبة في القالب.
2. **العام الدراسي:** 2026-2027.
3. **بيانات الغلاف الأخرى:** المادة والصف، وتبقى خانات اسم الطالب ورقمه فارغة ليكتبها الطالب.
4. **جدول الدرجات في الغلاف:** الجزء الموضوعي (الاختيار من متعدد) = 75، والجزء المقالي (الأنواع الأخرى المقررة للحلقة) = 25، والمجموع = 100.
5. **عنوان الجزء في كل شريحة:** «الجزء: الموضوعي» لشرائح الاختيار من متعدد، و«الجزء: المقالي» لشرائح الأنواع الأخرى.
6. **عبارة «لكل مفردة … درجات» في كل شريحة:** اكتب الدرجة الصحيحة لأسئلة تلك الشريحة وفق توزيعك. القيمة الموجودة في القالب (5 درجات) مثال فقط، ولا تصلح دائماً؛ فمثلاً في الحلقة الأولى 15 سؤالاً × 5 = 75 فقط. إذا اختلفت درجات الأسئلة داخل الشريحة الواحدة، اكتب درجة كل سؤال بجواره.
7. تحقق في النهاية من أن مجموع درجات الأسئلة يساوي 75 للجزء الموضوعي و25 للجزء المقالي، وأن ذلك مطابق لجدول الدرجات في الغلاف ولنموذج الإجابة.

لا تنشئ اختباراً جديداً بتصميم مختلف، ولا تحول القالب إلى Word أو PDF باعتباره الملف الأصلي المطلوب.

إذا لم تكن المساحة المتاحة في القالب كافية لعرض الأسئلة بوضوح، أضف شرائح جديدة باستخدام التصميم والتنسيق الأصليين للقالب، ولا تحذف أو تختصر محتوى الأسئلة ولا تصغر الخط بصورة تضر بوضوح القراءة.

إذا كان القالب غير قابل للتحرير أو ظهرت مشكلة تقنية تمنع الحفاظ على تنسيقه، أخبرني بالمشكلة قبل إجراء أي تغيير على التصميم.

# تاسعاً: إعداد نموذج الإجابة

أنشئ نموذج إجابة منفصلاً خاصاً بالمعلم، يتضمن:

1. الإجابة الصحيحة لكل سؤال.
2. الإجابات الصحيحة لكل مفردة في أسئلة التوصيل.
3. الإجابة المطلوبة لكل فراغ.
4. عناصر الإجابة المقبولة في الأسئلة القصيرة.
5. الدرجة المخصصة لكل سؤال ومفردة.
6. جدولاً نهائياً لتوزيع الدرجات ومراجعة مجموعها.

يجب أن يكون نموذج الإجابة متطابقاً تماماً مع الاختبار من حيث أرقام الأسئلة وترتيبها.

لا تضع نموذج الإجابة داخل نسخة الاختبار المخصصة للطالب.

# عاشراً: المراجعة النهائية وضمان الجودة

قبل تسليم الملفات، نفذ مراجعة شاملة تتضمن:

## مراجعة المذكرة:

- مطابقة المذكرة للخطة التعليمية.
- تغطية جميع الأهداف.
- صحة المعلومات.
- ملاءمة الشرح لمستوى الطلبة.
- وجود تدريب على الاختبار في النهاية.
- وضوح الخط وحجمه.
- سهولة القراءة والطباعة.
- مناسبة حجم الملف للرفع على المنصة.

## مراجعة الاختبار:

- الالتزام بعدد الأسئلة المحدد للحلقة.
- الالتزام بأنواع الأسئلة المحددة.
- الالتزام بنسبة 75% من الدرجات للاختيار من متعدد.
- صحة توزيع الدرجات من أصل 100.
- وضوح درجة كل سؤال وكل مفردة.
- استخدام الأرقام الإنجليزية فقط.
- صحة الإجابات.
- وضوح الخط والصور والأسئلة.
- عدم ازدحام الشرائح.
- عدم وجود نصوص مقطوعة أو متداخلة.
- التأكد من أن الطالب يستطيع قراءة الأسئلة والاختيارات بسهولة.

## مراجعة قالب PowerPoint:

- مقارنة النسخة النهائية بالقالب الأصلي.
- التأكد من عدم تغيير تصميم القالب.
- التأكد من عدم حذف أي عنصر ثابت.
- التأكد من ظهور جميع الأسئلة بشكل صحيح.
- التأكد من عدم وجود نصوص مقطوعة أو متداخلة.
- التأكد من أن الملف قابل للتعديل والعرض والطباعة.

## مراجعة حجم الملفات:

- التأكد من ضغط الصور والوسائط بصورة مناسبة.
- التأكد من أن حجم الملفات صغير قدر الإمكان.
- التأكد من عدم تأثر جودة النصوص والصور.
- التأكد من إمكانية فتح الملفات وتنزيلها ورفعها على منصة دعم.

# الحادي عشر: الملفات النهائية المطلوبة

أريد تسليم 3 ملفات منفصلة:

## الملف الأول: المذكرة التعليمية

- بصيغة Word قابلة للتعديل.
- تشمل جميع الموضوعات والأهداف.
- تتضمن التدريبات والأنشطة.
- تتضمن في نهايتها تدريباً على اختبار نهاية الفصل.
- بخط عربي واضح وكبير ومناسب لطلبة أصحاب الهمم.
- بحجم ملف صغير ومناسب للرفع على منصة دعم.

## الملف الثاني: اختبار نهاية الفصل الدراسي

- بصيغة PowerPoint قابلة للتعديل.
- باستخدام قالب الاختبار الأصلي المرفق.
- مع الحفاظ الكامل على تصميم القالب وتنسيقه.
- متوافق مع الموجهات العامة لاختبارات أصحاب الهمم.
- مجموع درجاته 100 درجة.
- بخط كبير وواضح ومريح للقراءة.
- مع إضافة شرائح عند الحاجة بدلاً من تصغير الخط.
- السؤال 24 نقطة والبدائل 22 نقطة على الورقة المطبوعة، وفق جدول «حجم الشريحة».
- بحجم ملف صغير دون التأثير على جودة العرض والطباعة.

## الملف الثالث: نموذج الإجابة

- ملف منفصل خاص بالمعلم.
- يتضمن الإجابات وتوزيع الدرجات التفصيلي.
- متطابق مع نسخة الاختبار النهائية.
- منظم وواضح وسهل الاستخدام.
- بحجم ملف صغير ومناسب للرفع والمشاركة.

# الثاني عشر: تعليمات ختامية إلزامية

- لا تبدأ العمل قبل دراسة الملفات الثلاثة.
- لا تخترع أهدافاً أو معلومات غير موجودة في المصادر.
- لا تتجاهل أي هدف وارد في الخطة.
- لا تغير قالب الاختبار المعتمد.
- لا تتجاوز عدد الأسئلة المحدد للحلقة.
- لا تتجاوز أو تقل عن مجموع 100 درجة.
- لا تغير نسبة 75% المخصصة للاختيار من متعدد.
- لا تستخدم الأرقام الهندية أو العربية داخل الاختبار.
- لا تكتفِ بإعداد محتوى نصي؛ المطلوب ملفات فعلية قابلة للتعديل والتسليم.
- راجع الملفات بعد إنشائها وتأكد من سلامتها وجودتها.
- اجعل وضوح الخط وسهولة القراءة أولوية أساسية في جميع الملفات.
- لا تصغر الخط لاستيعاب المحتوى، بل أضف صفحات أو شرائح عند الحاجة.
- قلل حجم الملفات باستخدام ضغط الصور والوسائط دون التأثير على جودة المحتوى.
- تأكد من أن جميع الملفات النهائية مناسبة للرفع على منصة دعم.

**الهدف النهائي:** إنتاج مذكرة تعليمية واختبار نهاية فصل دراسي متكاملين، متوافقين مع الخطة التعليمية وكتاب المادة والموجهات العامة لاختبارات أصحاب الهمم، مع المحافظة التامة على قالب الاختبار الرسمي المعتمد من المدرسة، وتوفير تجربة قراءة مريحة وواضحة للطالب، مع الحفاظ على أحجام ملفات صغيرة تسهل مشاركتها ورفعها على منصة دعم.
`:`# Daam Platform Requirements Prompt
## Preparing the study notes and the end-of-semester exam for students of determination (students with special needs)

You are a specialist in special education, curriculum development, and the design of school study notes and exams for students of determination, following the curricula and guidelines approved by the Ministry of Education of the United Arab Emirates.

I will attach 3 core files:

1. **The semester teaching plan:** it contains the objectives, skills and topics to be taught and assessed.
2. **The subject textbook:** the main academic reference for preparing the content and the questions.
3. **The approved exam template:** an official PowerPoint template that must be used as it is, without changing its design or formatting.

Your task is to study the three files carefully, then prepare study notes, an end-of-semester exam, and practice exercises that simulate the exam, in full compliance with the following instructions.

---

# 1. Studying and analysing the attachments

Before you start preparing the files:

1. Read the teaching plan and identify all the required objectives, skills and topics.
2. Review the textbook and identify the lessons and information linked to each objective.
3. Identify the grade, the cycle and the subject from the attached files.
4. Review the approved exam template and understand how it is organised and how its sections and marks are distributed.
5. Make sure the objectives in the plan match the content of the textbook.
6. Do not add any objectives or topics that are not in the teaching plan.

If you find anything missing or contradictory between the files, cannot determine the cycle, or do not have the official guidelines you need, ask for clarification before starting and do not assume information of your own.

# 2. Following the general guidelines for exams of students of determination

Follow the approved general guidelines for exams of students of determination, take individual differences and students' levels into account, and keep to the following structure:

## Cycle 1: Grades 1 to 4

- Total number of questions: 15.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 3 options only.
  2. Matching.

## Cycle 2: Grades 5 to 8

- Total number of questions: 20.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 4 options.
  2. Matching.
  3. Fill in the blank.

## Cycle 3: Grades 9 to 12

- Total number of questions: 20.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 4 options.
  2. Short answer.

## Multiple-choice share for all cycles

Multiple-choice questions must make up 75% of the total exam marks in all cycles.

Accordingly:

- 75 of the 100 marks go to multiple-choice questions.
- 25 of the 100 marks go to the other question types set for the cycle.

The question types set for each cycle may not be replaced with other types.

The number and types of questions must match the cycle, and the remaining questions must be distributed in a suitable and fair way.

# 3. Rules for writing the exam questions

Follow these rules:

1. All questions are linked to the learning objectives in the plan.
2. The information comes from the subject textbook.
3. The wording suits the actual level of the target students.
4. Use short, clear and direct sentences.
5. Avoid complex wording and questions that could have more than one answer.
6. Avoid questions that test more than one skill at the same time unless necessary.
7. Use a suitable progression in difficulty.
8. Do not use information outside the required content.
9. Avoid repeating the same question in different wording.
10. Make sure every question has one correct, clear answer.
11. Use pictures or symbols when needed, provided they are linked to the learning objective and do not give away the answer.
12. Make sure pictures are clear, the font size is suitable and the exam is easy to read.

# 4. Distributing the marks

Every exam in all three cycles must be out of exactly 100 marks.

Distribute the marks as follows:

| Question type | Marks |
|---|---:|
| Multiple choice | 75 |
| Other types set for the cycle | 25 |
| Total | 100 |

Mandatory instructions:

1. Distribute each question's marks fairly and logically according to the number of items and the difficulty.
2. State each question's mark clearly.
3. In matching questions, state the mark of each item separately, not only the total for the question.
4. In fill-in-the-blank questions, state the mark of each blank.
5. In short-answer questions, state the mark for the answer and the answer elements that earn the marks.
6. Make the marks of all questions and items add up to exactly 100.
7. Do not leave any question or item without a mark.
8. Show the mark next to the question or item, clearly for both the student and the teacher.
9. Add a clear total box at the end of the exam: 100 marks.
10. Do a final arithmetic check that the marks are distributed correctly before delivering the exam.

The distribution of marks must not be a formality: it must match the number of items to be answered.

# 5. Using English (Western) numerals

This is mandatory in every exam, without exception.

Use English numerals only:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9

Eastern Arabic (Hindi) numerals are not allowed in the exam.

This covers:

- Question numbers.
- Option numbers.
- Page numbers.
- Marks.
- Dates.
- Numbers inside question texts.
- Any other numbers that appear on the exam pages.

All numbers used in the exam must be English numerals.

# 6. Preparing the study notes

Create complete study notes based on the teaching plan and the textbook.

They must include:

1. The title of the notes and the subject, grade and semester.
2. The content divided into units and lessons according to the plan.
3. A simple explanation of each topic.
4. Clear explanations of the key concepts and information.
5. Suitable worked examples.
6. Varied exercises after the lessons.
7. Review questions that help students retain the information.
8. A clear highlight of the skills the end-of-semester exam will measure.

Rules for the notes:

- Cover every learning objective without leaving any out.
- Use clear language suited to the students.
- Take into account the characteristics of students of determination and individual differences.
- Contain no incorrect academic information.
- Contain no topics outside the plan.
- Be organised, attractive, and easy to read and print.
- Use suitable pictures and illustrations when needed.

# 6 (continued). Clear fonts, easy reading and smaller files

These instructions are mandatory and apply to the study notes, the exam, the practice exercises and every file produced.

## A. Clear fonts and font sizes

Design every file so that it is easy to read for students of determination, taking into account individual differences, learning difficulties and low vision.

### In the study notes (Word):

- Use a clear, easy-to-read Arabic font.
- Body text no smaller than 18 pt, preferably 20 pt when the page space allows.
- Main headings 24–28 pt.
- Subheadings 20–22 pt.
- Use suitable spacing between lines and paragraphs.
- Leave enough white space between explanations and exercises.
- Do not crowd information or put too much text on one page.
- Highlight important words and concepts clearly.
- Make sure the text is also clear when printed in black and white.

### In the end-of-semester exam (PowerPoint):

- Give top priority to how clearly the student can read the questions.
- Font: Arial or Tahoma for Arabic text (or Dubai if the template uses it and it is available), and Arial or Calibri for English text; use one font throughout the exam.
- Question text 24 pt on the printed page.
- Multiple-choice options 22 pt on the printed page.
- These must be the real sizes after printing, not just the sizes typed in PowerPoint (see "Slide size" below).
- Make numbers, symbols and marks clear and easy to tell apart.
- Do not shrink the font to fit more questions on a slide.
- If a slide cannot hold the questions at a suitable size, add new slides while keeping the template's original design.
- Avoid overlapping text, cramped lines, and crowded pictures and options.
- Make the answer space suit the size of the student's handwriting.
- Leave enough space between the options so the student can read them and mark the answer easily.

### Slide size, so the font does not shrink when printed:

When a slide is printed on A4 paper, PowerPoint enlarges or shrinks it to fill the page, which changes the real font size on paper. Therefore:

1. Before adding the questions, open "Design → Slide Size" in the template and note the slide size.
2. Do not change the template's slide size, because that distorts its approved design.
3. Set the font size in PowerPoint so that on paper the question stays 24 pt and the options 22 pt:

| Template slide size | Question in PowerPoint | Options in PowerPoint |
|---|---:|---:|
| A4 portrait 21 × 29.7 cm (the size of the school's approved exam template) | 25 | 23 |
| A4 landscape or 4:3 (slide width 27.5 cm or less) | 24 | 22 |
| Widescreen 16:9 (slide width 33.867 cm) | 29 | 26 |
| Any other size | 24 ÷ (printable width 28.7 cm ÷ slide width), rounded up | 22 ÷ (printable width 28.7 cm ÷ slide width), rounded up |

4. If the slide is portrait, use a printable width of 20 cm instead of 28.7 cm in the calculation (A4 paper after printer margins).
5. Never use a size smaller than the table; if the slide cannot hold the content, add new slides.
6. In the school's approved template, the "س ( ): اكتب السؤال هنا" (write the question here) texts are in Arial 16; they are places for questions, not fixed elements. Write the questions in Arial at the sizes above (25 for questions, 23 for options) and do not keep size 16. The template's fixed headings (such as "الجزء: الموضوعي", "لكل مفردة … درجات" and the cover details) keep their font and size, with their values updated to match the exam.
7. The template fits three questions per slide at size 16; at the required sizes put one or two questions per slide and add slides with the same design until all questions are in.
8. At the end of your work, state the template's slide size and the font sizes you used.
9. Remind the teacher to print the exam with "Full Page Slides" and "Scale to Fit Paper" turned on, and not several slides per sheet, because that shrinks the font.

### Important note about the approved template:

If the original PowerPoint template uses small fonts, keep the template's identity and overall design, and enlarge the text you add so it can be read clearly, without changing the approved fixed elements.

Do not let keeping to a number of slides become a reason to shrink the font or sacrifice readability.

The priority is that the student can read the question and the options clearly without eye strain.

## B. Reducing file size without lowering quality

The final files must be as small as possible so teachers can easily upload them to the Daam platform, download them and share them.

Follow these points:

1. Compress pictures and graphics inside the Word and PowerPoint files.
2. Use pictures optimised in size and resolution without losing important detail.
3. Avoid very large or unnecessary pictures.
4. Do not insert pictures in high-resolution formats when it is not needed.
5. Remove hidden elements and unnecessary data that increase the file size.
6. Use suitable media compression settings in Office.
7. Do not turn whole pages or slides into pictures; the text must stay selectable and editable.
8. Keep print quality and the clarity of text and pictures.
9. Avoid repeating the same pictures inside the file at unnecessary sizes.
10. Choose formats that balance quality and small size.

## C. Checking the files before delivery

Before delivering the final files:

- Make sure each file's size is suitable for uploading to the Daam platform.
- Reduce file sizes as much as possible without affecting clarity.
- Open the files and check that the fonts are clear on screen and in print.
- Make sure pictures and graphics are still clear after compression.
- Make sure the formatting has not been distorted by reducing the file size.
- Make sure the files open normally in Microsoft Office.

**The main priority: clear content for the student first, then a smaller file without sacrificing reading and print quality.**

# 7. Adding exam practice at the end of the notes

At the end of the notes, add a separate section titled:

**End-of-Semester Exam Practice**

This section must work as a practice simulation of the real exam.

Conditions:

1. It simulates the question types set for the cycle.
2. It includes practice on every skill the exam measures.
3. It suits the student's level.
4. It contains varied questions that are not copied word for word from the exam.
5. Its questions resemble the exam in wording and difficulty.
6. It helps the student understand how to answer and prepare for the real exam.
7. It includes enough practice on multiple choice and the other types set for the cycle.

# 8. Keeping the approved PowerPoint exam template

This is one of the most important instructions in the task.

The exam template I will attach is a PowerPoint file approved by the school.

Work on a copy of the original PowerPoint file itself and insert the questions and content into it.

**Changing or redesigning the template is strictly forbidden.**

Keep all of the following:

- The original slide design.
- The template colours.
- The original fonts and sizes of the fixed elements.
- The logos and institutional identity.
- The header and footer.
- Tables, cells and borders.
- Margins and alignment.
- Slide backgrounds.
- The order of slides and sections.
- The layout of elements on each slide.
- Any fixed instructions or data in the template.

The task is only to fill the template with the required questions and data.

## Template details that must be updated to match the exam

The school template contains sample values that must be changed (without changing their font, size or position):

1. **Semester on the cover:** write the correct semester (first, second or third) as stated in the attached teaching plan. If the semester is not clear from the files, ask the teacher before preparing the exam; do not keep the value written in the template.
2. **Academic year:** 2026-2027.
3. **Other cover details:** the subject and grade; the student name and number boxes stay empty for the student to fill in.
4. **Marks table on the cover:** objective part (multiple choice) = 75, written part (the other types set for the cycle) = 25, total = 100.
5. **Part heading on each slide:** "الجزء: الموضوعي" (objective part) for multiple-choice slides and "الجزء: المقالي" (written part) for slides with the other types.
6. **"لكل مفردة … درجات" (marks per item) on each slide:** write the correct mark for that slide's questions according to your distribution. The value in the template (5 marks) is only an example and does not always fit; for example, in Cycle 1, 15 questions × 5 = only 75. If questions on one slide carry different marks, write each question's mark next to it.
7. Finally, check that the question marks add up to 75 for the objective part and 25 for the written part, matching the marks table on the cover and the answer key.

Do not create a new exam with a different design, and do not convert the template to Word or PDF as the required original file.

If the space in the template is not enough to show the questions clearly, add new slides using the template's original design and formatting; do not delete or shorten question content, and do not shrink the font in a way that harms readability.

If the template cannot be edited, or a technical problem prevents keeping its formatting, tell me about the problem before making any change to the design.

# 9. Preparing the answer key

Create a separate answer key for the teacher, including:

1. The correct answer to each question.
2. The correct answers for each item in matching questions.
3. The required answer for each blank.
4. The acceptable answer elements in short-answer questions.
5. The mark for each question and item.
6. A final table of the mark distribution with a check of the total.

The answer key must match the exam exactly in question numbers and order.

Do not put the answer key inside the student's copy of the exam.

# 10. Final review and quality assurance

Before delivering the files, carry out a full review that includes:

## Reviewing the notes:

- The notes match the teaching plan.
- All objectives are covered.
- The information is correct.
- The explanations suit the students' level.
- There is exam practice at the end.
- The font is clear and large enough.
- The notes are easy to read and print.
- The file size is suitable for uploading to the platform.

## Reviewing the exam:

- The number of questions set for the cycle is respected.
- The question types set for the cycle are respected.
- Multiple choice makes up 75% of the marks.
- The marks are correctly distributed out of 100.
- Each question's and item's mark is clear.
- Only English numerals are used.
- The answers are correct.
- The font, pictures and questions are clear.
- The slides are not crowded.
- There is no cut-off or overlapping text.
- The student can read the questions and options easily.

## Reviewing the PowerPoint template:

- Compare the final version with the original template.
- Make sure the template design has not changed.
- Make sure no fixed element was deleted.
- Make sure all questions appear correctly.
- Make sure there is no cut-off or overlapping text.
- Make sure the file can be edited, shown and printed.

## Reviewing file sizes:

- Pictures and media are suitably compressed.
- The files are as small as possible.
- The quality of text and pictures is not affected.
- The files can be opened, downloaded and uploaded to the Daam platform.

# 11. The final files required

I want 3 separate files delivered:

## File 1: The study notes

- An editable Word file.
- Covers all topics and objectives.
- Includes the exercises and activities.
- Ends with end-of-semester exam practice.
- Uses a large, clear Arabic font suitable for students of determination.
- A small file size suitable for uploading to the Daam platform.

## File 2: The end-of-semester exam

- An editable PowerPoint file.
- Uses the original attached exam template.
- Keeps the template's design and formatting completely.
- Complies with the general guidelines for exams of students of determination.
- Total of 100 marks.
- A large, clear font that is comfortable to read.
- Adds slides when needed instead of shrinking the font.
- Question 24 pt and options 22 pt on the printed page, following the "Slide size" table.
- A small file size without lowering display and print quality.

## File 3: The answer key

- A separate file for the teacher.
- Includes the answers and the detailed mark distribution.
- Matches the final version of the exam.
- Organised, clear and easy to use.
- A small file size suitable for uploading and sharing.

# 12. Mandatory final instructions

- Do not start work before studying the three files.
- Do not invent objectives or information that are not in the sources.
- Do not ignore any objective in the plan.
- Do not change the approved exam template.
- Do not exceed the number of questions set for the cycle.
- Do not go above or below a total of 100 marks.
- Do not change the 75% share for multiple choice.
- Do not use Eastern Arabic (Hindi) numerals in the exam.
- Do not stop at text content; real, editable files ready for delivery are required.
- Review the files after creating them and make sure they are sound and of good quality.
- Make clear fonts and easy reading a core priority in all files.
- Do not shrink the font to fit the content; add pages or slides when needed.
- Reduce file sizes by compressing pictures and media without lowering content quality.
- Make sure all final files are suitable for uploading to the Daam platform.

**The final goal:** to produce complete study notes and an end-of-semester exam that match the teaching plan, the subject textbook and the general guidelines for exams of students of determination, while fully keeping the school's official approved exam template, giving the student a comfortable and clear reading experience, and keeping file sizes small so they are easy to share and upload to the Daam platform.
`)},Ln=()=>In(Pn()),Rn=()=>{let e=Fn();return e?`<p class="xs mut">${p(`آخر تحديث للأمر: `,`Prompt last updated: `)}${g(e.at)} — ${m(e.by)}</p>`:``},zn=()=>`<div class="row">${K(`promptCopy`,p(`نسخ الأمر`,`Copy prompt`),{cls:`p`,ic:`copy`})}${K(`promptDl`,p(`تنزيل الأمر كملف`,`Download as a file`),{ic:`dl`})}</div>`,Bn=()=>{let e=[[`blue`,`file`,p(`الخطة التربوية الفردية`,`Individual Education Plan (IEP)`),p(`خطة الطالب للفصل الدراسي: الأهداف والمهارات المطلوب تدريسها وقياسها.`,`The student’s plan for the semester: the objectives and skills to teach and assess.`),``],[`green`,`book`,p(`كتاب المادة`,`Subject textbook`),p(`كتاب المادة للفصل الحالي، وهو المرجع لمحتوى المذكرة وأسئلة الاختبار.`,`The current semester’s textbook, the reference for the notes and the exam questions.`),``],[`amber`,`up`,p(`قالب الاختبار المعتمد`,`Approved exam template`),p(`ملف PowerPoint من «القوالب المعتمدة» في المنصة، يُستخدم كما هو دون تغيير تصميمه.`,`The PowerPoint file from “Approved templates” on the platform, used as it is without changing its design.`),K(`go`,p(`فتح القوالب المعتمدة`,`Open approved templates`),{cls:`s`,ic:`dl`,d:{view:`templates`}})]];return`<div class="card col" style="gap:10px"><h2>${p(`أرفق هذه الملفات الثلاثة مع الأمر في محادثة Claude`,`Attach these three files with the prompt in the Claude chat`)}</h2>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px">${e.map(([e,t,n,r,i],a)=>`<div class="col" style="gap:6px;background:var(--${e}-b);color:var(--ink);border-radius:12px;padding:14px;border-inline-start:5px solid var(--${e})"><div class="row" style="gap:8px;color:var(--${e})"><span class="b" style="font-size:1.4rem">${a+1}</span>${E(t)}<span class="b" style="font-size:1.05rem">${n}</span></div><span class="sm">${r}</span>${i}</div>`).join(``)}</div>
  <p class="sm" style="background:var(--soft);border-radius:10px;padding:10px 12px;margin:0">${E(`print`)} <span class="b">${p(`عند طباعة الاختبار:`,`When printing the exam:`)}</span> ${p(`اختر «شرائح بملء الصفحة» وفعّل «ملاءمة للورق»، ولا تطبع أكثر من شريحة في الورقة، حتى يبقى خط السؤال 24 والبدائل 22.`,`choose “Full Page Slides” and turn on “Scale to Fit Paper”, and never print more than one slide per sheet, so questions stay 24 pt and options 22 pt.`)}</p>
  <p class="xs mut">${p(`لا تكتب اسم الطالب أو بياناته الشخصية داخل محادثة Claude.`,`Do not type the student’s name or personal details in the Claude chat.`)}</p></div>`};B.t.prompt=()=>{let e=Pn();return`${q(`أمر متطلبات منصة دعم`,`Daam Requirements Prompt`,p(`انسخ الأمر والصقه في محادثة جديدة مع Claude، وأرفق معه الملفات الثلاثة التالية. سيُعدّ لك Claude المذكرة التعليمية واختبار نهاية الفصل ونموذج الإجابة.`,`Copy the prompt into a new chat with Claude and attach the three files below. Claude will prepare the study notes, the end-of-semester exam and the answer key.`))}
  ${Bn()}
  <div class="row sp"><div class="row"><span class="sm mut">${p(`لغة الأمر:`,`Prompt language:`)}</span>${[[`ar`,`العربية`],[`en`,`English`]].map(([t,n])=>`<button class="chk ${e===t?`on`:``}" data-act="setv" data-k="plang" data-val="${t}">${n}</button>`).join(``)}</div>${zn()}</div>
  ${Rn()}<div class="card"><pre class="prompt" dir="${e===`ar`?`rtl`:`ltr`}" lang="${e}">${m(Ln())}</pre></div>
  ${zn()}`},Ht.s.push([`prompt`,`copy`,`أمر متطلبات منصة دعم`,`Daam Requirements Prompt`]),B.s.prompt=()=>{let e=Pn();k.pe=k.pe||{},k.pe[e]??(k.pe[e]=In(e));let t=[`ar`,`en`].some(e=>k.pe[e]!=null&&k.pe[e]!==In(e));return`${q(`أمر متطلبات منصة دعم`,`Daam Requirements Prompt`,p(`عدّل نص الأمر ثم اضغط «حفظ ونشر للمعلمين»، فيظهر الأمر الجديد فورًا في صفحة الأمر عند جميع معلمي التعليم العام.`,`Edit the prompt, then press “Save and publish to teachers”; every general education teacher sees the new prompt right away.`))}
  <div class="row sp"><div class="row"><span class="sm mut">${p(`لغة الأمر:`,`Prompt language:`)}</span>${[[`ar`,`العربية`],[`en`,`English`]].map(([t,n])=>`<button class="chk ${e===t?`on`:``}" data-act="setv" data-k="plang" data-val="${t}">${n}</button>`).join(``)}</div>${zn()}</div>
  ${Rn()}${Fn()?``:`<p class="xs mut">${p(`المعروض الآن هو الأمر الأصلي للمنصة.`,`This is the platform’s original prompt.`)}</p>`}
  <div class="card col"><textarea data-pe="${e}" dir="${e===`ar`?`rtl`:`ltr`}" lang="${e}" style="min-height:55vh;font-size:.9rem;line-height:1.8">${m(k.pe[e])}</textarea>
  <p class="xs mut">${p(`يُحفظ النصّان العربي والإنجليزي معًا. إذا عدّلت أحدهما فقط يبقى الآخر كما هو.`,`The Arabic and English texts are saved together; the one you did not change stays as it is.`)}</p>
  <div class="row">${K(`promptSave`,p(`حفظ ونشر للمعلمين`,`Save and publish to teachers`),{cls:`p`,ic:`check`})}${t?K(`promptUndo`,p(`تجاهل التعديلات`,`Discard changes`)):``}${Fn()?K(`promptReset`,p(`استعادة الأمر الأصلي`,`Restore the original prompt`),{cls:`s d`}):``}</div></div>`},z.promptSave=()=>{let e=k.pe||{},t=String(e.ar==null?In(`ar`):e.ar).trim(),n=String(e.en==null?In(`en`):e.en).trim();if(!t||!n)return Y(`لا يمكن حفظ أمر فارغ.`,`The prompt cannot be empty.`);Q(p(`نشر هذا الأمر لجميع معلمي التعليم العام؟`,`Publish this prompt to every general education teacher?`),async()=>{await L(`promptSet`,{ar:t===`# أمر متطلبات منصة دعم
## إعداد المذكرة التعليمية واختبار نهاية الفصل الدراسي لطلبة أصحاب الهمم

أنت متخصص في التربية الخاصة، وإعداد المناهج التعليمية، وتصميم المذكرات والاختبارات المدرسية لطلبة أصحاب الهمم، وفق المناهج والموجهات المعتمدة من وزارة التربية والتعليم في دولة الإمارات العربية المتحدة.

سأرفق لك 3 ملفات أساسية:

1. **الخطة التعليمية للفصل الدراسي:** وتتضمن الأهداف والمهارات والموضوعات المطلوب تدريسها وقياسها.
2. **كتاب المادة الدراسية:** وهو المرجع العلمي الأساسي لإعداد المحتوى والأسئلة.
3. **قالب الاختبار المعتمد:** وهو قالب رسمي بصيغة PowerPoint، ويجب استخدامه كما هو دون تغيير تصميمه أو تنسيقه.

مهمتك هي دراسة الملفات الثلاثة بعناية، ثم إعداد مذكرة تعليمية واختبار نهاية الفصل الدراسي وتدريبات تحاكي الاختبار، مع الالتزام الكامل بالتعليمات التالية.

---

# أولاً: دراسة وتحليل المرفقات

قبل البدء في إعداد الملفات:

1. اقرأ الخطة التعليمية وحدد جميع الأهداف والمهارات والموضوعات المقررة.
2. راجع كتاب المادة وحدد الدروس والمعلومات المرتبطة بكل هدف.
3. تعرف على الصف الدراسي والحلقة الدراسية والمادة من الملفات المرفقة.
4. راجع قالب الاختبار المعتمد وافهم طريقة تنظيمه وتوزيع أقسامه ودرجاته.
5. تأكد من توافق الأهداف الموجودة في الخطة مع المحتوى الموجود في الكتاب.
6. لا تضف أي أهداف أو موضوعات غير واردة في الخطة التعليمية.

إذا وجدت نقصاً أو تعارضاً بين الملفات، أو تعذر تحديد الحلقة الدراسية، أو لم تتوفر لديك الموجهات الرسمية اللازمة، اطلب التوضيح قبل البدء ولا تفترض معلومات من عندك.

# ثانياً: الالتزام بالموجهات العامة لاختبارات أصحاب الهمم

يجب الالتزام بالموجهات العامة المعتمدة لاختبارات أصحاب الهمم، ومراعاة الفروق الفردية ومستويات الطلبة، مع الالتزام بالتقسيم التالي:

## الحلقة الأولى: الصفوف من 1 إلى 4

- إجمالي عدد الأسئلة: 15 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 3 بدائل فقط.
  2. التوصيل.

## الحلقة الثانية: الصفوف من 5 إلى 8

- إجمالي عدد الأسئلة: 20 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 4 بدائل.
  2. التوصيل.
  3. ملء الفراغ.

## الحلقة الثالثة: الصفوف من 9 إلى 12

- إجمالي عدد الأسئلة: 20 سؤالاً.
- الدرجة النهائية: 100 درجة.
- أنواع الأسئلة:
  1. اختيار من متعدد، ويتكون كل سؤال من 4 بدائل.
  2. إجابة قصيرة.

## شرط نسبة الاختيار من متعدد لجميع الحلقات

يجب أن تمثل أسئلة الاختيار من متعدد نسبة 75% من إجمالي درجات الاختبار لجميع الحلقات.

بناءً على ذلك:

- 75 درجة من أصل 100 تخصص لأسئلة الاختيار من متعدد.
- 25 درجة من أصل 100 تخصص لبقية أنواع الأسئلة المقررة للحلقة.

لا يجوز استبدال أنواع الأسئلة المحددة لكل حلقة بأنواع أخرى.

يجب مراعاة أن يكون عدد الأسئلة وأنواعها متوافقاً مع الحلقة الدراسية، وأن تكون الأسئلة المتبقية موزعة بطريقة مناسبة وعادلة.

# ثالثاً: ضوابط صياغة أسئلة الاختبار

التزم بالضوابط التالية:

1. أن تكون جميع الأسئلة مرتبطة بالأهداف التعليمية الواردة في الخطة.
2. أن تكون المعلومات مستمدة من كتاب المادة.
3. أن تتناسب صياغة الأسئلة مع المستوى الفعلي للطلبة المستهدفين.
4. استخدام عبارات قصيرة وواضحة ومباشرة.
5. تجنب الصياغات المعقدة والأسئلة التي تحتمل أكثر من إجابة.
6. تجنب الأسئلة التي تتضمن أكثر من مهارة في الوقت نفسه دون ضرورة.
7. مراعاة التدرج المناسب في مستوى الصعوبة.
8. عدم استخدام معلومات خارج نطاق المحتوى المقرر.
9. تجنب تكرار السؤال نفسه بصيغ مختلفة.
10. التأكد من وجود إجابة صحيحة وواضحة لكل سؤال.
11. استخدام صور أو رموز توضيحية عند الحاجة، بشرط أن تكون مرتبطة بالهدف التعليمي ولا تكشف الإجابة.
12. مراعاة وضوح الصور وحجم الخط وسهولة قراءة الاختبار.

# رابعاً: توزيع الدرجات

جميع الاختبارات في الحلقات الثلاث يجب أن تكون من 100 درجة بالضبط.

يجب توزيع الدرجات وفق النسب التالية:

| نوع الأسئلة | الدرجة |
|---|---:|
| اختيار من متعدد | 75 |
| الأنواع الأخرى المقررة للحلقة | 25 |
| الإجمالي | 100 |

التعليمات الإلزامية:

1. وزع درجات كل سؤال بصورة عادلة ومنطقية حسب عدد المفردات ومستوى الصعوبة.
2. حدد درجة كل سؤال بشكل واضح.
3. في أسئلة التوصيل، حدد درجة كل مفردة على حدة، وليس درجة السؤال الإجمالية فقط.
4. في أسئلة ملء الفراغ، حدد درجة كل فراغ.
5. في أسئلة الإجابة القصيرة، حدد الدرجة المخصصة للإجابة وعناصر الإجابة التي تستحق الدرجة.
6. اجعل مجموع درجات جميع الأسئلة والمفردات يساوي 100 بالضبط.
7. لا تترك أي سؤال أو مفردة دون تحديد درجتها.
8. أظهر الدرجة بجوار السؤال أو المفردة بطريقة واضحة للطالب والمعلم.
9. أضف في نهاية الاختبار خانة واضحة للمجموع النهائي: 100 درجة.
10. أجرِ مراجعة حسابية نهائية للتأكد من صحة توزيع الدرجات قبل تسليم الاختبار.

يجب ألا يكون توزيع الدرجات شكلياً، بل يجب أن يتناسب مع عدد المفردات المطلوبة للإجابة عنها.

# خامساً: استخدام الأرقام الإنجليزية

هذا شرط إلزامي في جميع الاختبارات دون استثناء.

استخدم الأرقام الإنجليزية فقط:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9

يُمنع استخدام الأرقام الهندية أو العربية في الاختبار.

يشمل ذلك:

- أرقام الأسئلة.
- أرقام البدائل.
- أرقام الصفحات.
- الدرجات.
- التواريخ.
- الأعداد داخل نصوص الأسئلة.
- أي أرقام أخرى تظهر في صفحات الاختبار.

يجب أن تكون جميع الأرقام المستخدمة داخل الاختبار باللغة الإنجليزية.

# سادساً: إعداد المذكرة التعليمية

أنشئ مذكرة تعليمية متكاملة بناءً على الخطة التعليمية وكتاب المادة.

يجب أن تتضمن:

1. عنوان المذكرة واسم المادة والصف والفصل الدراسي.
2. تقسيم المحتوى إلى وحدات ودروس وفق الخطة.
3. شرحاً مبسطاً لكل موضوع.
4. توضيح المفاهيم والمعلومات الأساسية.
5. أمثلة تطبيقية مناسبة.
6. تدريبات متنوعة بعد الدروس.
7. أسئلة مراجعة تساعد على تثبيت المعلومات.
8. إبراز المهارات التي سيقيسها اختبار نهاية الفصل.

ضوابط المذكرة:

- تغطي جميع الأهداف التعليمية دون إغفال أي هدف.
- تستخدم لغة واضحة ومناسبة للطلبة.
- تراعي خصائص الطلبة من أصحاب الهمم والفروق الفردية.
- لا تتضمن معلومات علمية غير صحيحة.
- لا تتضمن موضوعات خارج الخطة.
- تكون منظمة وجذابة وسهلة القراءة والطباعة.
- تستخدم صوراً ورسومات توضيحية مناسبة عند الحاجة.

# سادساً مكرر: وضوح الخط وسهولة القراءة وتقليل حجم الملفات

هذه التعليمات إلزامية ويجب تطبيقها على المذكرة التعليمية والاختبار والتدريبات وجميع الملفات الناتجة.

## أولاً: وضوح الخط وحجمه

يجب تصميم جميع الملفات بما يضمن سهولة القراءة لطلبة أصحاب الهمم، مع مراعاة الفروق الفردية وصعوبات التعلم وضعف البصر.

### في المذكرة التعليمية (Word):

- استخدام خط عربي واضح وسهل القراءة.
- حجم خط المتن لا يقل عن 18 نقطة، ويفضل 20 نقطة عند ملاءمة مساحة الصفحة.
- العناوين الرئيسية بحجم 24–28 نقطة.
- العناوين الفرعية بحجم 20–22 نقطة.
- استخدام تباعد مناسب بين الأسطر والفقرات.
- ترك مساحات بيضاء كافية بين الشروحات والتدريبات.
- عدم تكديس المعلومات أو وضع نصوص كثيرة في الصفحة الواحدة.
- إبراز الكلمات والمفاهيم المهمة بطريقة واضحة.
- التأكد من وضوح النص عند الطباعة بالأبيض والأسود أيضاً.

### في اختبار نهاية الفصل (PowerPoint):

- إعطاء الأولوية القصوى لوضوح الأسئلة أمام الطالب.
- نوع الخط: Arial أو Tahoma للنص العربي (أو Dubai إذا كان مستخدماً في القالب ومتوفراً)، وArial أو Calibri للنص الإنجليزي، مع استخدام خط واحد في الاختبار كله.
- حجم نص السؤال 24 نقطة على الورقة المطبوعة.
- حجم بدائل الاختيار من متعدد 22 نقطة على الورقة المطبوعة.
- يجب أن تكون هذه الأحجام هي الأحجام الفعلية بعد الطباعة، وليست مجرد الأحجام المكتوبة داخل PowerPoint (انظر بند «حجم الشريحة» أدناه).
- جعل الأرقام والرموز والدرجات واضحة وسهلة التمييز.
- عدم تصغير الخط بهدف احتواء عدد أكبر من الأسئلة في الشريحة.
- إذا لم تتسع الشريحة للأسئلة بالخط المناسب، أضف شرائح جديدة مع المحافظة على التصميم الأصلي للقالب.
- تجنب تداخل النصوص أو تقارب الأسطر أو ازدحام الصور والاختيارات.
- اجعل مساحة الإجابة مناسبة لحجم كتابة الطالب.
- اترك مسافات كافية بين الاختيارات حتى يستطيع الطالب قراءتها وتحديد الإجابة بسهولة.

### حجم الشريحة حتى لا يصغر الخط عند الطباعة:

عند طباعة الشريحة على ورقة A4 يكبّر PowerPoint الشريحة أو يصغّرها لتملأ الورقة، فيتغير حجم الخط الفعلي على الورق. لذلك:

1. قبل إدخال الأسئلة، افتح «تصميم ← حجم الشريحة» في القالب، وسجّل مقاس الشريحة.
2. لا تغيّر مقاس شرائح القالب، لأن ذلك يشوّه تصميمه المعتمد.
3. احسب حجم الخط داخل PowerPoint بحيث يبقى على الورق 24 نقطة للسؤال و22 نقطة للبدائل:

| مقاس شريحة القالب | السؤال داخل PowerPoint | البدائل داخل PowerPoint |
|---|---:|---:|
| A4 رأسي 21 × 29.7 سم (مقاس قالب الاختبار المعتمد للمدرسة) | 25 | 23 |
| A4 أفقي أو 4:3 (عرض الشريحة 27.5 سم أو أقل) | 24 | 22 |
| عريض 16:9 (عرض الشريحة 33.867 سم) | 29 | 26 |
| مقاس آخر | 24 ÷ (عرض الطباعة 28.7 سم ÷ عرض الشريحة)، مقرّباً للأعلى | 22 ÷ (عرض الطباعة 28.7 سم ÷ عرض الشريحة)، مقرّباً للأعلى |

4. إذا كانت الشريحة رأسية (Portrait)، استخدم عرض الطباعة 20 سم بدل 28.7 سم في الحساب (الورقة A4 بعد هوامش الطابعة).
5. لا تستخدم أي حجم أصغر من الجدول، وإذا لم تتسع الشريحة أضف شرائح جديدة.
6. في قالب المدرسة المعتمد: نصوص «س ( ): اكتب السؤال هنا» مكتوبة بخط Arial حجم 16، وهي أماكن للأسئلة وليست عناصر ثابتة. اكتب الأسئلة بخط Arial بالأحجام أعلاه (25 للسؤال و23 للبدائل)، ولا تُبقِ حجم 16. العناوين الثابتة في القالب (مثل «الجزء: الموضوعي» و«لكل مفردة … درجات» وبيانات الغلاف) تبقى بخطها وحجمها كما هي، مع تعديل قيمها لتطابق الاختبار.
7. القالب يتسع لثلاثة أسئلة في الشريحة بحجم 16؛ بالأحجام المطلوبة ضع سؤالاً أو سؤالين في الشريحة، وأضف شرائح بنفس التصميم حتى تكتمل الأسئلة.
8. اذكر في نهاية عملك مقاس شريحة القالب وأحجام الخط التي استخدمتها.
9. ذكّر المعلم بطباعة الاختبار بخيار «شرائح بملء الصفحة» مع تفعيل «ملاءمة للورق»، ودون طباعة عدة شرائح في الورقة الواحدة، لأن ذلك يصغّر الخط.

### ملاحظة مهمة بشأن القالب المعتمد:

إذا كان قالب PowerPoint الأصلي يحتوي على خطوط صغيرة، حافظ على الهوية والتصميم العام للقالب، مع تحسين حجم النصوص المضافة بما يسمح بقراءتها بوضوح، دون تغيير العناصر الثابتة المعتمدة.

لا تجعل الالتزام بعدد الشرائح سبباً في تصغير الخط أو التضحية بسهولة القراءة.

الأولوية هي أن يتمكن الطالب من قراءة السؤال والاختيارات بوضوح دون إجهاد بصري.

## ثانياً: تقليل حجم الملفات دون التأثير على الجودة

يجب أن تكون الملفات النهائية صغيرة الحجم قدر الإمكان حتى يسهل على المعلمين رفعها على منصة دعم وتنزيلها ومشاركتها.

التزم بالتالي:

1. ضغط الصور والرسومات داخل ملفات Word وPowerPoint.
2. استخدام صور محسّنة الحجم والدقة دون فقدان وضوح التفاصيل المهمة.
3. تجنب الصور الضخمة أو غير الضرورية.
4. عدم إدراج الصور بصيغ أو دقة مرتفعة دون حاجة.
5. إزالة العناصر المخفية والبيانات غير الضرورية التي تزيد حجم الملف.
6. استخدام إعدادات ضغط الوسائط المناسبة داخل Office.
7. عدم تحويل الصفحات أو الشرائح بالكامل إلى صور؛ يجب أن تظل النصوص قابلة للتحديد والتعديل.
8. الحفاظ على جودة الطباعة ووضوح النصوص والصور.
9. تجنب تكرار الصور نفسها داخل الملف بأحجام غير ضرورية.
10. اختيار الصيغ المناسبة التي تحقق التوازن بين الجودة وصغر الحجم.

## ثالثاً: فحص الملفات قبل التسليم

قبل تسليم الملفات النهائية:

- تأكد من أن حجم كل ملف مناسب للرفع على منصة دعم.
- حاول تقليل حجم الملفات قدر الإمكان دون التأثير على وضوحها.
- افتح الملفات وتحقق من أن الخطوط واضحة عند العرض والطباعة.
- تأكد من أن الصور والرسومات ما زالت واضحة بعد الضغط.
- تأكد من عدم حدوث أي تشوه في التنسيق نتيجة تقليل حجم الملفات.
- تأكد من أن الملفات تفتح بصورة طبيعية على برامج Microsoft Office.

**الأولوية الأساسية: وضوح المحتوى للطالب أولاً، ثم تقليل حجم الملف دون التضحية بجودة القراءة والطباعة.**

# سابعاً: إضافة تدريب على اختبار نهاية الفصل في نهاية المذكرة

في نهاية المذكرة، أضف قسماً مستقلاً بعنوان:

**تدريب على اختبار نهاية الفصل الدراسي**

يجب أن يكون هذا القسم بمثابة محاكاة تدريبية للاختبار الفعلي.

الشروط:

1. أن يحاكي أنواع الأسئلة المقررة للحلقة الدراسية.
2. أن يتضمن تدريبات على جميع المهارات التي يقيسها الاختبار.
3. أن يتناسب مع مستوى الطالب.
4. أن يحتوي على أسئلة متنوعة وليست منسوخة حرفياً من الاختبار.
5. أن تكون أسئلته مشابهة للاختبار من حيث طريقة الصياغة ومستوى الصعوبة.
6. أن يساعد الطالب على فهم طريقة الإجابة والاستعداد للاختبار الفعلي.
7. أن يتضمن تدريباً كافياً على الاختيار من متعدد والأنواع الأخرى المقررة للحلقة.

# ثامناً: الحفاظ على قالب الاختبار المعتمد بصيغة PowerPoint

هذه من أهم التعليمات في المهمة.

قالب الاختبار الذي سأرفقه لك هو ملف PowerPoint معتمد من المدرسة.

يجب العمل على نسخة من ملف PowerPoint الأصلي نفسه، وإدراج الأسئلة والمحتوى داخله.

**ممنوع تماماً تغيير القالب أو إعادة تصميمه.**

يجب الحفاظ على جميع العناصر التالية:

- تصميم الشرائح الأصلي.
- ألوان القالب.
- الخطوط وأحجامها الأصلية للعناصر الثابتة.
- الشعارات والهوية المؤسسية.
- الترويسة والتذييل.
- الجداول والخلايا والحدود.
- الهوامش والمحاذاة.
- خلفيات الشرائح.
- ترتيب الشرائح والأقسام.
- توزيع العناصر داخل كل شريحة.
- أي تعليمات أو بيانات ثابتة موجودة بالقالب.

المطلوب هو تعبئة القالب بالأسئلة والبيانات المطلوبة فقط.

## البيانات المتغيرة في القالب التي يجب تعديلها لتطابق الاختبار

قالب المدرسة يحتوي على بيانات مكتوبة مسبقاً كمثال، ويجب تعديل قيمها (دون تغيير خطها أو حجمها أو مكانها):

1. **الفصل الدراسي في الغلاف:** اكتب الفصل الصحيح (الأول أو الثاني أو الثالث) كما هو في الخطة التعليمية المرفقة. إذا لم يكن الفصل واضحاً في الملفات، اسأل المعلم قبل إعداد الاختبار ولا تُبقِ القيمة المكتوبة في القالب.
2. **العام الدراسي:** 2026-2027.
3. **بيانات الغلاف الأخرى:** المادة والصف، وتبقى خانات اسم الطالب ورقمه فارغة ليكتبها الطالب.
4. **جدول الدرجات في الغلاف:** الجزء الموضوعي (الاختيار من متعدد) = 75، والجزء المقالي (الأنواع الأخرى المقررة للحلقة) = 25، والمجموع = 100.
5. **عنوان الجزء في كل شريحة:** «الجزء: الموضوعي» لشرائح الاختيار من متعدد، و«الجزء: المقالي» لشرائح الأنواع الأخرى.
6. **عبارة «لكل مفردة … درجات» في كل شريحة:** اكتب الدرجة الصحيحة لأسئلة تلك الشريحة وفق توزيعك. القيمة الموجودة في القالب (5 درجات) مثال فقط، ولا تصلح دائماً؛ فمثلاً في الحلقة الأولى 15 سؤالاً × 5 = 75 فقط. إذا اختلفت درجات الأسئلة داخل الشريحة الواحدة، اكتب درجة كل سؤال بجواره.
7. تحقق في النهاية من أن مجموع درجات الأسئلة يساوي 75 للجزء الموضوعي و25 للجزء المقالي، وأن ذلك مطابق لجدول الدرجات في الغلاف ولنموذج الإجابة.

لا تنشئ اختباراً جديداً بتصميم مختلف، ولا تحول القالب إلى Word أو PDF باعتباره الملف الأصلي المطلوب.

إذا لم تكن المساحة المتاحة في القالب كافية لعرض الأسئلة بوضوح، أضف شرائح جديدة باستخدام التصميم والتنسيق الأصليين للقالب، ولا تحذف أو تختصر محتوى الأسئلة ولا تصغر الخط بصورة تضر بوضوح القراءة.

إذا كان القالب غير قابل للتحرير أو ظهرت مشكلة تقنية تمنع الحفاظ على تنسيقه، أخبرني بالمشكلة قبل إجراء أي تغيير على التصميم.

# تاسعاً: إعداد نموذج الإجابة

أنشئ نموذج إجابة منفصلاً خاصاً بالمعلم، يتضمن:

1. الإجابة الصحيحة لكل سؤال.
2. الإجابات الصحيحة لكل مفردة في أسئلة التوصيل.
3. الإجابة المطلوبة لكل فراغ.
4. عناصر الإجابة المقبولة في الأسئلة القصيرة.
5. الدرجة المخصصة لكل سؤال ومفردة.
6. جدولاً نهائياً لتوزيع الدرجات ومراجعة مجموعها.

يجب أن يكون نموذج الإجابة متطابقاً تماماً مع الاختبار من حيث أرقام الأسئلة وترتيبها.

لا تضع نموذج الإجابة داخل نسخة الاختبار المخصصة للطالب.

# عاشراً: المراجعة النهائية وضمان الجودة

قبل تسليم الملفات، نفذ مراجعة شاملة تتضمن:

## مراجعة المذكرة:

- مطابقة المذكرة للخطة التعليمية.
- تغطية جميع الأهداف.
- صحة المعلومات.
- ملاءمة الشرح لمستوى الطلبة.
- وجود تدريب على الاختبار في النهاية.
- وضوح الخط وحجمه.
- سهولة القراءة والطباعة.
- مناسبة حجم الملف للرفع على المنصة.

## مراجعة الاختبار:

- الالتزام بعدد الأسئلة المحدد للحلقة.
- الالتزام بأنواع الأسئلة المحددة.
- الالتزام بنسبة 75% من الدرجات للاختيار من متعدد.
- صحة توزيع الدرجات من أصل 100.
- وضوح درجة كل سؤال وكل مفردة.
- استخدام الأرقام الإنجليزية فقط.
- صحة الإجابات.
- وضوح الخط والصور والأسئلة.
- عدم ازدحام الشرائح.
- عدم وجود نصوص مقطوعة أو متداخلة.
- التأكد من أن الطالب يستطيع قراءة الأسئلة والاختيارات بسهولة.

## مراجعة قالب PowerPoint:

- مقارنة النسخة النهائية بالقالب الأصلي.
- التأكد من عدم تغيير تصميم القالب.
- التأكد من عدم حذف أي عنصر ثابت.
- التأكد من ظهور جميع الأسئلة بشكل صحيح.
- التأكد من عدم وجود نصوص مقطوعة أو متداخلة.
- التأكد من أن الملف قابل للتعديل والعرض والطباعة.

## مراجعة حجم الملفات:

- التأكد من ضغط الصور والوسائط بصورة مناسبة.
- التأكد من أن حجم الملفات صغير قدر الإمكان.
- التأكد من عدم تأثر جودة النصوص والصور.
- التأكد من إمكانية فتح الملفات وتنزيلها ورفعها على منصة دعم.

# الحادي عشر: الملفات النهائية المطلوبة

أريد تسليم 3 ملفات منفصلة:

## الملف الأول: المذكرة التعليمية

- بصيغة Word قابلة للتعديل.
- تشمل جميع الموضوعات والأهداف.
- تتضمن التدريبات والأنشطة.
- تتضمن في نهايتها تدريباً على اختبار نهاية الفصل.
- بخط عربي واضح وكبير ومناسب لطلبة أصحاب الهمم.
- بحجم ملف صغير ومناسب للرفع على منصة دعم.

## الملف الثاني: اختبار نهاية الفصل الدراسي

- بصيغة PowerPoint قابلة للتعديل.
- باستخدام قالب الاختبار الأصلي المرفق.
- مع الحفاظ الكامل على تصميم القالب وتنسيقه.
- متوافق مع الموجهات العامة لاختبارات أصحاب الهمم.
- مجموع درجاته 100 درجة.
- بخط كبير وواضح ومريح للقراءة.
- مع إضافة شرائح عند الحاجة بدلاً من تصغير الخط.
- السؤال 24 نقطة والبدائل 22 نقطة على الورقة المطبوعة، وفق جدول «حجم الشريحة».
- بحجم ملف صغير دون التأثير على جودة العرض والطباعة.

## الملف الثالث: نموذج الإجابة

- ملف منفصل خاص بالمعلم.
- يتضمن الإجابات وتوزيع الدرجات التفصيلي.
- متطابق مع نسخة الاختبار النهائية.
- منظم وواضح وسهل الاستخدام.
- بحجم ملف صغير ومناسب للرفع والمشاركة.

# الثاني عشر: تعليمات ختامية إلزامية

- لا تبدأ العمل قبل دراسة الملفات الثلاثة.
- لا تخترع أهدافاً أو معلومات غير موجودة في المصادر.
- لا تتجاهل أي هدف وارد في الخطة.
- لا تغير قالب الاختبار المعتمد.
- لا تتجاوز عدد الأسئلة المحدد للحلقة.
- لا تتجاوز أو تقل عن مجموع 100 درجة.
- لا تغير نسبة 75% المخصصة للاختيار من متعدد.
- لا تستخدم الأرقام الهندية أو العربية داخل الاختبار.
- لا تكتفِ بإعداد محتوى نصي؛ المطلوب ملفات فعلية قابلة للتعديل والتسليم.
- راجع الملفات بعد إنشائها وتأكد من سلامتها وجودتها.
- اجعل وضوح الخط وسهولة القراءة أولوية أساسية في جميع الملفات.
- لا تصغر الخط لاستيعاب المحتوى، بل أضف صفحات أو شرائح عند الحاجة.
- قلل حجم الملفات باستخدام ضغط الصور والوسائط دون التأثير على جودة المحتوى.
- تأكد من أن جميع الملفات النهائية مناسبة للرفع على منصة دعم.

**الهدف النهائي:** إنتاج مذكرة تعليمية واختبار نهاية فصل دراسي متكاملين، متوافقين مع الخطة التعليمية وكتاب المادة والموجهات العامة لاختبارات أصحاب الهمم، مع المحافظة التامة على قالب الاختبار الرسمي المعتمد من المدرسة، وتوفير تجربة قراءة مريحة وواضحة للطالب، مع الحفاظ على أحجام ملفات صغيرة تسهل مشاركتها ورفعها على منصة دعم.`?``:t,en:n===`# Daam Platform Requirements Prompt
## Preparing the study notes and the end-of-semester exam for students of determination (students with special needs)

You are a specialist in special education, curriculum development, and the design of school study notes and exams for students of determination, following the curricula and guidelines approved by the Ministry of Education of the United Arab Emirates.

I will attach 3 core files:

1. **The semester teaching plan:** it contains the objectives, skills and topics to be taught and assessed.
2. **The subject textbook:** the main academic reference for preparing the content and the questions.
3. **The approved exam template:** an official PowerPoint template that must be used as it is, without changing its design or formatting.

Your task is to study the three files carefully, then prepare study notes, an end-of-semester exam, and practice exercises that simulate the exam, in full compliance with the following instructions.

---

# 1. Studying and analysing the attachments

Before you start preparing the files:

1. Read the teaching plan and identify all the required objectives, skills and topics.
2. Review the textbook and identify the lessons and information linked to each objective.
3. Identify the grade, the cycle and the subject from the attached files.
4. Review the approved exam template and understand how it is organised and how its sections and marks are distributed.
5. Make sure the objectives in the plan match the content of the textbook.
6. Do not add any objectives or topics that are not in the teaching plan.

If you find anything missing or contradictory between the files, cannot determine the cycle, or do not have the official guidelines you need, ask for clarification before starting and do not assume information of your own.

# 2. Following the general guidelines for exams of students of determination

Follow the approved general guidelines for exams of students of determination, take individual differences and students' levels into account, and keep to the following structure:

## Cycle 1: Grades 1 to 4

- Total number of questions: 15.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 3 options only.
  2. Matching.

## Cycle 2: Grades 5 to 8

- Total number of questions: 20.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 4 options.
  2. Matching.
  3. Fill in the blank.

## Cycle 3: Grades 9 to 12

- Total number of questions: 20.
- Full mark: 100.
- Question types:
  1. Multiple choice, each question with 4 options.
  2. Short answer.

## Multiple-choice share for all cycles

Multiple-choice questions must make up 75% of the total exam marks in all cycles.

Accordingly:

- 75 of the 100 marks go to multiple-choice questions.
- 25 of the 100 marks go to the other question types set for the cycle.

The question types set for each cycle may not be replaced with other types.

The number and types of questions must match the cycle, and the remaining questions must be distributed in a suitable and fair way.

# 3. Rules for writing the exam questions

Follow these rules:

1. All questions are linked to the learning objectives in the plan.
2. The information comes from the subject textbook.
3. The wording suits the actual level of the target students.
4. Use short, clear and direct sentences.
5. Avoid complex wording and questions that could have more than one answer.
6. Avoid questions that test more than one skill at the same time unless necessary.
7. Use a suitable progression in difficulty.
8. Do not use information outside the required content.
9. Avoid repeating the same question in different wording.
10. Make sure every question has one correct, clear answer.
11. Use pictures or symbols when needed, provided they are linked to the learning objective and do not give away the answer.
12. Make sure pictures are clear, the font size is suitable and the exam is easy to read.

# 4. Distributing the marks

Every exam in all three cycles must be out of exactly 100 marks.

Distribute the marks as follows:

| Question type | Marks |
|---|---:|
| Multiple choice | 75 |
| Other types set for the cycle | 25 |
| Total | 100 |

Mandatory instructions:

1. Distribute each question's marks fairly and logically according to the number of items and the difficulty.
2. State each question's mark clearly.
3. In matching questions, state the mark of each item separately, not only the total for the question.
4. In fill-in-the-blank questions, state the mark of each blank.
5. In short-answer questions, state the mark for the answer and the answer elements that earn the marks.
6. Make the marks of all questions and items add up to exactly 100.
7. Do not leave any question or item without a mark.
8. Show the mark next to the question or item, clearly for both the student and the teacher.
9. Add a clear total box at the end of the exam: 100 marks.
10. Do a final arithmetic check that the marks are distributed correctly before delivering the exam.

The distribution of marks must not be a formality: it must match the number of items to be answered.

# 5. Using English (Western) numerals

This is mandatory in every exam, without exception.

Use English numerals only:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9

Eastern Arabic (Hindi) numerals are not allowed in the exam.

This covers:

- Question numbers.
- Option numbers.
- Page numbers.
- Marks.
- Dates.
- Numbers inside question texts.
- Any other numbers that appear on the exam pages.

All numbers used in the exam must be English numerals.

# 6. Preparing the study notes

Create complete study notes based on the teaching plan and the textbook.

They must include:

1. The title of the notes and the subject, grade and semester.
2. The content divided into units and lessons according to the plan.
3. A simple explanation of each topic.
4. Clear explanations of the key concepts and information.
5. Suitable worked examples.
6. Varied exercises after the lessons.
7. Review questions that help students retain the information.
8. A clear highlight of the skills the end-of-semester exam will measure.

Rules for the notes:

- Cover every learning objective without leaving any out.
- Use clear language suited to the students.
- Take into account the characteristics of students of determination and individual differences.
- Contain no incorrect academic information.
- Contain no topics outside the plan.
- Be organised, attractive, and easy to read and print.
- Use suitable pictures and illustrations when needed.

# 6 (continued). Clear fonts, easy reading and smaller files

These instructions are mandatory and apply to the study notes, the exam, the practice exercises and every file produced.

## A. Clear fonts and font sizes

Design every file so that it is easy to read for students of determination, taking into account individual differences, learning difficulties and low vision.

### In the study notes (Word):

- Use a clear, easy-to-read Arabic font.
- Body text no smaller than 18 pt, preferably 20 pt when the page space allows.
- Main headings 24–28 pt.
- Subheadings 20–22 pt.
- Use suitable spacing between lines and paragraphs.
- Leave enough white space between explanations and exercises.
- Do not crowd information or put too much text on one page.
- Highlight important words and concepts clearly.
- Make sure the text is also clear when printed in black and white.

### In the end-of-semester exam (PowerPoint):

- Give top priority to how clearly the student can read the questions.
- Font: Arial or Tahoma for Arabic text (or Dubai if the template uses it and it is available), and Arial or Calibri for English text; use one font throughout the exam.
- Question text 24 pt on the printed page.
- Multiple-choice options 22 pt on the printed page.
- These must be the real sizes after printing, not just the sizes typed in PowerPoint (see "Slide size" below).
- Make numbers, symbols and marks clear and easy to tell apart.
- Do not shrink the font to fit more questions on a slide.
- If a slide cannot hold the questions at a suitable size, add new slides while keeping the template's original design.
- Avoid overlapping text, cramped lines, and crowded pictures and options.
- Make the answer space suit the size of the student's handwriting.
- Leave enough space between the options so the student can read them and mark the answer easily.

### Slide size, so the font does not shrink when printed:

When a slide is printed on A4 paper, PowerPoint enlarges or shrinks it to fill the page, which changes the real font size on paper. Therefore:

1. Before adding the questions, open "Design → Slide Size" in the template and note the slide size.
2. Do not change the template's slide size, because that distorts its approved design.
3. Set the font size in PowerPoint so that on paper the question stays 24 pt and the options 22 pt:

| Template slide size | Question in PowerPoint | Options in PowerPoint |
|---|---:|---:|
| A4 portrait 21 × 29.7 cm (the size of the school's approved exam template) | 25 | 23 |
| A4 landscape or 4:3 (slide width 27.5 cm or less) | 24 | 22 |
| Widescreen 16:9 (slide width 33.867 cm) | 29 | 26 |
| Any other size | 24 ÷ (printable width 28.7 cm ÷ slide width), rounded up | 22 ÷ (printable width 28.7 cm ÷ slide width), rounded up |

4. If the slide is portrait, use a printable width of 20 cm instead of 28.7 cm in the calculation (A4 paper after printer margins).
5. Never use a size smaller than the table; if the slide cannot hold the content, add new slides.
6. In the school's approved template, the "س ( ): اكتب السؤال هنا" (write the question here) texts are in Arial 16; they are places for questions, not fixed elements. Write the questions in Arial at the sizes above (25 for questions, 23 for options) and do not keep size 16. The template's fixed headings (such as "الجزء: الموضوعي", "لكل مفردة … درجات" and the cover details) keep their font and size, with their values updated to match the exam.
7. The template fits three questions per slide at size 16; at the required sizes put one or two questions per slide and add slides with the same design until all questions are in.
8. At the end of your work, state the template's slide size and the font sizes you used.
9. Remind the teacher to print the exam with "Full Page Slides" and "Scale to Fit Paper" turned on, and not several slides per sheet, because that shrinks the font.

### Important note about the approved template:

If the original PowerPoint template uses small fonts, keep the template's identity and overall design, and enlarge the text you add so it can be read clearly, without changing the approved fixed elements.

Do not let keeping to a number of slides become a reason to shrink the font or sacrifice readability.

The priority is that the student can read the question and the options clearly without eye strain.

## B. Reducing file size without lowering quality

The final files must be as small as possible so teachers can easily upload them to the Daam platform, download them and share them.

Follow these points:

1. Compress pictures and graphics inside the Word and PowerPoint files.
2. Use pictures optimised in size and resolution without losing important detail.
3. Avoid very large or unnecessary pictures.
4. Do not insert pictures in high-resolution formats when it is not needed.
5. Remove hidden elements and unnecessary data that increase the file size.
6. Use suitable media compression settings in Office.
7. Do not turn whole pages or slides into pictures; the text must stay selectable and editable.
8. Keep print quality and the clarity of text and pictures.
9. Avoid repeating the same pictures inside the file at unnecessary sizes.
10. Choose formats that balance quality and small size.

## C. Checking the files before delivery

Before delivering the final files:

- Make sure each file's size is suitable for uploading to the Daam platform.
- Reduce file sizes as much as possible without affecting clarity.
- Open the files and check that the fonts are clear on screen and in print.
- Make sure pictures and graphics are still clear after compression.
- Make sure the formatting has not been distorted by reducing the file size.
- Make sure the files open normally in Microsoft Office.

**The main priority: clear content for the student first, then a smaller file without sacrificing reading and print quality.**

# 7. Adding exam practice at the end of the notes

At the end of the notes, add a separate section titled:

**End-of-Semester Exam Practice**

This section must work as a practice simulation of the real exam.

Conditions:

1. It simulates the question types set for the cycle.
2. It includes practice on every skill the exam measures.
3. It suits the student's level.
4. It contains varied questions that are not copied word for word from the exam.
5. Its questions resemble the exam in wording and difficulty.
6. It helps the student understand how to answer and prepare for the real exam.
7. It includes enough practice on multiple choice and the other types set for the cycle.

# 8. Keeping the approved PowerPoint exam template

This is one of the most important instructions in the task.

The exam template I will attach is a PowerPoint file approved by the school.

Work on a copy of the original PowerPoint file itself and insert the questions and content into it.

**Changing or redesigning the template is strictly forbidden.**

Keep all of the following:

- The original slide design.
- The template colours.
- The original fonts and sizes of the fixed elements.
- The logos and institutional identity.
- The header and footer.
- Tables, cells and borders.
- Margins and alignment.
- Slide backgrounds.
- The order of slides and sections.
- The layout of elements on each slide.
- Any fixed instructions or data in the template.

The task is only to fill the template with the required questions and data.

## Template details that must be updated to match the exam

The school template contains sample values that must be changed (without changing their font, size or position):

1. **Semester on the cover:** write the correct semester (first, second or third) as stated in the attached teaching plan. If the semester is not clear from the files, ask the teacher before preparing the exam; do not keep the value written in the template.
2. **Academic year:** 2026-2027.
3. **Other cover details:** the subject and grade; the student name and number boxes stay empty for the student to fill in.
4. **Marks table on the cover:** objective part (multiple choice) = 75, written part (the other types set for the cycle) = 25, total = 100.
5. **Part heading on each slide:** "الجزء: الموضوعي" (objective part) for multiple-choice slides and "الجزء: المقالي" (written part) for slides with the other types.
6. **"لكل مفردة … درجات" (marks per item) on each slide:** write the correct mark for that slide's questions according to your distribution. The value in the template (5 marks) is only an example and does not always fit; for example, in Cycle 1, 15 questions × 5 = only 75. If questions on one slide carry different marks, write each question's mark next to it.
7. Finally, check that the question marks add up to 75 for the objective part and 25 for the written part, matching the marks table on the cover and the answer key.

Do not create a new exam with a different design, and do not convert the template to Word or PDF as the required original file.

If the space in the template is not enough to show the questions clearly, add new slides using the template's original design and formatting; do not delete or shorten question content, and do not shrink the font in a way that harms readability.

If the template cannot be edited, or a technical problem prevents keeping its formatting, tell me about the problem before making any change to the design.

# 9. Preparing the answer key

Create a separate answer key for the teacher, including:

1. The correct answer to each question.
2. The correct answers for each item in matching questions.
3. The required answer for each blank.
4. The acceptable answer elements in short-answer questions.
5. The mark for each question and item.
6. A final table of the mark distribution with a check of the total.

The answer key must match the exam exactly in question numbers and order.

Do not put the answer key inside the student's copy of the exam.

# 10. Final review and quality assurance

Before delivering the files, carry out a full review that includes:

## Reviewing the notes:

- The notes match the teaching plan.
- All objectives are covered.
- The information is correct.
- The explanations suit the students' level.
- There is exam practice at the end.
- The font is clear and large enough.
- The notes are easy to read and print.
- The file size is suitable for uploading to the platform.

## Reviewing the exam:

- The number of questions set for the cycle is respected.
- The question types set for the cycle are respected.
- Multiple choice makes up 75% of the marks.
- The marks are correctly distributed out of 100.
- Each question's and item's mark is clear.
- Only English numerals are used.
- The answers are correct.
- The font, pictures and questions are clear.
- The slides are not crowded.
- There is no cut-off or overlapping text.
- The student can read the questions and options easily.

## Reviewing the PowerPoint template:

- Compare the final version with the original template.
- Make sure the template design has not changed.
- Make sure no fixed element was deleted.
- Make sure all questions appear correctly.
- Make sure there is no cut-off or overlapping text.
- Make sure the file can be edited, shown and printed.

## Reviewing file sizes:

- Pictures and media are suitably compressed.
- The files are as small as possible.
- The quality of text and pictures is not affected.
- The files can be opened, downloaded and uploaded to the Daam platform.

# 11. The final files required

I want 3 separate files delivered:

## File 1: The study notes

- An editable Word file.
- Covers all topics and objectives.
- Includes the exercises and activities.
- Ends with end-of-semester exam practice.
- Uses a large, clear Arabic font suitable for students of determination.
- A small file size suitable for uploading to the Daam platform.

## File 2: The end-of-semester exam

- An editable PowerPoint file.
- Uses the original attached exam template.
- Keeps the template's design and formatting completely.
- Complies with the general guidelines for exams of students of determination.
- Total of 100 marks.
- A large, clear font that is comfortable to read.
- Adds slides when needed instead of shrinking the font.
- Question 24 pt and options 22 pt on the printed page, following the "Slide size" table.
- A small file size without lowering display and print quality.

## File 3: The answer key

- A separate file for the teacher.
- Includes the answers and the detailed mark distribution.
- Matches the final version of the exam.
- Organised, clear and easy to use.
- A small file size suitable for uploading and sharing.

# 12. Mandatory final instructions

- Do not start work before studying the three files.
- Do not invent objectives or information that are not in the sources.
- Do not ignore any objective in the plan.
- Do not change the approved exam template.
- Do not exceed the number of questions set for the cycle.
- Do not go above or below a total of 100 marks.
- Do not change the 75% share for multiple choice.
- Do not use Eastern Arabic (Hindi) numerals in the exam.
- Do not stop at text content; real, editable files ready for delivery are required.
- Review the files after creating them and make sure they are sound and of good quality.
- Make clear fonts and easy reading a core priority in all files.
- Do not shrink the font to fit the content; add pages or slides when needed.
- Reduce file sizes by compressing pictures and media without lowering content quality.
- Make sure all final files are suitable for uploading to the Daam platform.

**The final goal:** to produce complete study notes and an end-of-semester exam that match the teaching plan, the subject textbook and the general guidelines for exams of students of determination, while fully keeping the school's official approved exam template, giving the student a comfortable and clear reading experience, and keeping file sizes small so they are easy to share and upload to the Daam platform.`?``:n}),k.pe={},J(`تم حفظ الأمر، ويظهر الآن للمعلمين.`,`Prompt saved; teachers now see it.`),$()},p(`نشر`,`Publish`))},z.promptUndo=()=>{k.pe={},$()},z.promptReset=()=>Q(p(`استعادة الأمر الأصلي للمنصة وحذف التعديلات المحفوظة؟ سيظهر الأمر الأصلي للمعلمين.`,`Restore the platform’s original prompt and remove the saved changes? Teachers will see the original prompt.`),async()=>{await L(`promptSet`,{ar:``,en:``}),k.pe={},J(`تمت استعادة الأمر الأصلي.`,`The original prompt was restored.`),$()},p(`استعادة`,`Restore`)),z.promptCopy=async()=>{let e=Ln(),t=()=>J(`تم نسخ الأمر. الصقه في محادثة جديدة مع Claude وأرفق الملفات الثلاثة.`,`Prompt copied. Paste it into a new chat with Claude and attach the three files.`);try{return await navigator.clipboard.writeText(e),t()}catch{}let n=document.createElement(`textarea`);n.value=e,n.setAttribute(`readonly`,``),n.style.cssText=`position:fixed;top:0;opacity:0`,document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand(`copy`)}catch{r=!1}n.remove(),r?t():Y(`تعذّر النسخ تلقائيًا. حدّد النص وانسخه يدويًا.`,`Could not copy automatically. Select the text and copy it manually.`)},z.promptDl=()=>Ue(Pn()===`ar`?`أمر-متطلبات-منصة-دعم.md`:`daam-requirements-prompt.md`,new Blob([`﻿`+Ln()],{type:`text/markdown;charset=utf-8`}));let Vn=[`home`,`memos`,`upload`,`log`,`sched`,`support`,`templates`,`prompt`,`report`];Ht.t.sort((e,t)=>Vn.indexOf(e[0])-Vn.indexOf(t[0])),B.t.report=()=>{let e=j(),t=t=>t>=e.slice(0,4)+`-08-01`&&t<e.slice(5)+`-08-01`,n=[...D.requests.values()].filter(e=>e.teacher===O.name&&t(e.at)),r=Qt(e),i=Zt(e),a=[];[...D.memos.values()].filter(t=>t.year===e).forEach(e=>e.versions.forEach(t=>{t.teacher===O.name&&a.push({m:e,v:t})}));let o={rq:p(`طلب دعم فوري`,`Instant support request`),ex:p(`اختبار نهاية فصل مرفوع`,`Final exam uploaded`),sc:p(`جدولة اختبار تكويني`,`Formative exam schedule`),mm:p(`مذكرة مراجعة مرفوعة`,`Review notes uploaded`)},s=[...n.map(e=>[e.at,[o.rq,`${w(C,e.type)} — ${P(e.studentId)}`,h(e.at),w(pe,gt(e))]]),...r.map(e=>[e.at,[o.ex,`${v(e.subject)} — ${b(e.sem)} — ${F(e)}`,h(e.at),w(S,R(e))]]),...i.map(e=>[e.at,[o.sc,`${x(e.type)} — ${v(e.subject)} — ${b(e.sem)} — ${y(e.grade,e.section)} — ${h(e.date)}`,h(e.at),w(fe,ht(e))]]),...a.map(({m:e,v:t})=>[t.at,[o.mm,`${v(e.subject)} — ${P(e.studentId)}`,h(t.at),(D.mrev.get(e.id)||{}).approved?p(`معتمدة`,`Approved`):p(`تم الرفع`,`Uploaded`)]])].sort((e,t)=>e[0]<t[0]?1:-1).map(e=>e[1]);return k.rep={title:p(`تقرير المعلم: `,`Teacher report: `)+O.name+` — `+e,sum:[[p(`طلبات الدعم الفوري`,`Instant support requests`),n.length],[p(`اختبارات رفعتها`,`Exams uploaded`),r.length],[p(`اختبارات جدولتها`,`Exams scheduled`),i.length],[p(`مذكرات رفعتها`,`Notes uploaded`),a.length]],head:[p(`النوع`,`Type`),p(`التفاصيل`,`Details`),p(`التاريخ`,`Date`),p(`الحالة`,`Status`)],rows:s},`${q(`تقريري`,`My Report`,p(`ملخص ما قدمته على المنصة خلال العام الدراسي، جاهز للتنزيل والطباعة.`,`A summary of what you did on the platform this academic year, ready to download and print.`))}${Ot()}${Dn()}${Wn(k.rep)}`},Ht.s.splice(7,0,[`myrep`,`award`,`تقرير إنجازي`,`My Achievement Report`]),B.s.myrep=()=>{let e=[...D.alog.values()],t=[...new Set([O.name,...e.map(e=>e.by)])].sort(),n=V(`q_who`,O.name),r=V(`q_from`),i=V(`q_to`),a=V(`q_cat`),o=e.filter(e=>(n===`all`||e.by===n)&&(!r||e.at.slice(0,10)>=r)&&(!i||e.at.slice(0,10)<=i)&&(!a||wn[e.type]===a)).sort((e,t)=>e.at<t.at?1:-1),s=e=>o.filter(t=>wn[t.type]===e).length;return k.rep={title:p(`تقرير إنجاز معلم التربية الخاصة: `,`Special education teacher achievement report: `)+(n===`all`?p(`جميع المعلمين`,`All teachers`):n)+(r||i?` (${r?h(r):`…`} — ${i?h(i):`…`})`:``),sum:[[p(`إجمالي الإجراءات`,`Total actions`),o.length],...Object.keys(Cn).map(e=>[p(Cn[e][0],Cn[e][1]),s(e)]).filter(e=>e[1]||!a)],head:[p(`التاريخ والوقت`,`Date and time`),p(`المعلم`,`Teacher`),p(`المجال`,`Area`),p(`الإجراء`,`Action`)],rows:o.map(e=>[g(e.at),e.by,p(Cn[wn[e.type]][0],Cn[wn[e.type]][1]),Tn(e)])},`${q(`تقرير إنجازي`,`My Achievement Report`,p(`كل إجراء يُسجَّل باسم من قام به، فتقرير كل معلم مستقل عن الآخر. يبدأ التسجيل من تاريخ إضافة هذه الخاصية.`,`Every action is recorded under the name of the person who did it, so each teacher’s report is separate. Recording starts from the date this feature was added.`))}
  <div class="card"><div class="fg" style="grid-template-columns:repeat(auto-fit,minmax(160px,1fr))">${U(p(`المعلم`,`Teacher`),`<select data-f="q_who" data-re="1">${t.map(e=>H(e,e===O.name?e+p(` (أنا)`,` (me)`):e,n)).join(``)}${H(`all`,p(`جميع معلمي التربية الخاصة`,`All special education teachers`),n)}</select>`)}${U(p(`من تاريخ`,`From`),`<input type="date" data-f="q_from" data-re="1" value="${m(r)}">`)}${U(p(`إلى تاريخ`,`To`),`<input type="date" data-f="q_to" data-re="1" value="${m(i)}">`)}${U(p(`المجال`,`Area`),wt(`q_cat`,Object.keys(Cn).map(e=>[e,p(Cn[e][0],Cn[e][1])]),{ph:p(`كل المجالات`,`All areas`),re:1}))}</div></div>
  ${Dn()}${Wn(k.rep)}`};let Hn=[[`r1`,`الاختبارات المستلمة`,`Received exams`],[`r2`,`الاختبارات غير المستلمة`,`Not received`],[`r3`,`الاختبارات قيد التعديل`,`Under revision`],[`r4`,`الجاهزة للتسليم للشؤون الأكاديمية`,`Ready for Academic Affairs`],[`r5`,`ملخص متطلبات كل طالب`,`Requirements per student`]];function Un(e){let t=V(`q_year`,j()),n=e=>V(`q_`+e),r=n(`sem`)?[+n(`sem`)]:[1,2,3],i=N().filter(e=>(!n(`student`)||e.id===n(`student`))&&(!n(`grade`)||+e.grade==+n(`grade`))&&(!n(`section`)||+e.section==+n(`section`))),a=e=>pt(e).map(e=>e.name).join(`، `)||`—`,o={t:p(`المعلم`,`Teacher`),st:p(`الطلاب المرتبطون`,`Linked students`),sj:p(`المادة`,`Subject`),cl:p(`الصف والشعبة`,`Class`),sm:p(`الفصل الدراسي`,`Semester`),s:p(`الحالة`,`Status`)};if(e===`r1`){let e=bn(),t=0;return e.forEach(e=>t+=pt(e).length),{title:p(`تقرير الاختبارات المستلمة`,`Received exams report`),sum:[[p(`ملفات اختبارات مستلمة`,`Exam files received`),e.length],[p(`متطلبات طلاب استوفيت`,`Student requirements met`),t],[p(`معلمون سلّموا`,`Teachers who submitted`),new Set(e.map(e=>e.teacher)).size]],head:[o.t,p(`الطلاب الذين استوفيت متطلباتهم`,`Students whose requirement is met`),o.sj,o.cl,o.sm,p(`تاريخ الرفع`,`Uploaded`),o.s],rows:e.map(e=>[e.teacher,a(e),v(e.subject),F(e),b(e.sem),h(st(e).at),w(S,R(e))])}}if(e===`r2`){let e=[],a=new Set;return r.forEach(r=>i.forEach(i=>ft(i,t,r).items.forEach(o=>{let s=mt(i,o.subject,t,r);!o.exam&&(!n(`subject`)||o.subject===n(`subject`))&&(!n(`teacher`)||s===n(`teacher`))&&(a.add(i.id),e.push([i.name,y(i.grade,i.section),v(o.subject),s||p(`غير محدد`,`Not set`),b(r)]))}))),{title:p(`تقرير الاختبارات غير المستلمة`,`Not received exams report`),sum:[[p(`اختبارات مطلوبة لم تُستلم`,`Required exams not received`),e.length],[p(`طلاب لديهم اختبارات غير مستلمة`,`Students with exams outstanding`),a.size]],head:[p(`الطالب`,`Student`),o.cl,p(`المادة التي لم يُرفع اختبارها`,`Subject with no exam uploaded`),p(`المعلم المسؤول عن التسليم`,`Teacher responsible`),o.sm],rows:e}}if(e===`r3`){let e=bn(`revision`);return{title:p(`تقرير الاختبارات قيد التعديل`,`Exams under revision report`),sum:[[p(`اختبارات تحتاج إلى تعديل`,`Exams needing revision`),e.length],[p(`أُعيد رفعها`,`Re-uploaded`),e.filter(e=>R(e)===`resub`).length]],head:[o.t,o.st,o.sj,o.cl,p(`ملاحظات التعديل المطلوبة`,`Requested changes`),p(`تاريخ طلب التعديل`,`Revision requested`),p(`هل أعاد المعلم الرفع؟`,`Re-uploaded by teacher?`)],rows:e.map(e=>{let t=D.xrev.get(e.id)||{};return[e.teacher,a(e),v(e.subject),F(e),t.comment||`—`,h(t.revAt||t.at),R(e)===`resub`?p(`نعم`,`Yes`):p(`لا`,`No`)]})}}if(e===`r4`){let e=bn(`ready`);return{title:p(`تقرير الاختبارات الجاهزة للتسليم للشؤون الأكاديمية`,`Exams ready for Academic Affairs report`),sum:[[p(`اختبارات جاهزة`,`Exams ready`),e.length]],head:[o.t,o.st,o.sj,o.cl,o.sm,p(`تاريخ انتهاء المراجعة`,`Review completed`)],rows:e.map(e=>[e.teacher,a(e),v(e.subject),F(e),b(e.sem),h((D.xrev.get(e.id)||{}).readyAt)])}}let s=[],c=0,l=0,u=0;return r.forEach(e=>i.forEach(r=>{let i=ft(r,t,e);(i.required||n(`sem`)!==``)&&(c+=i.required,l+=i.ready,u+=i.uploaded,s.push([r.name,y(r.grade,r.section),b(e),i.subs.map(v).join(`، `)||`—`,i.required,i.uploaded,i.awaiting+i.received,i.review,i.revision,i.ready,i.remaining,i.pct+`%`]))})),{title:p(`ملخص متطلبات الاختبارات لكل طالب`,`Exam requirements summary per student`),sum:[[p(`إجمالي المطلوب`,`Total required`),c],[p(`المرفوع`,`Uploaded`),u],[p(`الجاهز للتسليم`,`Ready`),l],[p(`نسبة الإنجاز (الجاهز ÷ المطلوب)`,`Completion (ready ÷ required)`),(c?Math.round(l/c*100):0)+`%`]],head:[p(`الطالب`,`Student`),o.cl,o.sm,p(`المواد المطلوبة`,`Required subjects`),p(`المطلوب`,`Required`),p(`المرفوع`,`Uploaded`),p(`المستلم`,`Received`),p(`قيد المراجعة`,`Under review`),p(`يحتاج تعديل`,`Needs revision`),p(`جاهز للتسليم`,`Ready`),p(`غير المستلم`,`Not received`),p(`نسبة الإنجاز`,`Completion`)],rows:s}}B.s.reports=()=>{let e=k.tab||`r1`,t=Un(e);return k.rep=t,`${q(`تقارير متابعة الاختبارات | Exam Tracking Reports`,`Exam Tracking Reports | تقارير متابعة الاختبارات`,p(`المطلوب يُحسب من قائمة متطلبات الطلاب، والمستلم من الملفات المرفوعة فعليًا. الملف الواحد يُعد مرة واحدة ولو غطى عدة طلاب.`,`Required counts come from the student requirements list; received counts come from files actually uploaded. One file is counted once even when it covers several students.`))}
  <div class="tabs">${Hn.map(([t,n,r])=>`<button class="tab ${e===t?`on`:``}" data-act="setv" data-k="tab" data-val="${t}">${m(p(n,r))}</button>`).join(``)}</div>
  ${yn([`year`,`sem`,`subject`,`teacher`,`student`,`grade`,`section`,...e===`r1`?[`status`]:[]])}
  <div class="row">${s?``:K(`repPrint`,p(`طباعة`,`Print`),{ic:`print`})}${K(`repXlsx`,p(`تصدير Excel`,`Export to Excel`),{ic:`dl`})}${K(`repPdf`,p(`تصدير PDF`,`Export to PDF`),{ic:`dl`})}</div>
  ${Wn(t)}`};let Wn=e=>`<div class="paper col" id="paper"><div class="row sp"><div><h2>${m(e.title)}</h2><p class="sm mut">${p(`مجمع زايد التعليمي – سهيلة | قسم التربية الخاصة`,`Zayed Education Complex – Suhaila | Special Education Department`)} — ${g(ne())}</p></div></div><div class="kv">${e.sum.map(([e,t])=>`<div><b>${m(t)}</b><span class="sm mut">${m(e)}</span></div>`).join(``)}</div>${G(e.head,e.rows.map(e=>e.map(m)),p(`لا توجد بيانات مطابقة لهذه التصفية.`,`No data matches these filters.`))}</div>`;async function Gn(e,t){let n=[[t.title],...t.sum.map(([e,t])=>[e,t]),[],t.head,...t.rows];if(window.XLSX){let r=window.XLSX,i=r.utils.aoa_to_sheet(n),a=r.utils.book_new();i[`!cols`]=t.head.map(()=>({wch:24})),f===`ar`&&(a.Workbook={Views:[{RTL:!0}]}),r.utils.book_append_sheet(a,i,`Report`),await Ue(e+`.xlsx`,new Blob([r.write(a,{type:`array`,bookType:`xlsx`})]))}else await Ue(e+`.csv`,new Blob([`﻿`+n.map(e=>e.map(e=>`"`+String(e??``).replace(/"/g,`""`)+`"`).join(`,`)).join(`
`)]))}z.repXlsx=()=>Gn(`daam-report`,k.rep),z.repPrint=()=>{try{window.print()}catch{Y(`الطباعة غير متاحة في هذا العرض. استخدم تصدير PDF.`,`Printing is not available in this view. Use Export to PDF.`)}},z.repPdf=async()=>{let e=te(`#paper`);if(!window.html2canvas||!window.jspdf||!e)return Y(`تصدير PDF غير متاح الآن. جرّب الطباعة أو تصدير Excel.`,`PDF export is not available right now. Try Print or Export to Excel.`);Nt(p(`جارٍ تجهيز ملف PDF…`,`Preparing the PDF…`));try{let t=await window.html2canvas(e,{scale:2,backgroundColor:`#ffffff`}),n=new window.jspdf.jsPDF({orientation:`l`,unit:`pt`,format:`a4`}),r=n.internal.pageSize.getWidth()-40,i=n.internal.pageSize.getHeight()-40,a=r/t.width,o=Math.floor(i/a);for(let e=0;e<t.height;e+=o){let i=document.createElement(`canvas`);i.width=t.width,i.height=Math.min(o,t.height-e);let s=i.getContext(`2d`);s.fillStyle=`#fff`,s.fillRect(0,0,i.width,i.height),s.drawImage(t,0,-e),e&&n.addPage(),n.addImage(i.toDataURL(`image/jpeg`,.9),`JPEG`,20,20,r,i.height*a)}await Ue(`daam-report.pdf`,n.output(`blob`))}catch{Y(`تعذّر إنشاء ملف PDF.`,`The PDF could not be created.`)}};function Kn(){let e=V(`q_year`,`all`),t=e=>V(`q_`+e),n=t(`type`),r=String(t(`text`)||``).trim().toLowerCase(),i=t(`status`),a=n=>(e===`all`||n.year===e)&&(!t(`sem`)||+n.sem==+t(`sem`))&&(!t(`subject`)||n.subject===t(`subject`))&&(!t(`teacher`)||n.teacher===t(`teacher`))&&(!t(`grade`)||+n.grade==+t(`grade`))&&(!t(`section`)||+n.section==+t(`section`));return{ex:n===`formative`?[]:[...D.exams.values()].filter(e=>a(e)&&(!i||(i===`revision`?[`revision`,`resub`].includes(R(e)):R(e)===i))&&(!t(`student`)||N().some(n=>n.id===t(`student`)&&+n.grade==+e.grade&&+n.section==+e.section&&ut(n.id,e.year,e.sem).includes(e.subject)))&&(!r||(e.teacher+` `+e.versions.map(e=>e.file.name).join(` `)).toLowerCase().includes(r))),sc:n===`final`||i||t(`student`)?[]:[...D.schedules.values()].filter(e=>a(e)&&(!r||e.teacher.toLowerCase().includes(r)))}}B.s.archive=()=>{let e=V(`q_year`,`all`),t=e=>V(`q_`+e),{ex:n,sc:r}=Kn(),i=[...n.map(e=>[e.at,[m(e.year),m(b(e.sem)),m(x(`final`)),m(v(e.subject)),m(F(e)),m(e.teacher),h(e.at),e.deleted?`<span class="bd c-gray">${p(`محذوف`,`Deleted`)}</span>`:T(S,R(e)),`${e.versions.length} ${p(`نسخة`,`version(s)`)}`,`<div class="row">${K(`examHist`,p(`النسخ والسجل`,`Versions and history`),{cls:`s`,ic:`clock`,d:{id:e.id}})}${K(`archDel`,p(`حذف نهائي`,`Delete permanently`),{cls:`s d`,ic:`trash`,d:{kind:`exam`,id:e.id}})}</div>`]]),...r.map(e=>[e.at,[m(e.year),m(b(e.sem)),m(x(e.type)),m(v(e.subject)),m(y(e.grade,e.section)),m(e.teacher),h(e.date),T(fe,ht(e)),`—`,K(`archDel`,p(`حذف نهائي`,`Delete permanently`),{cls:`s d`,ic:`trash`,d:{kind:`sched`,id:e.id}})]])].sort((e,t)=>e[0]<t[0]?1:-1).map(e=>e[1]),a=n.length+r.length?`<div class="card col" style="border-color:var(--red)"><h2>${p(`حذف نتائج الأرشيف المعروضة`,`Delete the archive results shown`)}</h2><p class="sm mut">${p(`يحذف نهائيًا كل ما يطابق التصفية الحالية: ${n.length} اختبار و${r.length} جدولة، مع كل النسخ والملفات وسجل المراجعة. لا تُرسل إشعارات للمعلمين. لا يمكن التراجع.`,`Permanently deletes everything matching the current filters: ${n.length} exam(s) and ${r.length} schedule(s), with every version, file and review history. Teachers are not notified. This cannot be undone.`)}</p><div class="fg">${En(`apw`)}<div class="f"><span>&nbsp;</span>${K(`archBulk`,p(`حذف النتائج المعروضة`,`Delete the results shown`),{cls:`d`,ic:`trash`})}</div></div></div>`:``;return`${q(`الأرشيف الإلكتروني`,`Electronic Archive`,p(`كل الاختبارات والجدولات والنسخ السابقة لجميع الأعوام. لا يُحذف شيء عند بدء عام جديد.`,`Every exam, schedule and earlier version across all years. Nothing is removed when a new year starts.`))}
  <div class="card"><div class="fg" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${U(p(`العام الدراسي`,`Academic year`),`<select data-f="q_year" data-re="1">${H(`all`,p(`كل الأعوام`,`All years`),e)}${ce.map(t=>H(t,t,e)).join(``)}</select>`)}${U(p(`نوع الاختبار`,`Exam type`),wt(`q_type`,[[`final`,p(`اختبارات نهاية الفصل`,`End-of-semester exams`)],[`formative`,p(`الاختبارات التكوينية (جدولة)`,`Formative assessments (schedules)`)]],{ph:p(`كل الأنواع`,`All types`),re:1}))}${U(p(`بحث باسم المعلم أو الملف`,`Search teacher or file name`),`<input type="search" data-f="q_text" data-re="1" value="${m(t(`text`))}">`)}</div></div>
  ${yn([`sem`,`subject`,`teacher`,`student`,`grade`,`section`,`status`])}
  ${t(`student`)?`<div class="row">${K(`reqLog`,p(`سجل متطلبات هذا الطالب في كل الفصول`,`This student’s requirement log across semesters`),{ic:`clock`,d:{sid:t(`student`)}})}</div>`:``}
  ${G([p(`العام`,`Year`),p(`الفصل`,`Semester`),p(`النوع`,`Type`),p(`المادة`,`Subject`),p(`الصف والشعبة`,`Class`),p(`المعلم`,`Teacher`),p(`التاريخ`,`Date`),p(`الحالة`,`Status`),p(`النسخ`,`Versions`),``],i,p(`لا توجد نتائج مطابقة.`,`No matching results.`))}
  ${a}`},z.archDel=e=>{let t=e.kind===`exam`?D.exams.get(e.id):D.schedules.get(e.id);if(!t)return;let n=e.kind===`exam`?p(`اختبار ${v(t.subject)} — ${b(t.sem)} — ${F(t)} (${t.teacher}) — ${t.year}`,`the ${v(t.subject)} exam — ${b(t.sem)} — ${F(t)} (${t.teacher}) — ${t.year}`):p(`جدولة ${x(t.type)} في ${v(t.subject)} — ${F(t)} (${t.teacher}) بتاريخ ${h(t.date)}`,`the ${x(t.type)} schedule in ${v(t.subject)} — ${F(t)} (${t.teacher}) on ${h(t.date)}`);Q(p(`حذف ${n} نهائيًا؟ `,`Permanently delete ${n}? `)+(e.kind===`exam`?p(`ستُحذف كل النسخ والملفات وسجل المراجعة. لا يمكن التراجع.`,`Every version, file and the review history will be removed. This cannot be undone.`):p(`ستُحذف الجدولة وحالتها. لا يمكن التراجع.`,`The schedule and its status will be removed. This cannot be undone.`)),async()=>{await L(`archDel`,{kind:e.kind,id:e.id}),J(`حُذف نهائيًا من الأرشيف.`,`Permanently deleted from the archive.`)},p(`حذف نهائي`,`Delete permanently`))},z.archBulk=()=>{let{ex:e,sc:t}=Kn(),n=String(V(`apw`));if(!n)return Y(`اكتب رمز الحماية لتأكيد الحذف.`,`Type the security code to confirm.`);Q(p(`سيُحذف نهائيًا ${e.length} اختبار و${t.length} جدولة مطابقة للتصفية الحالية، مع كل النسخ والملفات وسجل المراجعة. لن تُرسل إشعارات. لا يمكن التراجع.`,`${e.length} exam(s) and ${t.length} schedule(s) matching the current filters will be permanently deleted, with every version, file and review history. No notifications are sent. This cannot be undone.`),async()=>{let r=await L(`archBulk`,{examIds:e.map(e=>e.id),schedIds:t.map(e=>e.id),password:n});k.f.apw=``,J(`حُذف ${r.exams} اختبار و${r.schedules} جدولة.`,`Deleted ${r.exams} exam(s) and ${r.schedules} schedule(s).`)},p(`حذف نهائي`,`Delete permanently`))},B.s.acts=()=>{let e=j(),t=M(),n=k.tab||`def`,r=[...D.acts.values()].filter(n=>n.year===e&&+n.sem===t).sort((e,t)=>e.at<t.at?-1:1),i=[...D.psub.values()].filter(e=>r.some(t=>t.id===e.actId)).sort((e,t)=>e.at<t.at?1:-1),a;if(n===`def`){let e=k.atg||`all`;a=`<div class="card col"><h2>${k.edit?p(`تعديل النشاط`,`Edit activity`):p(`نشاط جديد`,`New activity`)} — ${m(b(t))}</h2><p class="sm mut">${p(`المطلوب نشاطان إلى ثلاثة في كل فصل. المحدد حاليًا: ${r.filter(e=>e.active!==!1).length}`,`Two to three activities are expected each semester. Currently set: ${r.filter(e=>e.active!==!1).length}`)}</p>
    <div class="fg">${U(p(`عنوان النشاط`,`Activity title`),Tt(`at`),`w`)}${U(p(`وصف مختصر يوضح المطلوب من ولي الأمر`,`Short description of what the parent should do`),Et(`ad`),`w`)}${U(p(`تاريخ بدء النشاط`,`Start date`),Tt(`as`,`date`))}${U(p(`آخر موعد للتنفيذ`,`Due date`),Tt(`ae`,`date`))}</div>
    <div class="f"><span>${p(`الطلاب المستهدفون`,`Target students`)}</span><div class="row"><label class="chk ${e===`all`?`on`:``}"><input type="checkbox" data-tg="all"${e===`all`?` checked`:``}>${p(`جميع الطلاب`,`All students`)}</label>${e===`all`?``:N().map(t=>`<label class="chk ${e.includes(t.id)?`on`:``}"><input type="checkbox" data-tg="${t.id}"${e.includes(t.id)?` checked`:``}>${m(t.name)}</label>`).join(``)}</div></div>
    <div class="row">${K(`actSave`,k.edit?p(`حفظ التعديل`,`Save changes`):p(`إضافة النشاط وإشعار أولياء الأمور`,`Add activity and notify parents`),{cls:`p`})}${k.edit?K(`actCancel`,p(`إلغاء`,`Cancel`)):``}</div></div>
    ${G([p(`النشاط`,`Activity`),p(`البدء`,`Start`),p(`آخر موعد`,`Due`),p(`المستهدفون`,`Targets`),p(`الحالة`,`Status`),``],r.map(e=>[`<span class="b">${m(e.title)}</span><div class="sm mut">${m(e.desc)}</div>`,h(e.start),h(e.due),e.targets===`all`?p(`جميع الطلاب`,`All students`):(e.targets||[]).map(e=>m(P(e))).join(`، `),e.active===!1?`<span class="bd c-gray">${p(`موقوف`,`Stopped`)}</span>`:`<span class="bd c-green">${p(`فعّال`,`Active`)}</span>`,`<div class="row">${K(`actEdit`,p(`تعديل`,`Edit`),{cls:`s`,d:{id:e.id}})}${K(`actToggle`,e.active===!1?p(`تفعيل`,`Activate`):p(`إيقاف`,`Stop`),{cls:`s`,d:{id:e.id}})}${K(`actDel`,p(`حذف`,`Delete`),{cls:`s d`,ic:`trash`,d:{id:e.id}})}</div>`]),p(`لم تُحدد أنشطة لهذا الفصل بعد.`,`No activities set for this semester yet.`))}`}else if(n===`subs`)a=i.length?`<div class="sgrid">${i.map(e=>{let t=D.acts.get(e.actId),n=vt(t,e.studentId),r=D.arev.get(e.id)||{};return`<div class="card col" style="gap:8px"><div class="row sp"><h3>${m(t.title)}</h3>${T(yt,n)}</div><p class="sm">${m(P(e.studentId))} — <span class="mut">${m(e.parent||``)} — ${g(e.at)}</span></p><div class="thumbs">${e.photos.map(e=>`<figure><img alt="" loading="lazy" ${e.kind===`asset`?`src="/_blob/${m(e.ref)}"`:`data-lazy="${Kt(e)}"`} data-act="viewfile" data-k="${Kt(e)}" style="cursor:pointer"></figure>`).join(``)}</div>${r.note&&n===`more`?`<p class="sm note">${m(r.note)}</p>`:``}<div class="row">${n===`approved`?``:K(`actRev`,p(`اعتماد المشاركة`,`Approve submission`),{cls:`s p`,ic:`check`,d:{id:e.id,st:`approved`}})}${K(`actMore`,p(`طلب استكمال`,`Ask to complete`),{cls:`s`,d:{id:e.id}})}${K(`subDel`,p(`حذف المشاركة`,`Delete submission`),{cls:`s d`,ic:`trash`,d:{id:e.id}})}</div></div>`}).join(``)}</div>`:`<div class="empty">${p(`لم تصل مشاركات من أولياء الأمور في هذا الفصل بعد.`,`No parent submissions this semester yet.`)}</div>`;else{let n=r.filter(e=>e.active!==!1),o=N(),s=o.map(n=>{let r=bt(n.id,e,t);return[n.name,y(n.grade,n.section),r.total,r.sent,r.ok,r.pct+`%`]}),c=o.filter(n=>bt(n.id,e,t).sent>0).length,l=i.filter(e=>vt(D.acts.get(e.actId),e.studentId)===`approved`).length,u=0,ee=0;o.forEach(n=>{let r=bt(n.id,e,t);u+=r.total,ee+=r.sent}),k.rep={title:p(`متابعة أنشطة أولياء الأمور — `,`Parent activities follow-up — `)+b(t)+` `+e,sum:[[p(`أنشطة محددة`,`Activities set`),n.length],[p(`أولياء أمور أرسلوا`,`Parents who sent`),c],[p(`مشاركات معتمدة`,`Approved submissions`),l],[p(`مشاركات لم تُرسل`,`Not sent yet`),u-ee]],head:[p(`الطالب`,`Student`),p(`الصف والشعبة`,`Class`),p(`الأنشطة`,`Activities`),p(`أُرسلت`,`Sent`),p(`معتمدة`,`Approved`),p(`نسبة الإنجاز`,`Completion`)],rows:s},a=`${At(k.rep.sum.map(([e,t],n)=>[t,e,[`pri`,`blue`,`green`,`red`][n],{act:`noop`}]))}<div class="row">${K(`repXlsx`,p(`تصدير Excel`,`Export to Excel`),{ic:`dl`})}${K(`actPdf`,k.pdfBusy?p(`جارٍ إنشاء الملف…`,`Creating the file…`):p(`تصدير PDF للتوثيق (بالصور)`,`Export PDF with photos`),{cls:`p`,ic:`print`,dis:k.pdfBusy})}<span class="xs mut">${p(`يشمل الفصول الثلاثة للعام ${e}`,`Covers all three semesters of ${e}`)}</span></div>${G([...k.rep.head,``],o.map((n,r)=>{let i=bt(n.id,e,t);return[...s[r].map(m),`<div class="row">${i.total&&i.ok===i.total?K(`cert`,p(`شهادة الشكر`,`Certificate`),{cls:`s p`,ic:`award`,d:{sid:n.id,sem:t}}):``}${i.total&&i.sent<i.total?K(`remind`,p(`تذكير ولي الأمر`,`Remind parent`),{cls:`s`,ic:`bell`,d:{sid:n.id}}):``}</div>`]}))}`}return`${q(`أنشطة أولياء الأمور`,`Parent Activities`)}${Ot()}${kt()}<div class="row">${[[`def`,p(`تحديد الأنشطة`,`Set activities`)],[`subs`,p(`مراجعة المشاركات`,`Review submissions`)+(i.filter(e=>vt(D.acts.get(e.actId),e.studentId)===`sent`).length?` (${i.filter(e=>vt(D.acts.get(e.actId),e.studentId)===`sent`).length})`:``)],[`follow`,p(`لوحة المتابعة`,`Follow-up`)]].map(([e,t])=>`<button class="chk ${n===e?`on`:``}" data-act="setv" data-k="tab" data-val="${e}">${m(t)}</button>`).join(``)}</div>${a}`},z.noop=()=>{},z.actPdf=async()=>{k.pdfBusy=!0,$(),Nt(p(`جارٍ تجهيز ملف PDF بالصور… قد يستغرق ذلك دقيقة.`,`Preparing the PDF with photos… this can take a minute.`),``,null,9e3);try{if(e.pdfInPage)await Ue(`parent-activities-${j()}.pdf`,await e.pdfInPage({get:(e,t)=>D[e].get(String(t)),all:e=>[...D[e].values()],getBlob:He,name:O.name},j(),f));else{let e=await Me(`actPdf`,{year:j(),lang:f});await Ue(e.file.name,await He(e.file))}J(`تم إنشاء ملف PDF.`,`The PDF was created.`)}catch(e){I(e)}k.pdfBusy=!1,$()},z.actDel=e=>{let t=D.acts.get(e.id);Q(p(`حذف نشاط «${t.title}» نهائيًا مع جميع مشاركات أولياء الأمور وصورهم فيه؟`,`Permanently delete “${t.title}” with all parent submissions and photos for it?`),async()=>{await L(`actDel`,{id:e.id}),k.edit===e.id&&(k.edit=null,k.f={}),J(`حُذف النشاط.`,`Activity deleted.`)},p(`حذف`,`Delete`))},z.subDel=e=>{let t=D.psub.get(e.id);Q(p(`حذف مشاركة ولي أمر الطالب ${P(t.studentId)} وصورها نهائيًا؟`,`Permanently delete the submission and photos from the parent of ${P(t.studentId)}?`),async()=>{await L(`subDel`,{id:e.id}),J(`حُذفت المشاركة.`,`Submission deleted.`)},p(`حذف`,`Delete`))},z.actEdit=e=>{let t=D.acts.get(e.id);k.edit=e.id,k.tab=`def`,k.f={at:t.title,ad:t.desc,as:t.start,ae:t.due},k.atg=t.targets===`all`?`all`:[...t.targets],$(),window.scrollTo(0,0)},z.actCancel=()=>{k.edit=null,k.f={},k.atg=`all`,$()},z.actToggle=e=>L(`actToggle`,{id:e.id}).then($).catch(I),z.actSave=async()=>{let e=k.f,t=String(e.at||``).trim(),n=k.atg||`all`;if(t.length<3||!e.ae)return Y(`اكتب عنوان النشاط وحدد آخر موعد للتنفيذ.`,`Type the activity title and set the due date.`);if(n!==`all`&&!n.length)return Y(`اختر طالبًا واحدًا على الأقل.`,`Choose at least one student.`);try{await L(`actSave`,{...k.edit?{id:k.edit}:{},title:t,desc:String(e.ad||``).trim(),start:e.as||``,due:e.ae,targets:n,year:j(),sem:M()}),k.edit=null,k.f={},k.atg=`all`,J(`تم حفظ النشاط.`,`Activity saved.`),$()}catch(e){I(e)}};async function qn(e,t,n){await L(`actReview`,{id:e,st:t,note:n||``}),$()}z.actRev=e=>qn(e.id,e.st).then(()=>J(`تم اعتماد المشاركة.`,`Submission approved.`)).catch(I),z.actMore=e=>{k.amid=e.id,k.f.amnote=``,X(()=>`${Z(p(`طلب استكمال النشاط`,`Ask to complete the activity`))}${U(p(`وضّح الملاحظات لولي الأمر`,`Explain what is needed`),Et(`amnote`))}<div class="row" style="justify-content:flex-end">${K(`close`,p(`إلغاء`,`Cancel`))}${K(`actMoreSend`,p(`إرسال`,`Send`),{cls:`p`})}</div>`)},z.actMoreSend=()=>{let e=String(k.f.amnote||``).trim();if(e.length<3)return Y(`اكتب الملاحظات.`,`Write the comments.`);qn(k.amid,`more`,e).then(Ft).catch(I)},z.remind=e=>L(`remind`,{sid:e.sid}).then(()=>J(`أُرسل التذكير لولي الأمر.`,`Reminder sent to the parent.`)).catch(I);let Jn=e=>[...D.pans.values()].filter(t=>t.surveyId===e.id&&De(t.studentId));B.s.surveys=()=>{let e=j(),t=M(),n=xt(e,t),r=e+`_`+t;(k.svKey!==r||n&&!k.sv||!n&&k.sv)&&(k.svKey=r,k.sv=n?JSON.parse(JSON.stringify(n)):null);let i=`${q(`استبيان رضا ولي الأمر عن الخدمات المقدمة`,`Parent Satisfaction Survey`)}${Ot()}${kt()}`;if(!n)return`${i}<div class="empty">${p(`لم يُعد استبيان لهذا الفصل بعد.`,`No survey has been prepared for this semester yet.`)}<div style="margin-top:10px">${K(`svNew`,p(`إعداد استبيان هذا الفصل`,`Prepare this semester’s survey`),{cls:`p`,ic:`plus`})}</div></div>`;let a=k.sv,o=Jn(n),s=N().filter(e=>e.active!==!1&&St(n,e.id)),c=s.filter(n=>Ct(n.id,e,t)===`done`),l=[];o.forEach(e=>e.answers.forEach(e=>l.push(e.v)));let u=l.length?l.reduce((e,t)=>e+t,0)/l.length:0,ee={};o.forEach(e=>e.answers.forEach(e=>{let t=e.q.ar;(ee[t]=ee[t]||{q:e.q,c:[0,0,0,0,0]}).c[5-e.v]++}));let te=[`green`,`blue`,`gray`,`orange`,`red`];return k.rep={title:p(`نتائج استبيان رضا أولياء الأمور — `,`Parent satisfaction survey results — `)+b(t)+` `+e,sum:[[p(`أولياء أمور مستهدفون`,`Parents targeted`),s.length],[p(`استبيانات مكتملة`,`Completed`),c.length],[p(`لم تُستكمل`,`Not completed`),s.length-c.length],[p(`نسبة المشاركة`,`Participation`),(s.length?Math.round(c.length/s.length*100):0)+`%`],[p(`متوسط الرضا من 5`,`Average satisfaction out of 5`),u.toFixed(2)]],head:[p(`الطالب`,`Student`),p(`الصف والشعبة`,`Class`),p(`ولي الأمر`,`Parent`),p(`التاريخ`,`Date`),...n.questions.map(e=>p(e.ar,e.en||e.ar)),p(`الملاحظات والمقترحات`,`Comments and suggestions`)],rows:o.map(e=>{let t=De(e.studentId);return[t.name,y(t.grade,t.section),e.parent||``,h(e.at),...n.questions.map(t=>{let n=e.answers.find(e=>e.q.ar===t.ar);return n?p(me[5-n.v][0],me[5-n.v][1]):``}),e.comment||``]})},`${i}
  <div class="card col"><h2>${p(`إعداد الاستبيان`,`Survey setup`)}</h2><div class="row"><label class="chk ${a.open?`on`:``}"><input type="checkbox" data-svo="1"${a.open?` checked`:``}>${p(`متاح لأولياء الأمور`,`Open to parents`)}</label><label class="row sm">${p(`تاريخ الإتاحة`,`Opens on`)}<input type="date" data-svd="1" value="${m(a.openDate||``)}" style="width:auto"></label></div>
  ${(()=>{let e=a.targets||`all`;return`<div class="f"><span>${p(`أولياء الأمور المستهدفون (حسب الطالب)`,`Parents who get the survey (by student)`)}</span><div class="row"><label class="chk ${e===`all`?`on`:``}"><input type="checkbox" data-svtg="all"${e===`all`?` checked`:``}>${p(`جميع أولياء الأمور`,`All parents`)}</label>${e===`all`?``:N().filter(e=>e.active!==!1).map(t=>`<label class="chk ${e.includes(t.id)?`on`:``}"><input type="checkbox" data-svtg="${t.id}"${e.includes(t.id)?` checked`:``}>${m(t.name)}</label>`).join(``)}</div></div>`})()}
  <div class="col" style="gap:8px">${a.questions.map((e,t)=>`<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><span class="b" style="padding-top:9px">${t+1}</span><div class="grow col" style="gap:5px"><input type="text" data-sq="${t}" data-l="ar" value="${m(e.ar)}" placeholder="${p(`نص السؤال بالعربية`,`Question in Arabic`)}"><input type="text" class="ltr" data-sq="${t}" data-l="en" value="${m(e.en||``)}" placeholder="${p(`نص السؤال بالإنجليزية (اختياري)`,`Question in English (optional)`)}"></div>${K(`svQdel`,``,{cls:`s d`,ic:`trash`,d:{i:t}})}</div>`).join(``)}</div>
  <div class="row">${K(`svQadd`,p(`إضافة سؤال`,`Add question`),{ic:`plus`})}${K(`svSave`,p(`حفظ الاستبيان`,`Save survey`),{cls:`p`})}</div><p class="xs mut">${p(`تعديل الأسئلة لا يغيّر الإجابات المحفوظة سابقًا؛ كل إجابة تُحفظ مع نص سؤالها.`,`Editing questions does not change answers already saved; each answer is stored with its question text.`)}</p></div>
  <h2>${p(`متابعة الاستبيان`,`Survey follow-up`)}</h2>${At(k.rep.sum.map(([e,t],n)=>[t,e,[`pri`,`green`,`red`,`blue`,`gold`][n],{act:`noop`}]))}
  <div class="row">${K(`repXlsx`,p(`تصدير النتائج إلى Excel`,`Export results to Excel`),{ic:`dl`})}</div>
  <div class="card col"><h2>${p(`تحليل نتائج كل سؤال`,`Results per question`)}</h2>${Object.values(ee).length?Object.values(ee).map(e=>{let t=e.c.reduce((e,t)=>e+t,0),n=e.c.reduce((e,t,n)=>e+t*(5-n),0)/t;return`<div><div class="row sp sm"><span class="b">${m(p(e.q.ar,e.q.en||e.q.ar))}</span><span>${n.toFixed(2)} / 5</span></div><div class="dist">${e.c.map((e,n)=>`<i class="c-${te[n]}" style="width:${e/t*100}%;background:var(--${te[n]})" title="${m(p(me[n][0],me[n][1]))}: ${e}"></i>`).join(``)}</div><div class="xs mut">${e.c.map((e,t)=>`${m(p(me[t][0],me[t][1]))}: ${e}`).join(` | `)}</div></div>`}).join(``):`<p class="mut">${p(`لا توجد إجابات بعد.`,`No answers yet.`)}</p>`}</div>
  <div class="card col"><h2>${p(`ملاحظات ومقترحات أولياء الأمور`,`Parent comments and suggestions`)}</h2>${o.filter(e=>e.comment).map(e=>`<p class="sm"><span class="b">${m(P(e.studentId))}:</span> ${m(e.comment)}</p>`).join(``)||`<p class="mut">${p(`لا توجد ملاحظات مكتوبة.`,`No written comments.`)}</p>`}</div>
  ${G([p(`الطالب`,`Student`),p(`الصف والشعبة`,`Class`),p(`حالة الاستبيان`,`Survey status`),``],s.map(n=>{let r=Ct(n.id,e,t);return[m(n.name),m(y(n.grade,n.section)),r===`done`?`<span class="bd c-green">${p(`تم الاستكمال`,`Completed`)}</span>`:`<span class="bd c-gray">${p(`لم يُستكمل`,`Not completed`)}</span>`,r===`done`?K(`svReopen`,p(`إعادة فتح الاستبيان له`,`Reopen for this parent`),{cls:`s`,d:{sid:n.id}}):K(`remind`,p(`تذكير ولي الأمر`,`Remind parent`),{cls:`s`,ic:`bell`,d:{sid:n.id}})]}))}`},z.svNew=async()=>{try{await L(`svNew`,{year:j(),sem:M(),questions:he.map(([e,t])=>({ar:e,en:t}))}),k.sv=null,$()}catch(e){I(e)}},z.svQadd=()=>{k.sv.questions.push({ar:``,en:``}),$()},z.svQdel=e=>{k.sv.questions.splice(+e.i,1),$()},z.svSave=async()=>{let e=k.sv,t=e.questions.map(e=>({ar:String(e.ar||``).trim(),en:String(e.en||``).trim()})).filter(e=>e.ar);if(!t.length)return Y(`أضف سؤالًا واحدًا على الأقل.`,`Add at least one question.`);let n=e.targets||`all`;if(n!==`all`&&!n.length)return Y(`اختر ولي أمر طالب واحد على الأقل.`,`Choose at least one student’s parent.`);try{await L(`svSave`,{id:e.id,open:!!e.open,openDate:e.openDate||``,questions:t,targets:n}),k.sv=null,J(`تم حفظ الاستبيان.`,`Survey saved.`),$()}catch(e){I(e)}},z.svReopen=e=>{L(`svReopen`,{surveyId:xt(j(),M()).id,sid:e.sid}).then(()=>{J(`أُعيد فتح الاستبيان لولي الأمر.`,`Survey reopened for this parent.`),$()}).catch(I)};let Yn=()=>{let e=Oe();return e.find(e=>e.id===k.kid)||e[0]},Xn=()=>{let e=Oe();return e.length>1?`<label class="row sm"><span class="mut">${p(`الطالب`,`Student`)}</span><select data-v="kid" style="width:auto">${e.map(e=>H(e.id,e.name,Yn().id)).join(``)}</select></label>`:``},Zn=()=>`<div class="empty">${p(`لا يوجد طالب مرتبط بهذا الرمز حاليًا. تواصل مع معلم التربية الخاصة.`,`No student is linked to this code right now. Contact the special education teacher.`)}</div>`;B.p.home=()=>{let e=Yn();if(!e)return Zn();let t=we(),n=Te(),r=bt(e.id,t,n),i=Ct(e.id,t,n),a=_t(e.id,t,n).filter(t=>[`none`,`more`].includes(vt(t,e.id)));return`${q(`مرحبًا بك`,`Welcome`,O.name)}${Xn()}
  <div class="card col"><div class="row sp"><div><h2>${m(e.name)}</h2><p class="mut sm">${m(y(e.grade,e.section))} — ${m(b(n))} ${m(t)}</p></div></div>
  <div><div class="row sp sm"><span>${p(`إنجاز الأنشطة الفصلية`,`Semester activities completed`)}</span><span class="b">${r.ok} / ${r.total} — ${r.pct}%</span></div><div class="bar"><i style="width:${r.pct}%"></i></div></div>
  <div class="row sp sm"><span>${p(`الاستبيان الفصلي`,`Semester survey`)}</span>${i===`done`?`<span class="bd c-green">${p(`تم الاستكمال`,`Completed`)}</span>`:i===`open`?`<span class="bd c-amber">${p(`متاح — لم يُستكمل`,`Open — not completed`)}</span>`:`<span class="bd c-gray">${p(`غير متاح حاليًا`,`Not open yet`)}</span>`}</div></div>
  <div class="card col"><h2>${p(`المطلوب منك الآن`,`What needs your attention`)}</h2>${a.map(e=>`<div class="row sp"><span>${E(`heart`)} ${m(e.title)} <span class="xs mut">${p(`آخر موعد`,`due`)} ${h(e.due)}</span></span>${K(`pAct`,p(`إضافة صور النشاط`,`Add activity photos`),{cls:`s p`,d:{id:e.id}})}</div>`).join(``)}${i===`open`?`<div class="row sp"><span>${E(`form`)} ${p(`استبيان رضا ولي الأمر`,`Parent satisfaction survey`)}</span>${K(`go`,p(`الإجابة عن الاستبيان`,`Answer the survey`),{cls:`s p`,d:{view:`survey`}})}</div>`:``}${!a.length&&i!==`open`?`<p class="mut">${p(`لا توجد مهام مطلوبة الآن. شكرًا لتعاونكم.`,`Nothing is needed right now. Thank you for your cooperation.`)}</p>`:``}</div>
  <div class="card"><h2>${p(`الإشعارات`,`Notifications`)}</h2>${Gt(5)?`<div style="border:1px solid var(--line);border-radius:10px;overflow:hidden">${Gt(5)}</div>`:`<p class="mut">${p(`لا توجد إشعارات جديدة.`,`No new notifications.`)}</p>`}</div>`};let Qn=()=>[,,].fill(null),$n=e=>(k.slots=k.slots||{})[e]||(k.slots[e]=Qn()),er=(e,t)=>{let n=vt(e,t.id),r=D.arev.get(e.id+`_`+t.id)||{},i=D.psub.get(e.id+`_`+t.id),a=n===`none`||k.resend&&k.resend[e.id]&&n!==`approved`,o=$n(e.id),s=o.filter(Boolean).length,c=a?o.map((t,n)=>t?`<figure class="slot on"><img alt="" src="${t.url}"><button data-act="slotDel" data-id="${e.id}" data-i="${n}" aria-label="${p(`حذف الصورة`,`Remove photo`)}">×</button><figcaption>${p(`صورة `,`Photo `)}${n+1}</figcaption></figure>`:`<label class="slot"><input type="file" accept="image/*" data-slot="${e.id}" data-i="${n}" hidden><b>+</b><span>${p(`اضغط للإضافة`,`Tap to add`)}</span><figcaption>${p(`صورة `,`Photo `)}${n+1}</figcaption></label>`).join(``):(i?i.photos:[]).map((e,t)=>`<figure class="slot on"><img alt="" data-lazy="${Kt(e)}" data-act="viewfile" data-k="${Kt(e)}" style="cursor:pointer"><figcaption>${p(`صورة `,`Photo `)}${t+1}</figcaption></figure>`).join(``);return`<div class="card col" style="gap:8px" id="act_${e.id}"><div class="row sp"><h3>${m(e.title)}</h3>${T(yt,n)}</div><p class="sm">${m(e.desc)}</p><p class="xs mut">${m(b(e.sem))} — ${p(`آخر موعد للتنفيذ: `,`Due: `)}${h(e.due)}</p>${n===`more`&&r.note?`<p class="note">${m(r.note)}</p>`:``}
  <div class="row sp sm"><span>${p(`مطلوب صورتان لهذا النشاط`,`2 photos are required for this activity`)}</span><span class="b">${a?s:i?i.photos.length:0} / ${a||!i?2:Math.max(2,i.photos.length)}</span></div>
  <div class="slots">${c}</div>
  ${a?`<div class="row">${K(`slotSend`,k.sending===e.id?p(`جارٍ الإرسال…`,`Sending…`):p(`إرسال النشاط`,`Send activity`),{cls:`p`,ic:`up`,d:{id:e.id},dis:s<2||k.sending===e.id})}${n===`none`?``:K(`slotCancel`,p(`إلغاء`,`Cancel`),{d:{id:e.id}})}</div>${s<2?`<p class="xs mut">${p(`يُفعَّل الإرسال بعد إضافة الصورتين`,`Sending is enabled once both photos are added`)}</p>`:``}`:n===`approved`?``:`<div class="row">${K(`slotResend`,p(`تعديل الصور وإعادة الإرسال`,`Change photos and resend`),{cls:n===`more`?`p`:``,ic:`edit`,d:{id:e.id}})}</div>`}</div>`};B.p.acts=()=>{let e=Yn();if(!e)return Zn();let t=we(),n=M(),r=_t(e.id,t,n);return`${q(`أنشطة أسرتي`,`My Family Activities`,e.name)}${Xn()}${kt()}${r.length?`<div class="sgrid">${r.map(t=>er(t,e)).join(``)}</div>`:`<div class="empty">${p(`لا توجد أنشطة محددة في هذا الفصل بعد.`,`No activities set for this semester yet.`)}</div>`}`},z.pAct=e=>{let t=D.acts.get(e.id);zt(`acts`,t?{sem:t.sem}:null),setTimeout(()=>{let t=document.getElementById(`act_`+e.id);t&&t.scrollIntoView({block:`start`,behavior:`smooth`})},50)},z.slotDel=e=>{$n(e.id)[+e.i]=null,$()},z.slotResend=e=>{k.resend=k.resend||{},k.resend[e.id]=!0,k.slots[e.id]=Qn(),$()},z.slotCancel=e=>{k.resend&&(k.resend[e.id]=!1),k.slots&&(k.slots[e.id]=Qn()),$()},z.slotSend=async e=>{let t=Yn(),n=$n(e.id);if(n.some(e=>!e))return I({code:`photos_required`});k.sending=e.id,$();try{let r=[];for(let e of n)r.push(await Ve(e.file,[`jpg`,`jpeg`,`png`,`webp`],`photo`));await L(`pActSend`,{actId:e.id,sid:t.id,fileIds:r}),k.slots[e.id]=Qn(),k.resend&&(k.resend[e.id]=!1),k.sending=null,$(),X(()=>`${Z(p(`شكرًا لكم`,`Thank you`))}<p>${p(`تم إرسال النشاط بنجاح. نشكر لكم مشاركتكم وتعاونكم مع قسم التربية الخاصة.`,`The activity was sent. Thank you for taking part and working with the Special Education Department.`)}</p><div class="row" style="justify-content:flex-end">${K(`close`,p(`إغلاق`,`Close`),{cls:`p`})}</div>`)}catch(e){k.sending=null,$(),I(e)}},B.p.survey=()=>{let e=Yn();if(!e)return Zn();let t=we(),n=Te(),r=xt(t,n),i=Ct(e.id,t,n),a=`${q(`استبيان رضا ولي الأمر عن الخدمات المقدمة`,`Parent Satisfaction Survey`,e.name+` — `+b(n))}${Xn()}`;if(i===`done`)return`${a}<div class="card col" style="text-align:center"><span class="bd c-green" style="align-self:center">${p(`تم الاستكمال`,`Completed`)}</span><p>${p(`شكرًا وتقديرًا لمشاركتكم؛ رأيكم يساعدنا على تحسين الخدمات المقدمة لابنكم.`,`Thank you. Your view helps us improve the services your child receives.`)}</p></div>`;if(i!==`open`)return`${a}<div class="empty">${p(`استبيان هذا الفصل غير متاح حاليًا. سيصلك إشعار عند فتحه.`,`This semester’s survey is not open yet. You will be notified when it opens.`)}</div>`;let o=k.ans||{};return`${a}<div class="card col">${r.questions.map((e,t)=>`<div class="col" style="gap:6px"><span class="b">${t+1}. ${m(p(e.ar,e.en||e.ar))}</span><div class="likert">${me.map((e,n)=>`<label class="${o[t]===5-n?`on`:``}"><input type="radio" name="q${t}" data-ans="${t}" value="${5-n}"${o[t]===5-n?` checked`:``}>${m(p(e[0],e[1]))}</label>`).join(``)}</div></div>`).join(``)}
  ${U(p(`ما مقترحاتك أو ملاحظاتك لتحسين الخدمات المقدمة لابنك؟ (اختياري)`,`What suggestions or comments do you have to improve your child’s services? (optional)`),Et(`svc`))}<div class="row">${K(`pSurveySend`,p(`إرسال الاستبيان`,`Send survey`),{cls:`p`})}</div></div>`},z.pSurveySend=async()=>{let e=Yn(),t=xt(we(),Te()),n=k.ans||{};if(t.questions.some((e,t)=>!n[t]))return Y(`أجب عن جميع الأسئلة قبل الإرسال.`,`Answer every question before sending.`);try{await L(`pSurveySend`,{sid:e.id,answers:t.questions.map((e,t)=>n[t]),comment:String(k.f.svc||``).trim()}),k.ans={},k.f={},J(`شكرًا لكم. تم إرسال الاستبيان.`,`Thank you. The survey was sent.`),$()}catch(e){I(e)}},B.p.memos=()=>{let e=Yn();if(!e)return Zn();let t=[...D.memos.values()].filter(t=>t.studentId===e.id&&(D.mrev.get(t.id)||{}).approved).sort((e,t)=>_.indexOf(e.subject)-_.indexOf(t.subject));return`${q(`مذكرات المراجعة`,`Review Notes`,e.name)}${Xn()}${G([p(`المادة`,`Subject`),p(`العام`,`Year`),p(`الملف`,`File`),p(`التاريخ`,`Date`),``],t.map(e=>{let t=e.versions[e.versions.length-1];return[m(v(e.subject)),m(e.year),m(t.file.name),h(t.at),`<div class="row">${qt(t.file)}</div>`]}),p(`لا توجد مذكرات متاحة بعد.`,`No notes available yet.`))}`},B.p.cert=()=>{let e=Yn();if(!e)return Zn();let t=we();return`${q(`شهادة الشكر والتقدير`,`Certificate of Appreciation`,e.name)}${Xn()}<div class="sgrid">${[1,2,3].map(n=>{let r=bt(e.id,t,n),i=r.total&&r.ok===r.total;return`<div class="card col" style="gap:8px"><h3>${m(b(n))}</h3><div class="bar"><i style="width:${r.pct}%"></i></div><p class="sm mut">${r.total?p(`اعتُمد ${r.ok} من ${r.total} أنشطة`,`${r.ok} of ${r.total} activities approved`):p(`لا توجد أنشطة في هذا الفصل`,`No activities this semester`)}</p>${i?K(`cert`,p(`عرض الشهادة وتنزيلها`,`View and download certificate`),{cls:`p`,ic:`award`,d:{sid:e.id,sem:n}}):`<p class="xs mut">${p(`تصدر الشهادة بعد اعتماد جميع أنشطة الفصل.`,`The certificate is issued once all semester activities are approved.`)}</p>`}</div>`}).join(``)}</div>`};function tr(e,t,n,r,i,a){let o=String(t).split(` `),s=``;for(let t of o){let o=s?s+` `+t:t;e.measureText(o).width>i&&s?(e.fillText(s,n,r),r+=a,s=t):s=o}return s&&e.fillText(s,n,r),r+a}function nr(e,t,n){let r=e.width=1600,i=e.height=1130,a=e.getContext(`2d`),o=O.role===`p`?we():j(),s=f===`ar`;a.fillStyle=`#fff`,a.fillRect(0,0,r,i),a.strokeStyle=`#1f7f74`,a.lineWidth=14,a.strokeRect(30,30,r-60,i-60),a.strokeStyle=`#b98a2f`,a.lineWidth=3,a.strokeRect(54,54,r-108,i-108);let c=te(`#logoimg`);try{if(c&&c.complete){let e=760*c.naturalHeight/c.naturalWidth;a.drawImage(c,(r-760)/2,90,760,e)}}catch{}a.direction=s?`rtl`:`ltr`,a.textAlign=`center`,a.fillStyle=`#1f7f74`,a.font=`700 84px "Readex Pro","IBM Plex Sans Arabic",sans-serif`,a.fillText(s?`شهادة شكر وتقدير`:`Certificate of Appreciation`,r/2,330),a.fillStyle=`#17302e`,a.font=`400 34px "IBM Plex Sans Arabic",sans-serif`;let l=tr(a,s?`يتقدم قسم التربية الخاصة في مجمع زايد التعليمي – سهيلة بخالص الشكر والتقدير إلى`:`The Special Education Department at Zayed Education Complex – Suhaila extends its sincere thanks and appreciation to`,r/2,420,1250,52);a.fillStyle=`#b98a2f`,a.font=`700 62px "Readex Pro","IBM Plex Sans Arabic",sans-serif`,a.fillText(t.parentName||(s?`ولي الأمر الكريم`:`the parent`),r/2,l+50),a.fillStyle=`#17302e`,a.font=`600 40px "IBM Plex Sans Arabic",sans-serif`,a.fillText((s?`ولي أمر الطالب: `:`Parent of: `)+t.name,r/2,l+130),a.font=`400 34px "IBM Plex Sans Arabic",sans-serif`,tr(a,s?`تقديرًا لمشاركة الأسرة وتعاونها في تنفيذ الأنشطة الأسرية خلال ${b(n)} من العام الدراسي ${o}، مع تمنياتنا لكم ولابنكم بدوام التوفيق والنجاح.`:`in recognition of the family’s participation and cooperation in completing the family activities during the ${b(n)} of academic year ${o}, with our best wishes for continued success.`,r/2,l+215,1250,54),a.font=`600 32px "IBM Plex Sans Arabic",sans-serif`,a.fillStyle=`#1f7f74`,a.fillText(s?`مجمع زايد التعليمي – سهيلة`:`Zayed Education Complex – Suhaila`,r*(s?.74:.26),i-150),a.fillText(s?`قسم التربية الخاصة`:`Special Education Department`,r*(s?.26:.74),i-150),a.fillStyle=`#5a716e`,a.font=`400 26px "IBM Plex Sans Arabic",sans-serif`,a.fillText(h(ne()),r/2,i-100)}z.cert=e=>{k.cert={sid:e.sid,sem:+e.sem},X(()=>`${Z(p(`شهادة شكر وتقدير`,`Certificate of Appreciation`))}<canvas id="certcv" style="width:100%;height:auto;border:1px solid var(--line);border-radius:8px"></canvas><div class="row" style="justify-content:flex-end">${K(`certDl`,p(`تنزيل صورة`,`Download image`),{ic:`dl`,d:{t:`png`}})}${K(`certDl`,p(`تنزيل PDF للطباعة`,`Download PDF to print`),{cls:`p`,ic:`print`,d:{t:`pdf`}})}</div>`,!0);let t=()=>{let e=te(`#certcv`);e&&nr(e,De(k.cert.sid),k.cert.sem)};t(),document.fonts&&document.fonts.ready&&document.fonts.ready.then(t)},z.certDl=e=>{let t=te(`#certcv`);if(t){if(e.t===`pdf`&&window.jspdf){let e=new window.jspdf.jsPDF({orientation:`l`,unit:`pt`,format:`a4`}),n=e.internal.pageSize.getWidth(),r=e.internal.pageSize.getHeight();e.addImage(t.toDataURL(`image/jpeg`,.95),`JPEG`,0,0,n,r),Ue(`certificate.pdf`,e.output(`blob`))}else t.toBlob(e=>Ue(`certificate.png`,e),`image/png`)}},document.addEventListener(`click`,e=>{Je();let t=e.target.closest(`[data-act]`);if(t){if(t.disabled)return;let n=z[t.dataset.act];if(n)try{let r=n(t.dataset,t,e);r&&r.catch&&r.catch(I)}catch(e){I(e)}}else k.drop&&!e.target.closest(`.drop`)&&(k.drop=!1,$())}),document.addEventListener(`input`,e=>{let t=e.target,n=t.dataset;n.f&&(t.tagName===`TEXTAREA`||[`text`,`search`,`password`].includes(t.type))?(k.f[n.f]=t.value,n.re&&t.type===`search`&&(clearTimeout(k.tm),k.tm=setTimeout(()=>{$();let e=te(`[data-f="q_text"]`);e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))},500))):n.sq!=null&&k.sv?k.sv.questions[+n.sq][n.l]=t.value:n.pe&&(k.pe=k.pe||{},k.pe[n.pe]=t.value)}),document.addEventListener(`change`,async e=>{let t=e.target,n=t.dataset,r=!!t.closest(`#modal`),i=()=>r?It():$();if(n.f){if(t.type===`checkbox`?k.f[n.f]=t.checked:(t.tagName===`SELECT`||t.type===`date`)&&(k.f[n.f]=t.value),n.pick)return hn(t.value),$();n.re&&t.type!==`search`&&i()}else{if(n.v)return k[n.v]=t.value,k.edit=null,k.view===`reqs`&&k.f.rs&&hn(k.f.rs),$();if(n.file)return k.files[n.file]=t.files[0]||null,i();if(n.sub)return k.rsubs=k.rsubs||[],k.rsubs=t.checked?[...k.rsubs,n.sub]:k.rsubs.filter(e=>e!==n.sub),$();if(n.rt)k.rteach=k.rteach||{},k.rteach[n.rt]=t.value;else{if(n.cp)return k.cp[n.cp]=n.cp===`sem`?+t.value:t.value,_n(),It();if(n.mq){let e=k.mq;e[n.mq]=t.checked?[...e[n.mq]||[],n.k]:(e[n.mq]||[]).filter(e=>e!==n.k);let r=document.getElementById(`mqc_`+n.mq);r&&(r.textContent=e[n.mq].length)}else if(n.cps){let e=k.cp.m;e[n.cps]=t.checked?[...e[n.cps]||[],n.k]:(e[n.cps]||[]).filter(e=>e!==n.k)}else{if(n.pref)return A[n.pref]=t.checked,d.set(`prefs`,A),$();if(n.tg){if(n.tg===`all`)k.atg=t.checked?`all`:[];else{let e=k.atg===`all`?[]:k.atg||[];k.atg=t.checked?[...e,n.tg]:e.filter(e=>e!==n.tg)}return $()}if(n.svtg){let e=k.sv.targets||`all`;if(n.svtg===`all`)k.sv.targets=t.checked?`all`:[];else{let r=e===`all`?[]:e;k.sv.targets=t.checked?[...r,n.svtg]:r.filter(e=>e!==n.svtg)}return $()}if(n.svo)return k.sv.open=t.checked,$();if(n.pe)k.pe=k.pe||{},k.pe[n.pe]=t.value;else if(n.svd)k.sv.openDate=t.value;else{if(n.ans!=null)return k.ans=k.ans||{},k.ans[+n.ans]=+t.value,$();if(n.slot){let e=t.files[0];if(!e||!/^image\//.test(e.type))return;let r=await Ke(e);return $n(n.slot)[+n.i]={file:r,url:`data:image/jpeg;base64,`+await Be(r)},$()}if(n.photo){for(let e of[...t.files].slice(0,3-k.photos.length))/^image\//.test(e.type)&&k.photos.push({file:e,url:`data:`+e.type+`;base64,`+await Be(e)});return It()}}}}}}),document.addEventListener(`focusout`,()=>{Lt&&setTimeout(()=>{Lt&&Rt()},150)}),document.addEventListener(`keydown`,e=>{let t=e.target&&e.target.dataset&&e.target.dataset.f;if(e.key===`Enter`&&!O&&t){let e={pcode:`loginP`,tname2:`loginT`,tcode:`loginT`,sname:`loginS`,spw:`loginS`}[t];e&&z[e]()}e.key===`Escape`&&(Pt.length?Ft():k.drop&&(k.drop=!1,$()))}),(async function(){if($(),e.init){let t=await e.init();s=!0,xe=t.canAdmin,ee=t.pwSet!==!1,ye=t.downloads,be=t.tts,Se=!t.db,$()}e.onChange&&e.onChange(()=>{O?Fe():Ie()}),Le(),O&&(await Fe(!0),O&&$()),O||Ie()})()}var te={png:`image/png`,jpg:`image/jpeg`,jpeg:`image/jpeg`,webp:`image/webp`},d=e=>new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]),r.onerror=n,r.readAsDataURL(e)}),f=(e,t)=>e&&t&&e.at>t.at,p=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);async function m(e,t,n){let{get:r,all:i,getBlob:a,name:o}=e,s=()=>i(`students`).filter(e=>e.active!==!1);if(!window.html2canvas||!window.jspdf)throw Object.assign(Error(`pdf_unavailable`),{code:`pdf_unavailable`});let c=(e,t)=>n===`ar`?e:t,l=n===`ar`?`ar-AE-u-nu-latn`:`en-GB`,u=e=>{if(!e)return`—`;let t=new Date(e.length===10?e+`T00:00:00`:e);return isNaN(+t)?`—`:t.toLocaleDateString(l,{day:`numeric`,month:`short`,year:`numeric`})},ee=[`الأول`,`الثاني`,`الثالث`],m=[`الأول`,`الثاني`,`الثالث`,`الرابع`,`الخامس`,`السادس`,`السابع`,`الثامن`,`التاسع`,`العاشر`,`الحادي عشر`,`الثاني عشر`],ne=e=>c(`الفصل الدراسي `+ee[e-1],[`First`,`Second`,`Third`][e-1]+` Semester`),re=(e,t)=>c(`الصف `+(m[e-1]||e),`Grade `+e)+` / `+(+t?c(`شعبة `+t,`Section `+t):c(`الشعبة غير محددة`,`section not set`)),h={sent:c(`تم الإرسال — بانتظار المراجعة`,`Sent — awaiting review`),approved:c(`معتمد`,`Approved`),more:c(`مطلوب استكمال`,`Needs completing`)},g=e=>{let t=r(`arev`,e.id);return f(t,e)?t.status===`approved`?`approved`:`more`:`sent`},ie=e=>r(`students`,e),ae=i(`acts`).filter(e=>e.year===t),_=i(`psub`),oe=1123,se=document.createElement(`div`);se.style.cssText=`position:fixed;left:-20000px;top:0;width:794px`,se.innerHTML=`<style>
  .ap{width:794px;height:${oe}px;background:#fff;color:#17302e;position:relative;box-sizing:border-box;padding:46px 46px 70px;font:13px/1.6 "IBM Plex Sans Arabic","Segoe UI",Tahoma,sans-serif;direction:${n===`ar`?`rtl`:`ltr`};overflow:hidden}
  .ap *{box-sizing:border-box}.ap h1,.ap h2,.ap h3{font-family:"Readex Pro","IBM Plex Sans Arabic",Tahoma,sans-serif;margin:0}
  .ap-b{height:1007px;overflow:hidden}.ap-f{position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:10px;color:#5a716e}
  .ap-cover{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px}
  .ap-cover img{width:430px;margin-bottom:60px}.ap-cover h1{font-size:34px;color:#1f7f74}.ap-cover .d{font-size:20px;color:#b98a2f;font-weight:600}.ap-cover p{margin:0;font-size:16px}
  .ap h2{font-size:20px;color:#1f7f74;border-bottom:2px solid #b98a2f;padding-bottom:4px;margin-bottom:12px}
  .ap table{width:100%;border-collapse:collapse}.ap th,.ap td{border:1px solid #d8e3e1;padding:7px 9px;text-align:center}.ap th{background:#e3f1ee}.ap tr.t td{font-weight:700;background:#f2f6f5}
  .ap-a{border:1px solid #d8e3e1;border-radius:10px;padding:10px 12px;margin:0 0 6px}.ap-a h3{font-size:16px}.ap-a p{margin:3px 0}
  .ap .m{color:#5a716e;font-size:12px}.ap .bg{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.ap .bg span{background:#e2edfa;color:#1c5a9e;border-radius:99px;padding:1px 10px;font-size:12px;font-weight:600}.ap .bg span.ok{background:#dff2e6;color:#1a7241}
  .ap-s{border-top:1px solid #d8e3e1;padding:8px 2px;margin:0 0 4px}.ap-s .w{display:flex;gap:12px;flex-wrap:wrap;align-items:center;font-size:12px;margin-bottom:6px}
  .ap .st{border-radius:99px;padding:0 8px;font-weight:600}.ap .st-approved{background:#dff2e6;color:#1a7241}.ap .st-sent{background:#e2edfa;color:#1c5a9e}.ap .st-more{background:#fae5e2;color:#ab3027}
  .ap .ph{display:flex;gap:8px}.ap .ph img,.ap .ph div{width:224px;height:168px;object-fit:cover;border-radius:6px;border:1px solid #d8e3e1;background:#f2f6f5}
  .ap .e{border:1.5px dashed #d8e3e1;border-radius:10px;padding:16px;text-align:center;color:#5a716e}</style>`,document.body.appendChild(se);let ce=[],v=e=>p(c(`منصة دعم — قسم التربية الخاصة — مجمع زايد التعليمي – سهيلة — صفحة `,`Daam Platform — Special Education Department — Zayed Education Complex – Suhaila — Page `)+e),le=()=>{let e=document.createElement(`div`);return e.className=`ap`,e.innerHTML=`<div class="ap-b"></div><div class="ap-f">${v(ce.length+1)}</div>`,se.appendChild(e),ce.push(e),e.firstChild},y=null,b=async e=>{y||=le();let t=document.createElement(`div`);t.innerHTML=e;let n=t.firstElementChild;y.appendChild(n),await Promise.all([...n.querySelectorAll(`img`)].map(e=>e.complete?null:e.decode().catch(()=>null))),y.scrollHeight>y.clientHeight&&y.children.length>1&&(y.removeChild(n),y=le(),y.appendChild(n))},ue=async e=>{try{return`data:`+(te[e.ext]||`image/jpeg`)+`;base64,`+await d(await a(e))}catch{return``}};try{let e=(document.getElementById(`logoimg`)||{}).src||``;y=le(),await b(`<div class="ap-cover"><img src="${e}" alt=""><h1>${p(c(`تقرير أنشطة أولياء الأمور`,`Parent Activities Report`))}</h1><div class="d">${p(c(`قسم التربية الخاصة`,`Special Education Department`))}</div><p>${p(c(`العام الدراسي `,`Academic year `)+t)}</p><p>${p(c(`إعداد: `,`Prepared by: `)+o)}</p><p class="m">${p(u(new Date().toISOString()))}</p></div>`);let n=[1,2,3].map(e=>{let t=ae.filter(t=>+t.sem===e),n=_.filter(e=>t.some(t=>t.id===e.actId));return[t.length,new Set(n.map(e=>e.studentId)).size,n.length,n.filter(e=>g(e)===`approved`).length]}),r=[0,1,2,3].map(e=>n.reduce((t,n)=>t+n[e],0));y=le(),await b(`<div><h2>${p(c(`ملخص العام الدراسي`,`Year summary`))}</h2><table><thead><tr>${[c(`الفصل الدراسي`,`Semester`),c(`أنشطة محددة`,`Activities set`),c(`أولياء أمور مشاركون`,`Parents taking part`),c(`مشاركات مرسلة`,`Submissions sent`),c(`مشاركات معتمدة`,`Submissions approved`)].map(e=>`<th>${p(e)}</th>`).join(``)}</tr></thead><tbody>${n.map((e,t)=>`<tr><td>${p(ne(t+1))}</td>${e.map(e=>`<td>${e}</td>`).join(``)}</tr>`).join(``)}<tr class="t"><td>${p(c(`الإجمالي`,`Total`))}</td>${r.map(e=>`<td>${e}</td>`).join(``)}</tr></tbody></table></div>`);let i=s().length;for(let e of[1,2,3]){y=le(),await b(`<h2>${p(ne(e))}</h2>`);let t=ae.filter(t=>+t.sem===e).sort((e,t)=>e.at<t.at?-1:1);t.length||await b(`<p class="e">${p(c(`لا توجد أنشطة محددة في هذا الفصل`,`No activities were set this semester`))}</p>`);for(let e of t){let t=_.filter(t=>t.actId===e.id&&ie(t.studentId)).sort((e,t)=>ie(e.studentId).name.localeCompare(ie(t.studentId).name,`ar`)),n=e.targets===`all`?i:(e.targets||[]).length;await b(`<div class="ap-a"><h3>${p(e.title)}${e.active===!1?` <span class="m">(${p(c(`موقوف`,`Stopped`))})</span>`:``}</h3>${e.desc?`<p>${p(e.desc)}</p>`:``}<p class="m">${p(c(`الفترة: `,`Period: `)+u(e.start)+` — `+u(e.due))}</p><div class="bg"><span>${p(c(`المستهدفون`,`Targeted`))}: ${n}</span><span>${p(c(`شاركوا`,`Took part`))}: ${t.length}</span><span class="ok">${p(c(`معتمدة`,`Approved`))}: ${t.filter(e=>g(e)===`approved`).length}</span></div></div>`),t.length||await b(`<p class="m">${p(c(`لم تصل مشاركات في هذا النشاط.`,`No submissions for this activity.`))}</p>`);for(let e of t){let t=ie(e.studentId),n=g(e),r=await Promise.all((e.photos||[]).map(ue));await b(`<div class="ap-s"><div class="w"><b>${p(t.name)}</b><span>${p(re(t.grade,t.section))}</span><span class="st st-${n}">${p(h[n])}</span><span>${p(u(e.at))}</span></div><div class="ph">${r.map(e=>e?`<img src="${e}" alt="">`:`<div></div>`).join(``)}</div></div>`)}}}document.fonts&&document.fonts.ready&&await document.fonts.ready;let a=new window.jspdf.jsPDF({orientation:`p`,unit:`pt`,format:`a4`}),l=a.internal.pageSize.getWidth(),ee=a.internal.pageSize.getHeight();for(let e=0;e<ce.length;e++){let t=await window.html2canvas(ce[e],{scale:2,backgroundColor:`#ffffff`,width:794,height:oe});e&&a.addPage(),a.addImage(t.toDataURL(`image/jpeg`,.9),`JPEG`,0,0,l,ee)}return a.output(`blob`)}finally{se.remove()}}var ne=`https://fmghricxauhjtsgicutv.supabase.co/functions/v1/daam?forceFunctionRegion=ap-northeast-1`,re=`daam.staffToken`,h={get(){try{return localStorage.getItem(re)}catch{return null}},set(e){try{e?localStorage.setItem(re,e):localStorage.removeItem(re)}catch{}}},g=e=>Object.assign(Error(e),{code:e}),ie=new Set([`sync`,`publicInfo`,`login`,`logout`,`fileBegin`,`fileChunk`,`fileGet`]),ae=null;async function _(e,t){if(e===`sync`&&ae&&Date.now()-ae.at<3e3){let e=ae.snap;return ae=null,e}let n=h.get(),r=!!n&&!ie.has(e),i;try{i=await fetch(ne,{method:`POST`,headers:{"content-type":`application/json`,...n?{"x-daam-staff":n}:{}},body:JSON.stringify({op:e,data:t??{},...r?{withSync:!0}:{}})})}catch{throw g(`network`)}let a;try{a=await i.json()}catch{throw g(`server`)}if(!a||!a.ok)throw g(a&&a.code||`server`);return ae=a.snap?{snap:a.snap,at:Date.now()}:null,e===`login`&&h.set(a.result.token),e===`logout`&&h.set(null),a.result}_.pollMs=2e4,_.pdfInPage=m,ee(_);