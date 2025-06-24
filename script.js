const viewerElement = document.getElementById('viewer');
const viewer = new Marzipano.Viewer(viewerElement);

const salas = {
  'andar1_sala1': {
    image: './images/andar1_sala1.jpg',
    hotspots: [
      { yaw: 0.3, pitch: 0.1, icon: 'extintor.png', texto: 'Extintor de CO2' },
      { yaw: -0.5, pitch: 0.2, icon: 'rota.png', texto: 'Saída de emergência' }
    ]
  }
};

function carregarSala(id) {
  const sala = salas[id];
  if (!sala) return;

  const source = Marzipano.ImageUrlSource.fromString(sala.image);
  const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
  const limiter = Marzipano.util.compose(
    Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180),
    Marzipano.RectilinearView.limit.yaw(-Math.PI, Math.PI)
  );
  const view = new Marzipano.RectilinearView(null, limiter);

  const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
  scene.switchTo();

  sala.hotspots.forEach(h => {
    scene.hotspotContainer().createHotspot(criarIcone(h), { yaw: h.yaw, pitch: h.pitch });
  });
}

function criarIcone(hotspot) {
  const el = document.createElement('img');
  el.src = `./icons/${hotspot.icon}`;
  el.alt = hotspot.texto;
  el.style.width = '32px';
  el.title = hotspot.texto;
  return el;
}