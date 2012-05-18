class AdminController < ApplicationController
  def index
    list
    render :action => 'list'
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  verify :method => :post, :only => [ :destroy, :create, :update ],
         :redirect_to => { :action => :list }

  def list
    @bookinfo_pages, @bookinfos = paginate :bookinfos, :per_page => 10
  end

  def show
    @bookinfo = Bookinfo.find(params[:id])
  end

  def new
    @bookinfo = Bookinfo.new
  end

  def create
    @bookinfo = Bookinfo.new(params[:bookinfo])
    if @bookinfo.save
      flash[:notice] = 'Bookinfo was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @bookinfo = Bookinfo.find(params[:id])
  end

  def update
    @bookinfo = Bookinfo.find(params[:id])
    if @bookinfo.update_attributes(params[:bookinfo])
      flash[:notice] = 'Bookinfo was successfully updated.'
      redirect_to :action => 'show', :id => @bookinfo
    else
      render :action => 'edit'
    end
  end

  def destroy
    Bookinfo.find(params[:id]).destroy
    redirect_to :action => 'list'
  end
end
