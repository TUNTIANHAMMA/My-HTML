// (function () {

//     /* ---------- 1. 组装静态骨架 ---------- */
//     const $blog = $('#blogPage');
//     const $wrapper = $('<div>', { class: 'blog-wrapper' });
//     const $list = $('<ul>', { id: 'postList', class: 'post-list' });
//     const $editor = $(`
//       <div class="post-editor">
//         <input   id="postTitle"   placeholder="文章标题">
//         <textarea id="postBody"  placeholder="写点什么……"></textarea>
//         <button  id="publishBtn">发布</button>
//       </div>`);

//     $wrapper.append($editor, $list);
//     $blog.append($wrapper);

//     /* ---------- 2. 本地存储工具 ---------- */
//     const STORAGE_KEY = 'blog_posts';

//     function getPosts() {
//         return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
//     }
//     function savePosts(arr) {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
//     }

//     /* ---------- 3. 渲染列表 ---------- */
//     function render() {
//         $list.empty();
//         getPosts().forEach((p, i) => {
//             const li = $(`
//             <li class="post-item">
//               <h3>${escapeHtml(p.title)}</h3>
//               <p>${escapeHtml(p.body)}</p>
//               <span class="time">${p.time}</span>
//               <span class="delete" data-i="${i}">🗑</span>
//             </li>`);
//             $list.append(li);
//         });
//     }
//     function escapeHtml(t) {
//         return t.replace(/[<>"&]/g, m => ({
//             '<': '&lt;', '>': '&gt;', '"': '&quot;', '&': '&amp;'
//         }[m]));
//     }

//     /* ---------- 4. 事件绑定 ---------- */
//     $('#publishBtn').on('click', () => {
//         const title = $('#postTitle').val().trim();
//         const body = $('#postBody').val().trim();
//         if (!title || !body) return alert('标题 / 正文不能为空');
//         const posts = getPosts();
//         posts.unshift({
//             title, body,
//             time: new Date().toLocaleString()
//         });
//         savePosts(posts);
//         $('#postTitle').val('');
//         $('#postBody').val('');
//         render();
//     });

//     $list.on('click', '.delete', function () {
//         const idx = $(this).data('i');
//         const arr = getPosts();
//         arr.splice(idx, 1);
//         savePosts(arr);
//         render();
//     });

//     /* ---------- 5. 首次加载 ---------- */
//     render();



// })();


(function () {
  /* 1. 先找到 blogPage，再建一个滚动容器 */
  const $blog      = $('#blogPage');
  const $container = $('<div>', { class: 'blog-container' });
  const $wrapper   = $('<div>', { class: 'blog-wrapper' });

  /* 2. 构造编辑区和文章列表 */
  const $editor = $(`
    <div class="post-editor">
      <input   id="postTitle" placeholder="文章标题">
      <textarea id="postBody"  placeholder="写点什么……"></textarea>
      <button  id="publishBtn">发布</button>
    </div>`);
  const $list = $('<ul>', { id: 'postList', class: 'post-list' });

  /* 3. 挂载顺序：editor + list → wrapper → container → #blogPage */
  $wrapper.append($editor, $list);
  $container.append($wrapper);
  $blog.append($container);

  /* 4. 本地存储 & 渲染逻辑保持不变 */
  const STORAGE_KEY = 'blog_posts';
  function getPosts() { return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }
  function savePosts(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
  function escapeHtml(t){ return t.replace(/[<>"&]/g,m=>({'<':'&lt;','>':'&gt;','"':'&quot;','&':'&amp;'}[m])); }
  function render(){
    $list.empty();
    getPosts().forEach((p,i)=>{
      $list.append($(`
        <li class="post-item">
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.body)}</p>
          <span class="time">${p.time}</span>
          <span class="delete" data-i="${i}">🗑</span>
        </li>`));
    });
  }

  /* 5. 事件绑定同原来 */
  $('#publishBtn').on('click',()=>{
    const title=$('#postTitle').val().trim(),
          body =$('#postBody').val().trim();
    if(!title||!body) return alert('标题/正文不能为空');
    const posts=getPosts();
    posts.unshift({ title, body, time:new Date().toLocaleString() });
    savePosts(posts);
    $('#postTitle,#postBody').val('');
    render();
  });
  $list.on('click','.delete',function(){
    const i=$(this).data('i'), arr=getPosts();
    arr.splice(i,1); savePosts(arr); render();
  });

  /* 6. 首次渲染 */
  render();
})();