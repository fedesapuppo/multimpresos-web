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
    index = File.read(File.expand_path("../index.html", __dir__))
    carteleria = index.split('<article class="service service--flip" id="carteleria">').last
                      .split("</article>").first

    refute_includes carteleria, 'assets/img/carteleria.webp'
    assert_includes carteleria, 'assets/img/catalogo/carteleria-1.webp'
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
end
