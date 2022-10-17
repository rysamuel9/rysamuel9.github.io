const tl = gsap.timeline({ paused: true });

tl.from(
    '.gsap-swipe',
    {
        y: 20,
        x: 20,
        rotate: -40,
        duration: 3,
        transformOrigin: '30% 80%',
        ease: Elastic.easeOut.config(1, 0.5),
    },
    0,
)
    .fromTo(
        '.swipe',
        {
            xPercent: -100,
        },
        {
            duration: 1,
            xPercent: 100,
            ease: Sine.easeInOut,
            stagger: {
                each: 0.15,
            },
        },
        0,
    )
    .from(
        '.maskSwipe',
        {
            xPercent: -100,
            ease: Sine.easeInOut,
        },
        0.4,
    )
    .from(
        '#hello',
        {
            duration: 1.5,
            drawSVG: '0%',
        },
        1,
    )
    .from(
        '.swoop',
        {
            duration: 2,
            drawSVG: '0%',
        },
        1,
    )
    .from(
        '.line',
        {
            drawSVG: '0%',
            duration: 0.5,
            stagger: {
                each: 0.2,
            },
        },
        1,
    )
    .from(
        '.shape',
        {
            scale: 0,
            duration: 1.3,
            transformOrigin: '50% 50%',
            rotate: '+=random(-60, 60)',
            ease: Elastic.easeOut.config(1, 0.8),
            stagger: {
                each: 0.2,
            },
        },
        0.2,
    );

// ScrubGSAPTimeline(tl);

let hover = document.querySelector('.js-hover');

hover.addEventListener('mouseover', playTl);
hover.addEventListener('mouseout', resetTl);

function playTl() {
    tl.timeScale(1.25).restart();
}

function resetTl() {
    tl.progress(0).pause();
}

/* 
    pointer.js was created by OwL for use on websites, 
     and can be found at https://seattleowl.com/pointer.
*/

const pointer = document.createElement('div');
pointer.id = 'pointer-dot';
const ring = document.createElement('div');
ring.id = 'pointer-ring';
document.body.insertBefore(pointer, document.body.children[0]);
document.body.insertBefore(ring, document.body.children[0]);

let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;
let isHover = false;
let mouseDown = false;
const init_pointer = (options) => {
    window.onmousemove = (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    };

    window.onmousedown = (mouse) => {
        mouseDown = true;
    };

    window.onmouseup = (mouse) => {
        mouseDown = false;
    };

    const trace = (a, b, n) => {
        return (1 - n) * a + n * b;
    };
    window['trace'] = trace;

    const getOption = (option) => {
        let defaultObj = {
            pointerColor: '#750c7e',
            ringSize: 15,
            ringClickSize: (options['ringSize'] || 15) - 5,
        };
        if (options[option] == undefined) {
            return defaultObj[option];
        } else {
            return options[option];
        }
    };

    const render = () => {
        ringX = trace(ringX, mouseX, 0.2);
        ringY = trace(ringY, mouseY, 0.2);

        if (document.querySelector('.p-action-click:hover')) {
            pointer.style.borderColor = getOption('pointerColor');
            isHover = true;
        } else {
            pointer.style.borderColor = 'white';
            isHover = false;
        }
        ring.style.borderColor = getOption('pointerColor');
        if (mouseDown) {
            ring.style.padding = getOption('ringClickSize') + 'px';
        } else {
            ring.style.padding = getOption('ringSize') + 'px';
        }

        pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        ring.style.transform = `translate(${
            ringX -
            (mouseDown ? getOption('ringClickSize') : getOption('ringSize'))
        }px, ${
            ringY -
            (mouseDown ? getOption('ringClickSize') : getOption('ringSize'))
        }px)`;

        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

// HOVER
let container = document.querySelector('.anim-explode-container');
let svg = container.querySelector('.anim-explode');
let numberOfShapes = 10;

let shapes = [
    'M254 286.11a50 50 0 0050-50H204a50 50 0 0050 50z',
    'M255.5 271a20 20 0 10-20-20 20 20 0 0020 20zm0 30a50 50 0 10-50-50 50 50 0 0050 50z',
    'M248.8 202.17a8 8 0 019.4 0l40.6 29.5a8 8 0 012.9 8.94l-15.5 47.73a8 8 0 01-7.61 5.52h-50.18a8 8 0 01-7.61-5.52l-15.5-47.73a8 8 0 012.9-8.94z',
    'M307.5 250a50 50 0 11-50-50 50 50 0 0150 50',
    'M248.08 204.07a11.91 11.91 0 0116.84 0l30.59 30.59a11.91 11.91 0 11-16.85 16.85l-10.25-10.25v47.41a11.91 11.91 0 11-23.82 0v-47.41l-10.25 10.25a11.91 11.91 0 01-16.85-16.85z',
    'M234 237a22.5 22.5 0 0045 0h27.5a50 50 0 01-100 0z',
    'M258 202.5a12 12 0 00-12 12v26h-26a12 12 0 000 24h26v26a12 12 0 0024 0v-26h26a12 12 0 000-24h-26v-26a12 12 0 00-12-12z',
];

container.addEventListener('mouseenter', (e) => {
    let animatedShapes = [];

    for (var i = 0; i < numberOfShapes; i++) {
        let newElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path',
        );
        newElement.setAttribute('d', gsap.utils.random(shapes));
        newElement.style.fill = gsap.utils.random([
            '#8EF6E4',
            '#A2D5F2',
            '#D59BF6',
            '#EDB1F1',
        ]);
        svg.appendChild(newElement);
        animatedShapes.push(newElement);
    }

    function killShapes() {
        animatedShapes.forEach((shape) => {
            svg.removeChild(shape);
        });
    }

    gsap.set(animatedShapes, {
        transformOrigin: 'center',
        scale: 'random(0.4, 0.8)',
    });

    gsap.to(animatedShapes, {
        onComplete: killShapes,
        keyframes: [
            {
                rotate: 'random(180, -180)',
                x: 'random([-150, -100, -200, 200, 100, 150])',
                y: 'random([-150, -100, -200, 200, 100, 150])',
                ease: 'expo.out',
                duration: 4,
                stagger: {
                    amount: 0.1,
                },
            },
            { opacity: 0, delay: -3 },
        ],
    });
});
