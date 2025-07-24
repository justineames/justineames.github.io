import{E as f,U as tt,T as se,l as k,d as ve,w as E,I as w,u as U,P as rt,a4 as Se,R as Q,H as we,M as B,_ as F,aa as K,ab as at,S as L,z as y,ac as nt,ad as J,ae as Ce,L as q,af as z,c as ie,B as H,t as Z,v as st,G as it,ag as ot,n as Be,q as Re,a5 as Pe,a8 as Me,ah as Ue,s as dt,o as lt,p as ut,a6 as ct,a7 as ht,a9 as ft,ai as pt,aj as gt,ak as mt,al as X,am as xt,D as Fe,m as D,Q as oe,an as G,ao as de,a1 as _t,ap as bt,aq as le,e as T,ar as yt}from"./index-Bwn1521f.js";import{c as W,a as Tt,b as vt,B as Ge}from"./colorToUniform-KTpA7KSL.js";class ke{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:a,clientHeight:s}=this._resizeTo;t=a,r=s}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}ke.extension=f.Application;class Ae{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,tt.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?se.shared:new se,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Ae.extension=f.Application;class De{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}De.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"filter"};function St(n,e){e.clear();const t=e.matrix;for(let r=0;r<n.length;r++){const a=n[r];a.globalDisplayStatus<7||(e.matrix=a.worldTransform,e.addBounds(a.bounds))}return e.matrix=t,e}const wt=new Se({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class ze{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new k({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new ve({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){var m;const t=this.renderer,r=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const a=this._filterStack[this._filterStackIndex];if(this._filterStackIndex++,r.length===0){a.skip=!0;return}const s=a.bounds;if(e.renderables?St(e.renderables,s):e.filterEffect.filterArea?(s.clear(),s.addRect(e.filterEffect.filterArea),s.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,s),e.container){const h=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;h&&s.applyMatrix(h)}const i=t.renderTarget.renderTarget.colorTexture.source;let o=1/0,d=0,u=!0,c=!1,l=!1,p=!0;for(let g=0;g<r.length;g++){const h=r[g];if(o=Math.min(o,h.resolution==="inherit"?i._resolution:h.resolution),d+=h.padding,h.antialias==="off"?u=!1:h.antialias==="inherit"&&u&&(u=i.antialias),h.clipToViewport||(p=!1),!!!(h.compatibleRenderers&t.type)){l=!1;break}if(h.blendRequired&&!(((m=t.backBuffer)==null?void 0:m.useBackBuffer)??!0)){E("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),l=!1;break}l=h.enabled||l,c||(c=h.blendRequired)}if(!l){a.skip=!0;return}if(p){const g=t.renderTarget.rootViewPort,h=t.renderTarget.renderTarget.resolution;s.fitBounds(0,g.width/h,0,g.height/h)}if(s.scale(o).ceil().scale(1/o).pad(d|0),!s.isPositive){a.skip=!0;return}a.skip=!1,a.bounds=s,a.blendRequired=c,a.container=e.container,a.filterEffect=e.filterEffect,a.previousRenderSurface=t.renderTarget.renderSurface,a.inputTexture=w.getOptimalTexture(s.width,s.height,o,u),t.renderTarget.bind(a.inputTexture,!0),t.globalUniforms.push({offset:s})}pop(){const e=this.renderer;this._filterStackIndex--;const t=this._filterStack[this._filterStackIndex];if(t.skip)return;this._activeFilterData=t;const r=t.inputTexture,a=t.bounds;let s=U.EMPTY;if(e.renderTarget.finishRenderPass(),t.blendRequired){const o=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null,d=e.renderTarget.getRenderTarget(t.previousRenderSurface);s=this.getBackTexture(d,a,o)}t.backTexture=s;const i=t.filterEffect.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(s.source,3),e.globalUniforms.pop(),i.length===1)i[0].apply(this,r,t.previousRenderSurface,!1),w.returnTexture(r);else{let o=t.inputTexture,d=w.getOptimalTexture(a.width,a.height,o.source._resolution,!1),u=0;for(u=0;u<i.length-1;++u){i[u].apply(this,o,d,!0);const l=o;o=d,d=l}i[u].apply(this,o,t.previousRenderSurface,!1),w.returnTexture(o),w.returnTexture(d)}t.blendRequired&&w.returnTexture(s)}getBackTexture(e,t,r){const a=e.colorTexture.source._resolution,s=w.getOptimalTexture(t.width,t.height,a,!1);let i=t.minX,o=t.minY;r&&(i-=r.minX,o-=r.minY),i=Math.floor(i*a),o=Math.floor(o*a);const d=Math.ceil(t.width*a),u=Math.ceil(t.height*a);return this.renderer.renderTarget.copyToTexture(e,s,{x:i,y:o},{width:d,height:u},{x:0,y:0}),s}applyFilter(e,t,r,a){const s=this.renderer,i=this._filterStack[this._filterStackIndex],o=i.bounds,d=rt.shared,c=i.previousRenderSurface===r;let l=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution,p=this._filterStackIndex-1;for(;p>0&&this._filterStack[p].skip;)--p;p>0&&(l=this._filterStack[p].inputTexture.source._resolution);const m=this._filterGlobalUniforms,g=m.uniforms,h=g.uOutputFrame,_=g.uInputSize,x=g.uInputPixel,C=g.uInputClamp,v=g.uGlobalFrame,R=g.uOutputTexture;if(c){let P=this._filterStackIndex;for(;P>0;){P--;const M=this._filterStack[this._filterStackIndex-1];if(!M.skip){d.x=M.bounds.minX,d.y=M.bounds.minY;break}}h[0]=o.minX-d.x,h[1]=o.minY-d.y}else h[0]=0,h[1]=0;h[2]=t.frame.width,h[3]=t.frame.height,_[0]=t.source.width,_[1]=t.source.height,_[2]=1/_[0],_[3]=1/_[1],x[0]=t.source.pixelWidth,x[1]=t.source.pixelHeight,x[2]=1/x[0],x[3]=1/x[1],C[0]=.5*x[2],C[1]=.5*x[3],C[2]=t.frame.width*_[2]-.5*x[2],C[3]=t.frame.height*_[3]-.5*x[3];const A=this.renderer.renderTarget.rootRenderTarget.colorTexture;v[0]=d.x*l,v[1]=d.y*l,v[2]=A.source.width*l,v[3]=A.source.height*l;const S=this.renderer.renderTarget.getRenderTarget(r);if(s.renderTarget.bind(r,!!a),r instanceof U?(R[0]=r.frame.width,R[1]=r.frame.height):(R[0]=S.width,R[1]=S.height),R[2]=S.isRoot?-1:1,m.update(),s.renderPipes.uniformBatch){const P=s.renderPipes.uniformBatch.getUboResource(m);this._globalFilterBindGroup.setResource(P,0)}else this._globalFilterBindGroup.setResource(m,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:wt,shader:e,state:e._state,topology:"triangle-list"}),s.type===Q.WEBGL&&s.renderTarget.finishRenderPass()}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new we,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const r=this._activeFilterData,a=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(B.shared),i=t.renderGroup||t.parentRenderGroup;return i&&i.cacheToLocalTransform&&s.prepend(i.cacheToLocalTransform),s.invert(),a.prepend(s),a.scale(1/t.texture.frame.width,1/t.texture.frame.height),a.translate(t.anchor.x,t.anchor.y),a}}ze.extension={type:[f.WebGLSystem,f.WebGPUSystem],name:"filter"};function Ct(n){const e=n._stroke,t=n._fill,a=[`div { ${[`color: ${F.shared.setValue(t.color).toHex()}`,`font-size: ${n.fontSize}px`,`font-family: ${n.fontFamily}`,`font-weight: ${n.fontWeight}`,`font-style: ${n.fontStyle}`,`font-variant: ${n.fontVariant}`,`letter-spacing: ${n.letterSpacing}px`,`text-align: ${n.align}`,`padding: ${n.padding}px`,`white-space: ${n.whiteSpace==="pre"&&n.wordWrap?"pre-wrap":n.whiteSpace}`,...n.lineHeight?[`line-height: ${n.lineHeight}px`]:[],...n.wordWrap?[`word-wrap: ${n.breakWords?"break-all":"break-word"}`,`max-width: ${n.wordWrapWidth}px`]:[],...e?[Oe(e)]:[],...n.dropShadow?[He(n.dropShadow)]:[],...n.cssOverrides].join(";")} }`];return Bt(n.tagStyles,a),a.join(" ")}function He(n){const e=F.shared.setValue(n.color).setAlpha(n.alpha).toHexa(),t=Math.round(Math.cos(n.angle)*n.distance),r=Math.round(Math.sin(n.angle)*n.distance),a=`${t}px ${r}px`;return n.blur>0?`text-shadow: ${a} ${n.blur}px ${e}`:`text-shadow: ${a} ${e}`}function Oe(n){return[`-webkit-text-stroke-width: ${n.width}px`,`-webkit-text-stroke-color: ${F.shared.setValue(n.color).toHex()}`,`text-stroke-width: ${n.width}px`,`text-stroke-color: ${F.shared.setValue(n.color).toHex()}`,"paint-order: stroke"].join(";")}const ue={fontSize:"font-size: {{VALUE}}px",fontFamily:"font-family: {{VALUE}}",fontWeight:"font-weight: {{VALUE}}",fontStyle:"font-style: {{VALUE}}",fontVariant:"font-variant: {{VALUE}}",letterSpacing:"letter-spacing: {{VALUE}}px",align:"text-align: {{VALUE}}",padding:"padding: {{VALUE}}px",whiteSpace:"white-space: {{VALUE}}",lineHeight:"line-height: {{VALUE}}px",wordWrapWidth:"max-width: {{VALUE}}px"},ce={fill:n=>`color: ${F.shared.setValue(n).toHex()}`,breakWords:n=>`word-wrap: ${n?"break-all":"break-word"}`,stroke:Oe,dropShadow:He};function Bt(n,e){for(const t in n){const r=n[t],a=[];for(const s in r)ce[s]?a.push(ce[s](r[s])):ue[s]&&a.push(ue[s].replace("{{VALUE}}",r[s]));e.push(`${t} { ${a.join(";")} }`)}}class ee extends K{constructor(e={}){super(e),this._cssOverrides=[],this.cssOverrides??(this.cssOverrides=e.cssOverrides),this.tagStyles=e.tagStyles??{}}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}_generateKey(){return this._styleKey=at(this)+this._cssOverrides.join("-"),this._styleKey}update(){this._cssStyle=null,super.update()}clone(){return new ee({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow?{...this.dropShadow}:null,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides})}get cssStyle(){return this._cssStyle||(this._cssStyle=Ct(this)),this._cssStyle}addOverride(...e){const t=e.filter(r=>!this.cssOverrides.includes(r));t.length>0&&(this.cssOverrides.push(...t),this.update())}removeOverride(...e){const t=e.filter(r=>this.cssOverrides.includes(r));t.length>0&&(this.cssOverrides=this.cssOverrides.filter(r=>!t.includes(r)),this.update())}set fill(e){typeof e!="string"&&typeof e!="number"&&E("[HTMLTextStyle] only color fill is not supported by HTMLText"),super.fill=e}set stroke(e){e&&typeof e!="string"&&typeof e!="number"&&E("[HTMLTextStyle] only color stroke is not supported by HTMLText"),super.stroke=e}}const he="http://www.w3.org/2000/svg",fe="http://www.w3.org/1999/xhtml";class Ve{constructor(){this.svgRoot=document.createElementNS(he,"svg"),this.foreignObject=document.createElementNS(he,"foreignObject"),this.domElement=document.createElementNS(fe,"div"),this.styleElement=document.createElementNS(fe,"style"),this.image=new Image;const{foreignObject:e,svgRoot:t,styleElement:r,domElement:a}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(a)}}let pe;function Rt(n,e,t,r){r||(r=pe||(pe=new Ve));const{domElement:a,styleElement:s,svgRoot:i}=r;a.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${n}</div>`,a.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(s.textContent=t),document.body.appendChild(i);const o=a.getBoundingClientRect();i.remove();const d=e.padding*2;return{width:o.width-d,height:o.height-d}}class Ee{constructor(e,t){this.state=L.for2d(),this._graphicsBatchesHash=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this.renderer=e,this._adaptor=t,this._adaptor.init(),this.renderer.renderableGC.addManagedHash(this,"_graphicsBatchesHash")}validateRenderable(e){const t=e.context,r=!!this._graphicsBatchesHash[e.uid],a=this.renderer.graphicsContext.updateGpuContext(t);return!!(a.isBatchable||r!==a.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const t=this._graphicsBatchesHash[e.uid];if(t)for(let r=0;r<t.length;r++){const a=t[r];a._batcher.updateElement(a)}}destroyRenderable(e){this._graphicsBatchesHash[e.uid]&&this._removeBatchForRenderable(e.uid),e.off("destroyed",this._destroyRenderableBound)}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const s=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const i=s.resources.localUniforms.uniforms;i.uTransformMatrix=e.groupTransform,i.uRound=t._roundPixels|e._roundPixels,W(e.groupColorAlpha,i.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._graphicsBatchesHash[e.uid],r=this.renderer.graphicsContext.updateGpuContext(e.context);t&&this._removeBatchForRenderable(e.uid),r.isBatchable&&this._initBatchesForRenderable(e),e.batched=r.isBatchable}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,a=this._getBatchesForRenderable(e);for(let s=0;s<a.length;s++){const i=a[s];r.addToBatch(i,t)}}_getBatchesForRenderable(e){return this._graphicsBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.context,r=this.renderer.graphicsContext.getGpuContext(t),a=this.renderer._roundPixels|e._roundPixels,s=r.batches.map(i=>{const o=y.get(nt);return i.copyTo(o),o.renderable=e,o.roundPixels=a,o});return this._graphicsBatchesHash[e.uid]===void 0&&e.on("destroyed",this._destroyRenderableBound),this._graphicsBatchesHash[e.uid]=s,s}_removeBatchForRenderable(e){this._graphicsBatchesHash[e].forEach(t=>{y.return(t)}),this._graphicsBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._graphicsBatchesHash)this._removeBatchForRenderable(e);this._graphicsBatchesHash=null}}Ee.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"graphics"};class Le{constructor(e,t){this.localUniforms=new k({uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new ve({0:this.localUniforms}),this._meshDataHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this.renderer=e,this._adaptor=t,this._adaptor.init(),e.renderableGC.addManagedHash(this,"_gpuBatchableMeshHash"),e.renderableGC.addManagedHash(this,"_meshDataHash")}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,a=e.batched;if(t.batched=a,r!==a)return!0;if(a){const s=e._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const i=this._getBatchableMesh(e);return i.texture.uid!==e._texture.uid&&(i._textureMatrixUpdateId=-1),!i._batcher.checkAndUpdateTexture(i,e._texture)}return!1}addRenderable(e,t){const r=this.renderer.renderPipes.batch,{batched:a}=this._getMeshData(e);if(a){const s=this._getBatchableMesh(e);s.setTexture(e._texture),s.geometry=e._geometry,r.addToBatch(s,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._gpuBatchableMeshHash[e.uid];t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}destroyRenderable(e){this._meshDataHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];t&&(y.return(t),this._gpuBatchableMeshHash[e.uid]=null),e.off("destroyed",this._destroyRenderableBound)}execute(e){if(!e.isRenderable)return;e.state.blendMode=J(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),W(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){return this._meshDataHash[e.uid]||this._initMeshData(e)}_initMeshData(e){var t,r;return this._meshDataHash[e.uid]={batched:e.batched,indexSize:(t=e._geometry.indices)==null?void 0:t.length,vertexSize:(r=e._geometry.positions)==null?void 0:r.length},e.on("destroyed",this._destroyRenderableBound),this._meshDataHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=y.get(Ce);return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,this._gpuBatchableMeshHash[e.uid]=t,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&y.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._meshDataHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Le.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"mesh"};class Pt{execute(e,t){const r=e.state,a=e.renderer,s=t.shader||e.defaultShader;s.resources.uTexture=t.texture._source,s.resources.uniforms=e.localUniforms;const i=a.gl,o=e.getBuffers(t);a.shader.bind(s),a.state.set(r),a.geometry.bind(o.geometry,s.glProgram);const u=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?i.UNSIGNED_SHORT:i.UNSIGNED_INT;i.drawElements(i.TRIANGLES,t.particleChildren.length*6,u,0)}}class Mt{execute(e,t){const r=e.renderer,a=t.shader||e.defaultShader;a.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),a.groups[1]=r.texture.getTextureBindGroup(t.texture);const s=e.state,i=e.getBuffers(t);r.encoder.draw({geometry:i.geometry,shader:t.shader||e.defaultShader,state:s,size:t.particleChildren.length*6})}}function ge(n,e=null){const t=n*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,a=0;r<t;r+=6,a+=4)e[r+0]=a+0,e[r+1]=a+1,e[r+2]=a+2,e[r+3]=a+0,e[r+4]=a+2,e[r+5]=a+3;return e}function Ut(n){return{dynamicUpdate:me(n,!0),staticUpdate:me(n,!1)}}function me(n,e){const t=[];t.push(`
      
        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const s in n){const i=n[s];if(e!==i.dynamic)continue;t.push(`offset = index + ${r}`),t.push(i.code);const o=q(i.format);r+=o.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const a=t.join(`
`);return new Function("ps","f32v","u32v",a)}class Ft{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let a=0,s=0;for(const c in r){const l=r[c],p=q(l.format);l.dynamic?s+=p.stride:a+=p.stride}this._dynamicStride=s/4,this._staticStride=a/4,this.staticAttributeBuffer=new z(t*4*a),this.dynamicAttributeBuffer=new z(t*4*s),this.indexBuffer=ge(t);const i=new Se;let o=0,d=0;this._staticBuffer=new ie({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:H.VERTEX|H.COPY_DST}),this._dynamicBuffer=new ie({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:H.VERTEX|H.COPY_DST});for(const c in r){const l=r[c],p=q(l.format);l.dynamic?(i.addAttribute(l.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:l.format}),o+=p.size):(i.addAttribute(l.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:d*4,format:l.format}),d+=p.size)}i.addIndex(this.indexBuffer);const u=this.getParticleUpdate(r);this._dynamicUpload=u.dynamicUpdate,this._staticUpload=u.staticUpdate,this.geometry=i}getParticleUpdate(e){const t=Gt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return Ut(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new z(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new z(this._size*this._dynamicStride*4*4),this.indexBuffer=ge(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const a=this.staticAttributeBuffer;this._staticUpload(e,a.float32View,a.uint32View),this._staticBuffer.setDataWithSize(a.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Gt(n){const e=[];for(const t in n){const r=n[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var kt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,At=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,xe=`
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Dt extends Z{constructor(){const e=st.from({vertex:At,fragment:kt}),t=it.from({fragment:{source:xe,entryPoint:"mainFragment"},vertex:{source:xe,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:U.WHITE.source,uSampler:new ot({}),uniforms:{uTranslationMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new F(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class We{constructor(e,t){this.state=L.for2d(),this._gpuBufferHash=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this.localUniforms=new k({uTranslationMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Dt,this.state=L.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return this._gpuBufferHash[e.uid]||this._initBuffer(e)}_initBuffer(e){return this._gpuBufferHash[e.uid]=new Ft({size:e.particleChildren.length,properties:e._properties}),e.on("destroyed",this._destroyRenderableBound),this._gpuBufferHash[e.uid]}updateRenderable(e){}destroyRenderable(e){this._gpuBufferHash[e.uid].destroy(),this._gpuBufferHash[e.uid]=null,e.off("destroyed",this._destroyRenderableBound)}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,a=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const s=this.state;a.update(t,e._childrenDirty),e._childrenDirty=!1,s.blendMode=J(e.blendMode,e.texture._source);const i=this.localUniforms.uniforms,o=i.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(r.globalUniforms.globalUniformData.projectionMatrix),i.uResolution=r.globalUniforms.globalUniformData.resolution,i.uRound=r._roundPixels|e._roundPixels,W(e.groupColorAlpha,i.uColor,0),this.adaptor.execute(this,e)}destroy(){this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Ie extends We{constructor(e){super(e,new Pt)}}Ie.extension={type:[f.WebGLPipes],name:"particle"};class $e extends We{constructor(e){super(e,new Mt)}}$e.extension={type:[f.WebGPUPipes],name:"particle"};const zt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Ht={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0
    
        `}};let I,$;class Ot extends Z{constructor(){I??(I=Be({name:"tiling-sprite-shader",bits:[Tt,zt,Re]})),$??($=Pe({name:"tiling-sprite-shader",bits:[vt,Ht,Me]}));const e=new k({uMapCoord:{value:new B,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new B,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:$,gpuProgram:I,resources:{localUniforms:new k({uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:U.EMPTY.source,uSampler:U.EMPTY.source.style}})}updateUniforms(e,t,r,a,s,i){const o=this.resources.tilingUniforms,d=i.width,u=i.height,c=i.textureMatrix,l=o.uniforms.uTextureTransform;l.set(r.a*d/e,r.b*d/t,r.c*u/e,r.d*u/t,r.tx/e,r.ty/t),l.invert(),o.uniforms.uMapCoord=c.mapCoord,o.uniforms.uClampFrame=c.uClampFrame,o.uniforms.uClampOffset=c.uClampOffset,o.uniforms.uTextureTransform=l,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=a,o.uniforms.uSizeAnchor[3]=s,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class Vt extends Ue{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Et(n,e){const t=n.anchor.x,r=n.anchor.y;e[0]=-t*n.width,e[1]=-r*n.height,e[2]=(1-t)*n.width,e[3]=-r*n.height,e[4]=(1-t)*n.width,e[5]=(1-r)*n.height,e[6]=-t*n.width,e[7]=(1-r)*n.height}function Lt(n,e,t,r){let a=0;const s=n.length/e,i=r.a,o=r.b,d=r.c,u=r.d,c=r.tx,l=r.ty;for(t*=e;a<s;){const p=n[t],m=n[t+1];n[t]=i*p+d*m+c,n[t+1]=o*p+u*m+l,t+=e,a++}}function Wt(n,e){const t=n.texture,r=t.frame.width,a=t.frame.height;let s=0,i=0;n.applyAnchorToTexture&&(s=n.anchor.x,i=n.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-i,e[5]=e[7]=1-i;const o=B.shared;o.copyFrom(n._tileTransform.matrix),o.tx/=n.width,o.ty/=n.height,o.invert(),o.scale(n.width/r,n.height/a),Lt(e,2,0,o)}const O=new Vt;class je{constructor(e){this._state=L.default2d,this._tilingSpriteDataHash=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_tilingSpriteDataHash")}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const a=t.canBatch;if(a&&a===r){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return r!==a}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const a=this._getTilingSpriteData(e),{geometry:s,canBatch:i}=a;if(i){a.batchableMesh||(a.batchableMesh=new Ce);const o=a.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),o.geometry=s,o.renderable=e,o.transform=e.groupTransform,o.setTexture(e._texture)),o.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(o,t)}else r.break(t),a.shader||(a.shader=new Ot),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._tilingSpriteDataHash[e.uid];t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,W(e.groupColorAlpha,r.uColor,0),this._state.blendMode=J(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:O,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:a}=t;e.didViewUpdate&&this._updateBatchableMesh(e),a._batcher.updateElement(a)}else if(e.didViewUpdate){const{shader:a}=t;a.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}destroyRenderable(e){var r;const t=this._getTilingSpriteData(e);t.batchableMesh=null,(r=t.shader)==null||r.destroy(),this._tilingSpriteDataHash[e.uid]=null,e.off("destroyed",this._destroyRenderableBound)}_getTilingSpriteData(e){return this._tilingSpriteDataHash[e.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Ue({indices:O.indices,positions:O.positions.slice(),uvs:O.uvs.slice()});return this._tilingSpriteDataHash[e.uid]={canBatch:!0,renderable:e,geometry:t},e.on("destroyed",this._destroyRenderableBound),this._tilingSpriteDataHash[e.uid]}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,a=e.texture.source.style;a.addressMode!=="repeat"&&(a.addressMode="repeat",a.update()),Wt(e,r.uvs),Et(e,r.positions)}destroy(){for(const e in this._tilingSpriteDataHash)this.destroyRenderable(this._tilingSpriteDataHash[e].renderable);this._tilingSpriteDataHash=null,this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let a=!0;return this._renderer.type===Q.WEBGL&&(a=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(a||r.source.isPowerOfTwo),t.canBatch}}je.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"tilingSprite"};const It={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:` 
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},$t={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:` 
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},jt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;
             
            }
        `}},Yt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);  
              
                return coverage;
            }
        `}};let j,Y;class Kt extends Z{constructor(){const e=new k({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}}),t=dt();j??(j=Be({name:"sdf-shader",bits:[lt,ut(t),It,jt,Re]})),Y??(Y=Pe({name:"sdf-shader",bits:[ct,ht(t),$t,Yt,Me]})),super({glProgram:Y,gpuProgram:j,resources:{localUniforms:e,batchSamplers:ft(t)}})}}class Ye{constructor(e){this._gpuBitmapText={},this._destroyRenderableBound=this.destroyRenderable.bind(this),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBitmapText")}validateRenderable(e){const t=this._getGpuBitmapText(e);return e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,t)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);_e(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){e.off("destroyed",this._destroyRenderableBound),this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){const t=this._gpuBitmapText[e].context;t.customShader&&(y.return(t.customShader),t.customShader=null),y.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);_e(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,a=pt.getFont(e.text,e._style);r.clear(),a.distanceField.type!=="none"&&(r.customShader||(r.customShader=y.get(Kt)));const s=Array.from(e.text),i=e._style;let o=a.baseLineOffset;const d=gt(s,i,a,!0);let u=0;const c=i.padding,l=d.scale;let p=d.width,m=d.height+d.offsetY;i._stroke&&(p+=i._stroke.width/l,m+=i._stroke.width/l),r.translate(-e._anchor._x*p-c,-e._anchor._y*m-c).scale(l,l);const g=a.applyFillAsTint?i._fill.color:16777215;for(let h=0;h<d.lines.length;h++){const _=d.lines[h];for(let x=0;x<_.charPositions.length;x++){const C=s[u++],v=a.chars[C];v!=null&&v.texture&&r.texture(v.texture,g||"black",Math.round(_.charPositions[x]+v.xOffset),Math.round(o+v.yOffset))}o+=a.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this.initGpuText(e)}initGpuText(e){const t=y.get(mt);return this._gpuBitmapText[e.uid]=t,this._updateContext(e,t),e.on("destroyed",this._destroyRenderableBound),this._gpuBitmapText[e.uid]}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,a=X.get(`${r}-bitmap`),{a:s,b:i,c:o,d}=e.groupTransform,u=Math.sqrt(s*s+i*i),c=Math.sqrt(o*o+d*d),l=(Math.abs(u)+Math.abs(c))/2,p=a.baseRenderedFontSize/e._style.fontSize,m=l*a.distanceField.range*(1/p);t.customShader.resources.localUniforms.uniforms.uDistance=m}destroy(){for(const e in this._gpuBitmapText)this._destroyRenderableByUid(e);this._gpuBitmapText=null,this._renderer=null}}Ye.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"bitmapText"};function _e(n,e){e.groupTransform=n.groupTransform,e.groupColorAlpha=n.groupColorAlpha,e.groupColor=n.groupColor,e.groupBlendMode=n.groupBlendMode,e.globalDisplayStatus=n.globalDisplayStatus,e.groupTransform=n.groupTransform,e.localDisplayStatus=n.localDisplayStatus,e.groupAlpha=n.groupAlpha,e._roundPixels=n._roundPixels}function N(n,e){const{texture:t,bounds:r}=n;xt(r,e._anchor,t);const a=e._style.padding;r.minX-=a,r.minY-=a,r.maxX-=a,r.maxY-=a}class Ke{constructor(e){this._gpuText=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this._renderer=e,this._renderer.runners.resolutionChange.add(this),this._renderer.renderableGC.addManagedHash(this,"_gpuText")}resolutionChange(){for(const e in this._gpuText){const t=this._gpuText[e];if(!t)continue;const r=t.batchableSprite.renderable;r._autoResolution&&(r._resolution=this._renderer.resolution,r.onViewUpdate())}}validateRenderable(e){const t=this._getGpuText(e),r=e._getKey();return t.textureNeedsUploading?(t.textureNeedsUploading=!1,!0):t.currentKey!==r}addRenderable(e,t){const a=this._getGpuText(e).batchableSprite;e._didTextUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(a,t)}updateRenderable(e){const r=this._getGpuText(e).batchableSprite;e._didTextUpdate&&this._updateText(e),r._batcher.updateElement(r)}destroyRenderable(e){e.off("destroyed",this._destroyRenderableBound),this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(t.currentKey),y.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e._getKey(),r=this._getGpuText(e),a=r.batchableSprite;r.currentKey!==t&&this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,N(a,e)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=e._getKey();this._renderer.htmlText.decreaseReferenceCount(t.currentKey),t.generatingTexture=!0,t.currentKey=r;const a=e.resolution??this._renderer.resolution,s=await this._renderer.htmlText.getManagedTexture(e.text,a,e._style,e._getKey()),i=t.batchableSprite;i.texture=t.texture=s,t.generatingTexture=!1,t.textureNeedsUploading=!0,e.onViewUpdate(),N(i,e)}_getGpuText(e){return this._gpuText[e.uid]||this.initGpuText(e)}initGpuText(e){const t={texture:U.EMPTY,currentKey:"--",batchableSprite:y.get(Ge),textureNeedsUploading:!1,generatingTexture:!1},r=t.batchableSprite;return r.renderable=e,r.transform=e.groupTransform,r.texture=U.EMPTY,r.bounds={minX:0,maxX:1,minY:0,maxY:0},r.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,this._gpuText[e.uid]=t,e.on("destroyed",this._destroyRenderableBound),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Ke.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"htmlText"};function qt(){const{userAgent:n}=Fe.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(n)}const Xt=new we;function qe(n,e,t,r){const a=Xt;a.minX=0,a.minY=0,a.maxX=n.width/r|0,a.maxY=n.height/r|0;const s=w.getOptimalTexture(a.width,a.height,r,!1);return s.source.uploadMethodId="image",s.source.resource=n,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/r,s.frame.height=t/r,s.source.emit("update",s.source),s.updateUvs(),s}function Nt(n,e){const t=e.fontFamily,r=[],a={},s=/font-family:([^;"\s]+)/g,i=n.match(s);function o(d){a[d]||(r.push(d),a[d]=!0)}if(Array.isArray(t))for(let d=0;d<t.length;d++)o(t[d]);else o(t);i&&i.forEach(d=>{const u=d.split(":")[1].trim();o(u)});for(const d in e.tagStyles){const u=e.tagStyles[d].fontFamily;o(u)}return r}async function Qt(n){const t=await(await Fe.get().fetch(n)).blob(),r=new FileReader;return await new Promise((s,i)=>{r.onloadend=()=>s(r.result),r.onerror=i,r.readAsDataURL(t)})}async function be(n,e){const t=await Qt(e);return`@font-face {
        font-family: "${n.fontFamily}";
        src: url('${t}');
        font-weight: ${n.fontWeight};
        font-style: ${n.fontStyle};
    }`}const V=new Map;async function Jt(n,e,t){const r=n.filter(a=>X.has(`${a}-and-url`)).map((a,s)=>{if(!V.has(a)){const{url:i}=X.get(`${a}-and-url`);s===0?V.set(a,be({fontWeight:e.fontWeight,fontStyle:e.fontStyle,fontFamily:a},i)):V.set(a,be({fontWeight:t.fontWeight,fontStyle:t.fontStyle,fontFamily:a},i))}return V.get(a)});return(await Promise.all(r)).join(`
`)}function Zt(n,e,t,r,a){const{domElement:s,styleElement:i,svgRoot:o}=a;s.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${n}</div>`,s.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),i.textContent=r;const{width:d,height:u}=a.image;return o.setAttribute("width",d.toString()),o.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(o)}function er(n,e){const t=D.getOptimalCanvasAndContext(n.width,n.height,e),{context:r}=t;return r.clearRect(0,0,n.width,n.height),r.drawImage(n,0,0),t}function tr(n,e,t){return new Promise(async r=>{t&&await new Promise(a=>setTimeout(a,100)),n.onload=()=>{r()},n.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,n.crossOrigin="anonymous"})}class te{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===Q.WEBGPU}getTexture(e){return this._buildTexturePromise(e.text,e.resolution,e.style)}getManagedTexture(e,t,r,a){if(this._activeTextures[a])return this._increaseReferenceCount(a),this._activeTextures[a].promise;const s=this._buildTexturePromise(e,t,r).then(i=>(this._activeTextures[a].texture=i,i));return this._activeTextures[a]={texture:null,promise:s,usageCount:1},s}async _buildTexturePromise(e,t,r){const a=y.get(Ve),s=Nt(e,r),i=await Jt(s,r,ee.defaultTextStyle),o=Rt(e,r,i,a),d=Math.ceil(Math.ceil(Math.max(1,o.width)+r.padding*2)*t),u=Math.ceil(Math.ceil(Math.max(1,o.height)+r.padding*2)*t),c=a.image,l=2;c.width=(d|0)+l,c.height=(u|0)+l;const p=Zt(e,r,t,i,a);await tr(c,p,qt()&&s.length>0);const m=c;let g;this._createCanvas&&(g=er(c,t));const h=qe(g?g.canvas:m,c.width-l,c.height-l,t);return this._createCanvas&&(this._renderer.texture.initSource(h.source),D.returnCanvasAndContext(g)),y.return(a),h}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t):t.promise.then(r=>{t.texture=r,this._cleanUp(t)}).catch(()=>{E("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}_cleanUp(e){w.returnTexture(e.texture),e.texture.source.resource=null,e.texture.source.uploadMethodId="unknown"}getReferenceCount(e){return this._activeTextures[e].usageCount}destroy(){this._activeTextures=null}}te.extension={type:[f.WebGLSystem,f.WebGPUSystem,f.CanvasSystem],name:"htmlText"};te.defaultFontOptions={fontFamily:"Arial",fontStyle:"normal",fontWeight:"normal"};class Xe{constructor(e){this._gpuText=Object.create(null),this._destroyRenderableBound=this.destroyRenderable.bind(this),this._renderer=e,this._renderer.runners.resolutionChange.add(this),this._renderer.renderableGC.addManagedHash(this,"_gpuText")}resolutionChange(){for(const e in this._gpuText){const t=this._gpuText[e];if(!t)continue;const r=t.batchableSprite.renderable;r._autoResolution&&(r._resolution=this._renderer.resolution,r.onViewUpdate())}}validateRenderable(e){const t=this._getGpuText(e),r=e._getKey();return t.currentKey!==r}addRenderable(e,t){const a=this._getGpuText(e).batchableSprite;e._didTextUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(a,t)}updateRenderable(e){const r=this._getGpuText(e).batchableSprite;e._didTextUpdate&&this._updateText(e),r._batcher.updateElement(r)}destroyRenderable(e){e.off("destroyed",this._destroyRenderableBound),this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),y.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e._getKey(),r=this._getGpuText(e),a=r.batchableSprite;r.currentKey!==t&&this._updateGpuText(e),e._didTextUpdate=!1,N(a,e)}_updateGpuText(e){const t=this._getGpuText(e),r=t.batchableSprite;t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),t.texture=r.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e._getKey(),r.texture=t.texture}_getGpuText(e){return this._gpuText[e.uid]||this.initGpuText(e)}initGpuText(e){const t={texture:null,currentKey:"--",batchableSprite:y.get(Ge)};return t.batchableSprite.renderable=e,t.batchableSprite.transform=e.groupTransform,t.batchableSprite.bounds={minX:0,maxX:1,minY:0,maxY:0},t.batchableSprite.roundPixels=this._renderer._roundPixels|e._roundPixels,this._gpuText[e.uid]=t,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,this._updateText(e),e.on("destroyed",this._destroyRenderableBound),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Xe.extension={type:[f.WebGLPipes,f.WebGPUPipes,f.CanvasPipes],name:"text"};function ye(n,e,t){for(let r=0,a=4*t*e;r<e;++r,a+=4)if(n[a+3]!==0)return!1;return!0}function Te(n,e,t,r,a){const s=4*e;for(let i=r,o=r*s+4*t;i<=a;++i,o+=s)if(n[o+3]!==0)return!1;return!0}function rr(n,e=1){const{width:t,height:r}=n,a=n.getContext("2d",{willReadFrequently:!0});if(a===null)throw new TypeError("Failed to get canvas 2D context");const i=a.getImageData(0,0,t,r).data;let o=0,d=0,u=t-1,c=r-1;for(;d<r&&ye(i,t,d);)++d;if(d===r)return oe.EMPTY;for(;ye(i,t,c);)--c;for(;Te(i,t,o,d,c);)++o;for(;Te(i,t,u,d,c);)--u;return++u,++c,new oe(o/e,d/e,(u-o)/e,(c-d)/e)}class Ne{constructor(e){this._activeTextures={},this._renderer=e}getTextureSize(e,t,r){const a=G.measureText(e||" ",r);let s=Math.ceil(Math.ceil(Math.max(1,a.width)+r.padding*2)*t),i=Math.ceil(Math.ceil(Math.max(1,a.height)+r.padding*2)*t);return s=Math.ceil(s-1e-6),i=Math.ceil(i-1e-6),s=de(s),i=de(i),{width:s,height:i}}getTexture(e,t,r,a){typeof e=="string"&&(_t("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof K||(e.style=new K(e.style));const{texture:s,canvasAndContext:i}=this.createTextureAndCanvas(e);return this._renderer.texture.initSource(s._source),D.returnCanvasAndContext(i),s}createTextureAndCanvas(e){const{text:t,style:r}=e,a=e.resolution??this._renderer.resolution,s=G.measureText(t||" ",r),i=Math.ceil(Math.ceil(Math.max(1,s.width)+r.padding*2)*a),o=Math.ceil(Math.ceil(Math.max(1,s.height)+r.padding*2)*a),d=D.getOptimalCanvasAndContext(i,o),{canvas:u}=d;this.renderTextToCanvas(t,r,a,d);const c=qe(u,i,o,a);if(r.trim){const l=rr(u,a);c.frame.copyFrom(l),c.updateUvs()}return{texture:c,canvasAndContext:d}}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e._getKey();if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const{texture:r,canvasAndContext:a}=this.createTextureAndCanvas(e);return this._activeTextures[t]={canvasAndContext:a,texture:r,usageCount:1},r}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",w.returnTexture(e)}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(D.returnCanvasAndContext(t.canvasAndContext),this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,r,a){var C,v,R,A;const{canvas:s,context:i}=a,o=bt(t),d=G.measureText(e||" ",t),u=d.lines,c=d.lineHeight,l=d.lineWidths,p=d.maxLineWidth,m=d.fontProperties,g=s.height;if(i.resetTransform(),i.scale(r,r),i.textBaseline=t.textBaseline,(C=t._stroke)!=null&&C.width){const S=t._stroke;i.lineWidth=S.width,i.miterLimit=S.miterLimit,i.lineJoin=S.join,i.lineCap=S.cap}i.font=o;let h,_;const x=t.dropShadow?2:1;for(let S=0;S<x;++S){const P=t.dropShadow&&S===0,M=P?Math.ceil(Math.max(1,g)+t.padding*2):0,Qe=M*r;if(P){i.fillStyle="black",i.strokeStyle="black";const b=t.dropShadow,Je=b.color,Ze=b.alpha;i.shadowColor=F.shared.setValue(Je).setAlpha(Ze).toRgbaString();const et=b.blur*r,ne=b.distance*r;i.shadowBlur=et,i.shadowOffsetX=Math.cos(b.angle)*ne,i.shadowOffsetY=Math.sin(b.angle)*ne+Qe}else{if(i.fillStyle=t._fill?le(t._fill,i,d):null,(v=t._stroke)!=null&&v.width){const b=t._stroke.width*t._stroke.alignment;i.strokeStyle=le(t._stroke,i,d,b)}i.shadowColor="black"}let re=(c-m.fontSize)/2;c-m.fontSize<0&&(re=0);const ae=((R=t._stroke)==null?void 0:R.width)??0;for(let b=0;b<u.length;b++)h=ae/2,_=ae/2+b*c+m.ascent+re,t.align==="right"?h+=p-l[b]:t.align==="center"&&(h+=(p-l[b])/2),(A=t._stroke)!=null&&A.width&&this._drawLetterSpacing(u[b],t,a,h+t.padding,_+t.padding-M,!0),t._fill!==void 0&&this._drawLetterSpacing(u[b],t,a,h+t.padding,_+t.padding-M)}}_drawLetterSpacing(e,t,r,a,s,i=!1){const{context:o}=r,d=t.letterSpacing;let u=!1;if(G.experimentalLetterSpacingSupported&&(G.experimentalLetterSpacing?(o.letterSpacing=`${d}px`,o.textLetterSpacing=`${d}px`,u=!0):(o.letterSpacing="0px",o.textLetterSpacing="0px")),d===0||u){i?o.strokeText(e,a,s):o.fillText(e,a,s);return}let c=a;const l=G.graphemeSegmenter(e);let p=o.measureText(e).width,m=0;for(let g=0;g<l.length;++g){const h=l[g];i?o.strokeText(h,c,s):o.fillText(h,c,s);let _="";for(let x=g+1;x<l.length;++x)_+=l[x];m=o.measureText(_).width,c+=p-m+d,p=m}}destroy(){this._activeTextures=null}}Ne.extension={type:[f.WebGLSystem,f.WebGPUSystem,f.CanvasSystem],name:"canvasText"};T.add(ke);T.add(Ae);T.add(Ee);T.add(yt);T.add(Le);T.add(Ie);T.add($e);T.add(Ne);T.add(Xe);T.add(Ye);T.add(te);T.add(Ke);T.add(je);T.add(ze);T.add(De);
