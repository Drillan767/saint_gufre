class HomesController < ApplicationController
  before_action :set_home, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:destroy, :file_destroy], raise: false
  require 'i18n'

  # GET /homes
  # GET /homes.json
  def index
    @files = FileDetail.all
  end

  # GET /homes/1
  # GET /homes/1.json
  def show
  end

  # GET /homes/new
  def new
    @home = Home.new
  end

  # GET /homes/1/edit
  def edit
  end

  # POST /homes
  # POST /homes.json
  def create
    @home = Home.new(home_params)

    respond_to do |format|

      if @home.save

        tags = []
        @home.tags.split(', ').map do |tag|
          tags.push(tag)
        end

        @home.fichiers.each do |fichier|

          path = fichier.url
          unless FileDetail.exists?(path: path)
            FileDetail.create(path: path, tags: tags)
          end
        end

        format.html { redirect_to root_path, notice: 'Home was successfully created.' }
        format.json { render :show, status: :created, location: root_path }
      else
        format.html { render :new }
        format.json { render json: @home.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /homes/1
  # PATCH/PUT /homes/1.json
  def update
    respond_to do |format|
      if @home.update(home_params)
        format.html { redirect_to @home, notice: 'Home was successfully updated.' }
        format.json { render :show, status: :ok, location: @home }
      else
        format.html { render :edit }
        format.json { render json: @home.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /homes/1
  # DELETE /homes/1.json
  def destroy
    @home.destroy
    skip_before_action :verify_authenticity_token
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Home was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # DELETE file_destroy/1
  def file_destroy
    FileDetail.find(params[:id]).destroy!
    redirect_to root_path
  end

  # GET /all_files

  def all_files
    @all_files = FileDetail.all
    render json: @all_files
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_home
      @home = Home.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def home_params
      params.require(:home).permit(:tags, {fichiers: []})
    end
end
