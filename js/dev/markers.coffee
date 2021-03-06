mc = null

L.Control.Markers = L.Control.extend
  options:
    position: 'topleft'
    disableIcon: 'fa-save'
    enableIcon: 'fa-pencil'
    locate: null

  onAdd: (map) ->
    mc = @
    @markers = []
    @loadMarkers()

    container = L.DomUtil.create('div', 'leaflet-control-markers leaflet-bar leaflet-control')
    @link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single fa fa-pencil', container)
    L.DomEvent
      .on(container, 'click', L.DomEvent.stop)
      .on(container, 'click', =>
        if @editing then @stopEdit() else @startEdit()
      )
      .on(container, 'dblclick', L.DomEvent.stop)

    map.on 'click', (e) =>
      return unless @editing
      @addMarker(e.latlng)

    container

  startEdit: ->
    @editing = true
    L.DomUtil.removeClass(@link, @options.enableIcon)
    L.DomUtil.addClass(@link, @options.disableIcon)
    @markers.forEach (m) =>
      m.dragging.enable()

  stopEdit: ->
    @editing = false
    L.DomUtil.addClass(@link, @options.enableIcon)
    L.DomUtil.removeClass(@link, @options.disableIcon)
    @markers.forEach (m) =>
      m.dragging.disable()
    @saveMarkers()

  loadMarkers: ->
    stored = store.get('markers') || []
    stored.forEach (m) =>
      @addMarker(m)

  saveMarkers: ->
    store.set 'markers', @markers.map (m) ->
      m.getLatLng()

  addMarker: (latlng) ->
    mc.markers.push(L.marker(latlng, { draggable: @editing })
      .addTo(map)
      .on 'dblclick', @removeMarker
      .on 'click', @showPopup
    )

  removeMarker: ->
    return unless mc.editing
    @closePopup()
    map.removeLayer(@)
    mc.markers.splice(mc.markers.indexOf(@), 1)

  distanceInM: (latlng) ->
    if @options.locate._event && @options.locate._active
      distance = latlng.distanceTo(@options.locate._event.latlng)
      Number(distance.toFixed(1)).toLocaleString() + ' m'

  showPopup: ->
    @unbindPopup()
    content = mc.distanceInM(@getLatLng())
    @bindPopup(content).openPopup() if content

L.control.markers = (options) ->
  new L.Control.Markers(options)
