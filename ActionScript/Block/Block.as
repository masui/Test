package{import flash.display.*;public class Block extends Sprite{var H=240,P=48,
W=32,D=8,C=[0xFFFF00,0xFFFF00,0xFF00FF,0xFF00FF,0xFF00FF,0x00FFFF,0x00FFFF],a,p,
q,u,v,l,m,d;public function Block(){l=W*3-P/2;m=H-16;stage.addEventListener("click",function(e){a=[];for(var j=0;j<7;++j)for(var i=0;i<6;++i)a.push({x:i*W+1,y:j
*D+D*3+1,w:W-2,h:D-2,c:C[j]});p=l+P/2;q=m-8;u=4;v=-8});stage.addEventListener("mouseMove",function(e){d=l;l=e.localX-(P/2);if(l<0)l=0;if(l>W*6-P)l=W*6-P;d=l-d})
;addEventListener("enterFrame",function(e){var x2=p+u;var y2=q+v;for each(var b in a)if(c(b,x2,y2,p,q))a.splice(a.indexOf(b),1);if(x2<0||x2>6*W)u=-u;if(y2<0)v=-v;if(c({x:l,y:m,w:P,h:8},x2,y2,p,q))u+=d;if(y2>H)v=u=0;p+=u;q+=v;with(graphics){
clear();beginFill(0);drawRect(0,0,W*6,H);for each(var b in a){beginFill(b.c);drawRect(b.x,b.y,b.w,b.h)}beginFill(0xFFFFFF);drawCircle(p,q,4);beginFill(0xCCCCFF)
;drawRect(l,m,P,8)}})}function B(a,b,c){return b<=a&&a<c}function X(y0,x1,y1,x2,
y2){return x1+(y0-y1)*(x2-x1)/(y2-y1)}function Y(x0,x1,y1,x2,y2){return y1+(x0-x1)*(y2-y1)/(x2-x1)}function c(b,x2,y2,x1,y1){if(B(b.y,y1,y2)&&B(X(b.y,x1,y1,x2,y2),b.x,b.x+b.w)){v=-v;return 1}if(B(b.y+b.h,y2,y1)&&B(X(b.y+b.h,x1,y1,x2,y2),b.x
,b.x+b.w)){v=-v;return 1}if(B(b.x,x1,x2)&&B(Y(b.x,x1,y1,x2,y2),b.y,b.y+b.h)){u=-u;return 1}if(B(b.x+b.w,x2,x1)&&B(Y(b.x+b.w,x1,y1,x2,y2),b.y,b.y+b.h)){u=-u;return 1}return 0}}}
