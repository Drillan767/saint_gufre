Rails.application.routes.draw do

  root 'homes#index'
  get 'download/zip'

  resources :homes
  delete 'file_destroy/:id' => 'homes#file_destroy'
  get 'all_files' => 'homes#all_files'
  devise_for :users
end
