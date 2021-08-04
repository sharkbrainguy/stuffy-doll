import extractIFrameSrc from '../extract-iframe-src';

describe('extract iframe source', () => {
  it('should exctract iframe sourc', () => {
    const riddleSrc = `https://www.riddle.com/a/331237?`;

    const html = `<div class="riddle_target" data-rid-id="331237" data-fg="#1486CD" data-bg="rgb(2, 87, 152)" style="margin:0 auto;max-width:100%;width:640px;" data-auto-scroll="false" data-auto-scroll-offset="5">
       <script src="https://www.riddle.com/files/js/embed.js"></script>
       <link href="https://www.riddle.com/files/css/embed.css" rel="stylesheet">
       <iframe style="width:100%;height:300px;border:1px solid #cfcfcf;" src="${riddleSrc}" allow="autoplay" title="Quiz - Quiz: Afternoon quiz: August 4, 2021"><section><h2>Quiz: Afternoon quiz: August 4, 2021</h2><p><p>Includes Next button now appearing on every question</p></p></section><section><h2><h2>The ______ Guard is charged with protecting the Pope and the Apostolic Palace.</h2></h2></section><section><h3><h2>Manufacture of the sparkling New Zealand wine Bernadino Spumanti has been discontinued. </h2></h3></section><section><h3><h2>In which of these substances would you find lanolin?</h2></h3></section><section><h3><h2>Which Olympic team, pictured here, based their artistic swimming performance was spider-themed?</h2></h3></section><section><h3><h2>Which country did the Bahamas gain independence from in 1973?</h2></h3></section><section><h3><h2>In Japanese cuisine, yakitori are ...&nbsp;</h2></h3></section><section><h3><h2>Artist Andy Warhol was a leading figure in ...&nbsp;<span style="color:#222222;"></span></h2></h3></section><section><h3><h2>Marie Curie won two Nobel Prizes in two different sciences.</h2></h3></section><section><h3><h2>How old is Meghan, Duchess of Sussex turning on August 4?</h2></h3></section><section><h3><h2><strong>AC/DC rockers Malcolm and Angus Young are ...&nbsp;</strong></h2></h3></section><section><h3><h2>To apply for a career in the New Zealand Defence Force, you must have a clean criminal record.&nbsp;</h2></h3></section><section><h3><h2><strong>Which sentence uses the correct word?</strong></h2></h3></section><section><h3><h2>Auscultation is used to examine ...&nbsp;</h2></h3></section><section><h3><h2>There are more caves in the ...&nbsp;</h2></h3></section><section><h3><h2><strong>The is a member of the Armed __________ Squad.&nbsp;</strong></h2></h3></section><section><h2><p>Poor. Have another crack tomorrow.</p></h2></section><section><h3><p>So so. Try again tomorrow.</p></h3></section><section><h3><p>Good effort. Can you do better tomorrow?</p></h3></section><section><h3><p>Great work. Try for 100 per cent tomorrow. </p></h3></section><section><h3><p>Nice one. Can you maintain it tomorrow?</p></h3></section></iframe>
      </div>`;

    expect(extractIFrameSrc.extractIframeSrc(html)).toBe(riddleSrc);
  });
});
