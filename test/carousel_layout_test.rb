require "minitest/autorun"

class CarouselLayoutTest < Minitest::Test
  def test_turns_each_service_cover_into_the_first_carousel_slide
    script = File.read(File.expand_path("../assets/js/main.js", __dir__))

    assert_includes script, "function prepararCarruselesDeServicios()"
    assert_includes script, "tira.insertBefore(foto, tira.firstChild)"
    assert_includes script, "media.appendChild(catalogo)"
  end

  def test_prepares_service_carousels_before_enabling_their_controls
    script = File.read(File.expand_path("../assets/js/main.js", __dir__))

    assert_operator script.index("prepararCarruselesDeServicios();"), :<,
                    script.index("document.querySelectorAll('.catalogo')")
  end

  def test_omits_the_poor_carteleria_cover_from_the_carousel
    refute_includes carteleria_markup, 'assets/img/carteleria.webp'
    assert_includes carteleria_markup, 'assets/img/catalogo/carteleria-8.webp'
  end

  def test_shows_their_own_signage_work_in_the_carteleria_carousel
    %w[carteleria-9 carteleria-11].each do |foto|
      assert_includes carteleria_markup, "assets/img/catalogo/#{foto}.webp"
      assert_includes carteleria_markup, "assets/img/catalogo/#{foto}.jpg"
      assert_path_exists File.expand_path("../assets/img/catalogo/#{foto}.jpg", __dir__)
      assert_path_exists File.expand_path("../assets/img/catalogo/#{foto}.webp", __dir__)
    end
  end

  def test_drops_the_stock_photos_that_are_not_their_work
    %w[carteleria-1 carteleria-2 carteleria-4 carteleria-5 carteleria-10].each do |foto|
      refute_includes carteleria_markup, "assets/img/catalogo/#{foto}."
    end
  end

  def test_removes_the_old_carteleria_cover_files
    refute_path_exists File.expand_path("../assets/img/carteleria.webp", __dir__)
    refute_path_exists File.expand_path("../assets/img/carteleria.jpg", __dir__)
  end

  def test_lets_the_media_column_shrink_below_its_carousel_min_content
    css = File.read(File.expand_path("../assets/css/style.css", __dir__))
    media = css[/^\.service__media \{(.*?)\}/m, 1]

    assert_includes media, "min-width: 0"
  end

  def test_opens_the_tapped_photo_in_a_full_screen_viewer
    script = File.read(File.expand_path("../assets/js/main.js", __dir__))

    assert_includes script, "function abrirVisor("
    assert_includes script, "aria-modal"
  end

  def test_closes_the_viewer_with_escape_and_walks_it_with_the_arrows
    script = File.read(File.expand_path("../assets/js/main.js", __dir__))
    visor = script.split("function abrirVisor(").last

    assert_includes visor, "Escape"
    assert_includes visor, "ArrowLeft"
    assert_includes visor, "ArrowRight"
  end

  def test_hides_the_viewer_until_a_photo_is_tapped
    css = File.read(File.expand_path("../assets/css/style.css", __dir__))

    assert_includes css, ".visor[hidden] { display: none; }"
  end

  def test_shows_the_same_picture_the_page_already_resolved
    script = File.read(File.expand_path("../assets/js/main.js", __dir__))

    assert_includes script, "cloneNode(true)"
    refute_includes script, "currentSrc"
  end
  private

  def carteleria_markup
    index = File.read(File.expand_path("../index.html", __dir__))
    index.split('<article class="service service--flip" id="carteleria">').last
         .split("</article>").first
  end
end
