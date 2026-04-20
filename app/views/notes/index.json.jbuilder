json.data @notes do |note|
  json.partial! "notes/note", note: note
end

json.pagy do
  json.page @pagy.page
  json.next @pagy.next
  json.limit @pagy.limit
end
